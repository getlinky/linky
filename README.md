# linky

> A tool for storing links

[trello](https://trello.com/b/ovCceyss/linky)

## Dev

```
git clone https://github.com/sbdchd/linky && cd linky

npm install -g grunt-cli

cd core && \
npm install && \
cd ..

python3 -m virtualenv venv

. venv/bin/activate

pip install -r requirements.txt

python manage.py runserver

# in another shell (only necessary when working with sass and js)

cd core && \
grunt && grunt watch
```

```
# interacting with django through the shell

python manage.py shell -i ipython

import django
django.setup()

from app_name.models import ModelName
```
