from django.conf.urls import include, url
from django.contrib.auth import views as auth_views

from . import views

urlpatterns = [
    url(r'^archive/', views.archive, name='archive'),
    url(r'^signup/', views.signup, name='signup'),
    url(r'^login/', views.login_view, name='login'),
    url(r'^logout/', views.logout, name='logout'),
    url(r'download/links.json', views.download_links_json, name='download_links_json'),
    url(r'^$', views.index, name='index'),
]
