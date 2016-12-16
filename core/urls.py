from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^archive/', views.archive, name='archive'),
    url(r'^signup/', views.signup, name='signup'),
    url(r'^login/', views.login_view, name='login'),
    url(r'^logout/', views.logout_view, name='logout'),
    url(r'^$', views.index, name='index'),
]
