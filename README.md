# linky

> A tool for storing links

Linky is a website for storing links and nothing more, with a focus on simple
to use keybinds for the utmost efficiency and ease of use.

Linky is powered by [Vue.js][1] on the frontend, and [Django-Rest-Framework][2] on the backend.

[1]: https://vuejs.org
[2]: http://www.django-rest-framework.org

## Dev

```
git clone https://github.com/sbdchd/linky && cd linky

cd frontend && \
npm install && \
cd ..

python3 -m virtualenv venv

. venv/bin/activate

pip install -r requirements.txt

postgres -D /usr/local/var/postgres

python manage.py migrate

python manage.py runserver

# in another shell

cd frontend && \
npm run dev

# in another shell (when testing password reset flow)

python -m smtpd -n -c DebuggingServer localhost:1025
```

```
# interacting with django through the shell

python manage.py shell -i ipython

import django
django.setup()

from .models import *
```

Database (Postgresql)

```bash
# after installing postgres
# Note: I needed to do http://stackoverflow.com/a/34092546 due to an old install
postgres -D /usr/local/var/postgres

# In another shell
createuser linkyadmin

createdb -O linkyadmin linkydb

# access db
psql -d linkydb

# add permission so django can create testing db
ALTER USER linkyadmin CREATEDB;

# Note: after creating your database be sure to apply django migrations and
# createsuperuser if necessary

# get database scheme
\d

# delete database
dropdb linkydb

# delete user
dropuser linkyadmin
```
