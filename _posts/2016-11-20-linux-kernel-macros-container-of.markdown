---
layout: post
title:  "Linux Kernel Macros: container_of"
date:   2016-10-20 02:00:00 +0100
tags:
- linux kernel
---

This example explains how the macro `container_of` works.

{% highlight c linenos %}
#include <stdio.h>  // for print
#include <stdlib.h> // for malloc, EXIT_SUCCESS
#include <stddef.h> // for offsetof

/**
 * container_of - cast a member of a structure out to the containing structure
 * @ptr:	the pointer to the member.
 * @type:	the type of the container struct this is embedded in.
 * @member:	the name of the member within the struct.
 *
 */
#define container_of(ptr, type, member) ({ \
                const typeof( ((type *)0)->member ) *__mptr = (ptr); \
                (type *)( (char *)__mptr - offsetof(type,member) );})

struct test1 {
        int a;
};

struct test2 {
        int b;
        struct test1 z;
        int c;
};

int
main() {
        /* existing structure */
        struct test2 *obj;
        obj = malloc(sizeof(struct test2));
        if(obj == NULL){
                printf("Error: Memory not allocated...!\n");
        }
        obj->z.a = 51;
        obj->b = 43;
        obj->c = 53;

        /* pointer to existing entry */
        struct test1 *obj1 = &obj->z;

        struct test2 *obj2 = container_of(obj1, struct test2, z);

        printf("obj2->b = %d\n", obj2->b);

        return EXIT_SUCCESS;
}
{% endhighlight %}

### **Statements in Expressions**

A non-standard GCC extension. This is called by the [GCC statement expression](https://gcc.gnu.org/onlinedocs/gcc/Statement-Exprs.html). It lets us use a compound statement as an expression. Here, we want to use the `container_of` macro as an expression, but we want to declare a local variable (`__mptr`) inside the macro, so we need a compound statement.

The compiler will evaluate the whole block and use the value of the last statement contained in the block. Take for instance the following code. It will print 5.

{% highlight c %}
int x = ({1; 2;}) + 3;
printf("%d\n", x);
{% endhighlight %}

### **typeof()**

A non-standard GCC extension. The [typeof GCC extension](https://gcc.gnu.org/onlinedocs/gcc/Typeof.html#Typeof) that lets us refer to the type of an expression, and can be used to declare variables.

{% highlight c %}
int x = 5;
typeof(x) y = 6;
printf("%d %d\n", x, y);
{% endhighlight %}

### **Zero pointer dereference**

It’s a little pointer magic to get the type of the member. It won’t crash, because the expression itself will never be evaluated. All the compiler cares for is its type. The same situation occurs in case we ask back for the address. The compiler again doesn’t care for the value, it will simply add the offset of the member to the address of the structure, in this particular case 0, and return the new address.

{% highlight c %}
struct s {
        char m1;
        char m2;
};

/* This will print 1 */
printf("%d\n", &((struct s*)0)->m2);
{% endhighlight %}

### **offsetof(st, m)**

This macro computes the byte offset of a field within a structure. It is even part of the standard library (available in `stddef.h`). Not in the kernel space though, as the standard C library is not present there. Linux uses the compiler-provided offsetof, if the compiler provides one, else it defines the offsetof macro as

{% highlight c %}
#define offsetof(TYPE, MEMBER) ((size_t) &((TYPE *)0)->MEMBER)
{% endhighlight %}

It returns an address of a member called MEMBER of a structure of type TYPE that is stored in memory from address 0 (which happens to be the offset we’re looking for).

### **Understanding the (char *) casting in container_of**

It's to get byte-level addresses for the calculation. Otherwise, pointer arithmetic would be in terms of the types being pointed at, which breaks since offsetof computes the offset in bytes.

Casting to `char *` is pretty common on the inside of low-level primitives like this, since sometimes you really need to think of memory as being an "array of bytes" and manipulate it at that level.

Consider this structure as an example:

{% highlight c %}
struct demo {
  int foo;
  float bar;
};
{% endhighlight %}

now, if we did this:

{% highlight c %}
struct demo test;
float *intptr = &test.bar;
{% endhighlight %}

we should be able to get a pointer to test using container_of():

{% highlight c %}
struct demo *owner = container_of(intptr, struct demo, bar);
{% endhighlight %}

this will expand to:

{% highlight c %}
struct demo *owner = {(
    const typeof( ((struct demo*)0)->bar) *__mptr = (intptr);
    (struct demo*)( (char *)__mptr - offsetof(struct demo,bar) );})
{% endhighlight %}

So the first line declares a float pointer __mptr and copies the argument value to it.

The second line casts the member pointer to `char *`, then subtracts the offset of `bar` inside `struct demo` (which will be 4, if `sizeof (int)` is 4), thus getting "back up" to the address of the entire structure `test`.

If the cast to `char *` hadn't been there, the 4 would have been interpreted in terms of float (since `__mptr` is `float *`) which would obviously back up way too far (16 bytes instead of 4, assuming float is also 4 bytes) causing horrible breakage.
