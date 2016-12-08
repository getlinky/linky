from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^archive/', views.archive, name='archive'),
    url(r'^logout/', views.logout, name='logout'),
    url(r'^$', views.index, name='index'),
]
