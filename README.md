# linky

> A tool for storing links

[trello](https://trello.com/c/nkjHzDa5/13-bookmarking-website)

## Dev

```
git clone https://github.com/sbdchd/linky && cd linky

npm install -g grunt-cli

npm install

python3 -m virtualenv venv

. venv/bin/activate

pip install -r requirements.txt

python manage.py runserver

# in another shell (only necessary when working with sass and js)

grunt && grunt watch
```

```
# interacting with django through the shell

python manage.py shell -i ipython

import django
django.setup()

from app_name.models import ModelName
```
