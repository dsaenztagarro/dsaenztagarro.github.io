---
layout: post
title:  "Creating Launch Agents #1"
date:   2016-03-03 02:00:00 +0100
tags:
- agents
---

# Step 1
**Create file `com.bebanjo.booklog.plist` under `~/Library/LaunchAgents` folder.**

The following example sets standard out and error to go to a log file.

{% highlight xml linenos %}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.bebanjo.booklog</string>
    <key>RunAtLoad</key>
    <true/>
    <key>ProgramArguments</key>
    <array>
      <string>/Users/dst/Scripts/com.bebanjo.booklog.sh</string>
    </array>
    <key>StandardOutPath</key>
    <string>/Users/dst/Library/Logs/com.bebanjo.booklog.out</string>
    <key>StandardErrorPath</key>
    <string>/Users/dst/Library/Logs/com.bebanjo.booklog.err</string>
    <key>Debug</key>
    <true/>
</dict>
</plist>
{% endhighlight %}

**XML PROPERTY LIST KEYS**

The following keys can be used to describe the configuration details of your
daemon or agent.  Property lists are Apple's standard configuration file
format. Please see plist(5) for more information. Please note: property list
files are expected to have their name end in ".plist".  Also please note that
it is the expected convention for launchd property list files to be named
<Label>.plist.  Thus, if your job label is "com.apple.sshd", your plist file
should be named "com.apple.sshd.plist".

#### Label `<string>`
This required key uniquely identifies the job to launchd.

#### Disabled `<boolean>`
This optional key is used as a hint to launchctl(1) that it
should not submit this job to launchd when loading a job or jobs. The value of
this key does NOT reflect the current state of the job on the run-ning running
ning system. If you wish to know whether a job is loaded in launchd, reading
this key from a configura-tion configuration tion file yourself is not a
sufficient test. You should query launchd for the presence of the job using the
launchctl(1) list subcommand or use the ServiceManagement framework's
SMJobCopyDictionary() method.

Note that as of Mac OS X v10.6, this key's value in a configuration file
conveys a default value, which is changed with the [-w] option of the
launchctl(1) load and unload subcommands. These subcommands no longer modify
the configuration file, so the value displayed in the configuration file is not
necessar-ily necessarily ily the value that launchctl(1) will apply. See
launchctl(1) for more information.

Please also be mindful that you should only use this key if the provided
on-demand and KeepAlive crite-ria criteria ria are insufficient to describe the
conditions under which your job needs to run. The cost to have a job loaded in
launchd is negligible, so there is no harm in loading a job which only runs
once or very rarely.

#### Program `<string>`
This key maps to the first argument of execvp(3).  If this key is missing, then
the first element of the array of strings provided to the ProgramArguments will
be used instead.  This key is required in the absence of the ProgramArguments
key.

ProgramArguments <array of strings> This key maps to the second argument of
execvp(3).  This key is required in the absence of the Program key. Please
note: many people are confused by this key. Please read execvp(3) very
carefully!

#### RunAtLoad `<boolean>`
This optional key is used to control whether your job is launched once at the
time the job is loaded.  The default is false.

#### StandardOutPath `<string>`
This optional key specifies what file should be used for data being sent to
stdout when using stdio(3).

#### StandardErrorPath `<string>`
This optional key specifies what file should be used for data being sent to stderr when using stdio(3).

#### Debug `<boolean>`
This optional key specifies that launchd should adjust its log mask temporarily
to LOG_DEBUG while dealing with this job.


## Step 2
**Create file `com.bebanjo.booklog.sh` under `~/Scripts` folder.**

{% highlight bash linenos %}
#!/bin/bash --login
load_rvm
cd /Users/dst/Work/bebanjo-booklog
jekyll serve
{% endhighlight %}

## Step 3
**Run command**

{% highlight bash %}
launchctl load -w com.bebanjo.booklog.plist
{% endhighlight %}

#### NAME
launchctl -- Interfaces with launchd

#### DESCRIPTION
launchctl interfaces with launchd to load, unload daemons/agents and generally
control launchd.  launchctl supports taking subcommands on the command line,
interactively or even redirected from stan-dard standard dard input.  These
commands can be stored in $HOME/.launchd.conf or /etc/launchd.conf to be read
at the time launchd starts.

#### SUBCOMMANDS
```
load [-wF] [-S sessiontype] [-D domain] paths ...
```

Load the specified configuration files or directories of configuration files.
Jobs that are not on-demand will be started as soon as possible.  All specified
jobs will be loaded before any of them are allowed to start.  Note that
per-user configuration files (LaunchAgents) must be owned by the user loading
them. All system-wide daemons (LaunchDaemons) must be owned by root.
Configuration files must not be group- or world-writable. These restrictions
are in place for security reasons, as allowing writability to a launchd
configuration file allows one to specify which executable will be launched.

Note that allowing non-root write access to the /System/Library/LaunchDaemons directory WILL
render your system unbootable.

-w       Overrides the Disabled key and sets it to false. In previous versions, this option
         would modify the configuration file. Now the state of the Disabled key is stored
         elsewhere on-disk.


## Common pitfalls:

- Don't use relative paths like `~/Scripts/start_bebanjo_blog.sh`.
- Don't run `launctl load -w com.bebanjo.booklog` under TMUX.
