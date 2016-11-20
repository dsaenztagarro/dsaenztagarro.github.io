---
layout: post
title:  "Building ENAME c file"
date:   2016-03-03 02:00:00 +0100
tags:
- cpp
---

## cpp options:

- `-E` Only run the preprocessor

- `-dM` Print macro definitions in -E mode instead of normal output

## sed options:

### Using 'sed /pattern/'

Sed has the ability to specify which lines are to be examined and/or modified, by specifying addresses before the command. I will just describe the simplest version for now - the /PATTERN/ address. When used, only lines that match the pattern are given the command after the address. Briefly, when used with the /p flag, matching lines are printed twice:

sed '/PATTERN/p' file
And of course PATTERN is any regular expression.

Please note that if you do not include a command, such as the "p" for print, you will get an error. When I type

```bash
echo abc | sed '/a/'
```

I get the error

```
sed: -e expression #1, char 3: missing command
```

Also, you don't need to, but I recommend that you place a space between the pattern and the command. This will help you distinguish between flags that modify the pattern matching, and commands to execute after the pattern is matched. Therefore I recommend this style:

```
sed '/PATTERN/ p' file
```


### Using 'sed -n /pattern/p' to duplicate the function of grep

If you want to duplicate the functionality of grep, combine the -n (noprint) option with the /p print flag:

sed -n '/PATTERN/ p' file

## Sort options

- `-n, --numeric-sort`: compare according to string numerical value

- `-k, --key=POS1[,POS2]`: start a key at POS1, end it at POS2 (origin 1)

‘-k POS1[,POS2]’
‘--key=POS1[,POS2]’

Specify a sort field that consists of the part of the line between POS1 and POS2 (or the end of the line, if POS2 is omitted), _inclusive_.

Each POS has the form ‘F[.C][OPTS]’, where F is the number of the field to use, and C is the number of the first character from the beginning of the field.  Fields and character positions are numbered starting with 1; a character position of zero in POS2 indicates the field’s last character.  If ‘.C’ is omitted from POS1, it defaults to 1 (the beginning of the field); if omitted from POS2, it defaults to 0 (the end of the field).  OPTS are ordering options, allowing individual keys to be sorted according to different rules; see below for details.  Keys can span multiple fields.

Example: To sort on the second field, use ‘--key=2,2’ (‘-k 2,2’). See below for more notes on keys and more examples.  See also the


### References

- [Sed - An Introduction and Tutorial by Bruce Barnett](http://www.grymoire.com/Unix/Sed.html#uh-1)
