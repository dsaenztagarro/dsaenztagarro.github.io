---
layout: post
title:  "Bash special parameters #2"
date:   2016-01-22 13:00:00 +0100
tags:
- bash
---

The `trap` defines and activates handlers to be run when the shell receives
signals or other special conditions.

{% highlight bash %}
trap [-lp] [[ARG] SIGNAL_SPEC...]
{% endhighlight %}

- `ARG` is a command to be read and executed when the shell receives the signal(s)

- `SIGNAL_SPEC`. If `ARG` is absent (and a single `SIGNAL_SPEC` is supplied) or
  `ARG` is a dash ("-"), each specified signal is reset to its original value.
  If `ARG` is the null string, each `SIGNAL_SPEC` is ignored by the shell and by
  the commands it invokes.

- If a `SIGNAL_SPEC` is `EXIT (0)`, `ARG` is executed upon exit from the shell.

- If a `SIGNAL_SPEC` is `DEBUG`, `ARG` is executed before every simple command.

- If a `SIGNAL_SPEC` is `RETURN`, `ARG` is executed each time a shell function or a
  script run by the "." or source built-in commands finishes executing.

A `SIGNAL_SPEC` of `ERR` means to execute `ARG` each time a command's failure
would cause the shell to exit when the -e option is enabled.  If no arguments
are supplied, trap prints the list of commands associated with each signal.

In bash `$$` is the process ID, which is fine if you need a single file,
otherwise take a look at the `mktemp` command.

Example extracted from `.git_template/hooks/ctags` of my **[dotfiles](https://github.com/dsaenztagarro/dotfiles)**:

{% highlight bash linenos %}
set -e
PATH="/usr/local/bin:$PATH"
dir="`git rev-parse --git-dir`"
trap 'rm -f "$dir/$$.tags"' EXIT
git ls-files | \
  ctags --tag-relative -L - -f"$dir/$$.tags" --languages=-javascript,sql
mv "$dir/$$.tags" "$dir/tags"
{% endhighlight %}

Explanation for git command: `git rev-parse --git-dir`

Show `$GIT_DIR` if defined. Otherwise show the path to the .git directory.
The path shown, when relative, is relative to the current working directory.

If `$GIT_DIR` is not defined and the current directory is not detected to lie
in a Git repository or work tree print a message to stderr and exit with
nonzero status.
