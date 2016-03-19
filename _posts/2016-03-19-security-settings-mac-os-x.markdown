---
layout: post
title:  "Security Settings on Mac OS X"
date:   2016-03-19 02:00:00 +0100
tags:
- security
---

- Encrypt all your hard drives. If you have a Mac laptop, it is very
  straightforward to enable [FileVault
  2](https://support.apple.com/en-us/HT204837). If you have a SSD you will not
  notice. If you have Time Machine backups, encrypting these is very easy too.

- Use [1Password](https://agilebits.com/onepassword) or similar software to
  store all your passwords. Don't store passwords or files that contain
  important information unencrypted.

- Never share passwords over plain text emails. Use a secure mechanism instead
  (e.g., [OneTimeSecret](https://onetimesecret.com/))

- [Generate a new SSH
  key](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)
  for each account (github, bitbucket, digitalocean droplets..) and add it to
    the ssh-agent.

- [Add SSH key
  passphrases](https://help.github.com/articles/working-with-ssh-key-passphrases/).
  If you are on OS X Leopard or later, ssh-agent runs automatically for you. It
  will also integrate with the keychain, so you can unlock your keys with it.

- When I need to generate a password, I always use 1Password to generate it
  with the highest strength possible.

- Add a message to the login window

{% highlight bash linenos %}
sudo defaults write /Library/Preferences/com.apple.loginwindow LoginwindowText "Please return to David +34695680107"
{% endhighlight %}