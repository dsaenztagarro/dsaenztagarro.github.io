---
layout: post
title:  "Bash special parameters #1"
date:   2016-01-23 13:00:00 +0100
categories: bash
---

The `shift` command is one of the Bourne shell built-ins that comes with Bash.
This command takes one argument, a number. The positional parameters are
shifted to the left by this number, N. The positional parameters from N+1 to $#
are renamed to variable names from $1 to $# - N+1.

Say you have a command that takes 10 arguments, and N is 4, then $4 becomes $1,
$5 becomes $2 and so on. $10 becomes $7 and the original $1, $2 and $3 are
thrown away.

If N is zero or greater than $#, the positional parameters are not changed and
the command has no effect. If N is not present, it is assumed to be 1. The
return status is zero unless N is greater than $# or less than zero; otherwise
it is non-zero.

`$#` is the number of positional parameters.

Example extracted from `bootstrap.sh` of my [dotfiles](https://github.com/dsaenztagarro/dotfiles):

{% highlight shell linenos %}
#!/bin/bash
# Use > 1 to consume two arguments per pass in the loop (e.g. each
# argument has a corresponding value to go with it).
# Use > 0 to consume one or more arguments per pass in the loop (e.g.
# some arguments don't have a corresponding value to go with it such
# as in the --default example).
# note: if this is set to > 0 the /etc/hosts part is not recognized ( may be a bug )
while [[ $# > 0 ]]
do
key="$1"

case $key in
    -e|--extra)
      EXTRA_FILE="$2"
      shift # past argument
      ;;
    -d|--defaults)
      EXTRA_FILE="macbook"
      ;;
    *)
      # unknown option
      ;;
esac
shift # past argument or value
done
{% endhighlight %}
