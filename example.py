import random, string
import django
django.setup()

from core.models import MyUser, Link

u = MyUser()

# need something unique to appease the database requirements
# after running the script once, the database has the item so you have to make
# 'em unique'
u.username = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(20))

u.save()

u.link_set.all()
u.link_set.create(title='Google', url='www.google.com', description='a search engine')
u.link_set.create(title='Mozilla', url='www.mozilla.com', description='a compnay')
u.link_set.all()

