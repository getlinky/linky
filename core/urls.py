from django.conf.urls import include, url
from rest_framework import routers

from . import views
from linky import settings

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'links', views.LinkViewSet, base_name='links')

urlpatterns = [
    url(r'^api/', include(router.urls)),
]
