from django.contrib.sites.models import Site
my_site = Site.objects.get(pk=1)
my_site.domain = 'getlinky.com'
my_site.name = 'Linky'
my_site.save()
