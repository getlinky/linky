from django.conf.urls import include, url
from django.contrib.auth import views as auth_views
from rest_framework import routers

from . import views
from linky import settings

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'links', views.LinkViewSet, base_name='links')

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
     url(r'^reset/confirm/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$', auth_views.password_reset_confirm, name='password_reset_confirm'),
]

