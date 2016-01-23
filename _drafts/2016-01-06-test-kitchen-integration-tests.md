# Running test-kitchen integration tests in CI

- Access you account in [Digital Ocean](https://www.digitalocean.com/).

- Create a new Personal Access Token. Check [How To Use the DigitalOcean API v2](https://www.digitalocean.com/community/tutorials/how-to-use-the-digitalocean-api-v2) documentation.
  This will provide you with a `DIGITALOCEAN_ACCESS_TOKEN`.

- Run this command to get `DIGITALOCEAN_SSH_KEY_IDS`:

```
curl -X GET https://api.digitalocean.com/v2/account/keys -H "Authorization: Bearer $DIGITALOCEAN_ACCESS_TOKEN"
```

It should return something like this:

```
{"ssh_keys":[{"id":123456,"fingerprint":"<...>","public_key":"ssh-rsa <...>
david.saenz.tagarro@gmail.com","name":"mymacbook"}],"links":{},"meta":{"total":1}}
```

From the root of your cookbook project run this commands to add encrypted
variables to your `.travis.yml` config file.

```
# Gemfile
gem 'travis'

travis encrypt DIGITALOCEAN_ACCESS_TOKEN=<...> --add env.matrix
travis encrypt DIGITALOCEAN_SSH_KEYS=123456 --add env.matrix
```

## Miscellaneous

Trick for fixing `nokogiri` error in Travis CI:

Lock `nokogiri` version in Gemfile to the version of `nokogiri` gem in ChefDK
installed in TravisCI.

```
# /.travis.yml
install:
- chef gem list nokogiri
- chef exec gem install bundler
- chef exec gem install nokogiri -- --use-system-libraries=true --with-xml2-include=/usr/include/libxml2
```

## Resources

- [Travis CI # Environment Variables](https://docs.travis-ci.com/user/environment-variables/#Encrypted-Variables)
- [Digital Ocean API V2](https://developers.digitalocean.com/documentation/v2/#regions)
