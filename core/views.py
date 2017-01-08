import django_filters.rest_framework
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework import viewsets
from rest_framework import filters
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated

from .models import MyUser, Link, Settings
from .serializers import UserSerializer, LinkSerializer
from .permissions import IsAuthenticatedOrIsCreate, IsSuperUserOrNoList


# TODO: make this viewable on admin interface as postable
class UserViewSet(viewsets.ModelViewSet):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('email',)
    permission_classes = (IsSuperUserOrNoList, IsAuthenticatedOrIsCreate,)

    # Only allow super users to index into /users/, but allow normal users to
    # request /users/me
    def get_object(self):
        pk = self.kwargs['pk']
        if pk == 'me':
            return self.request.user
        elif self.request.user.is_superuser:
            return MyUser.objects.get(pk=pk)
        else:
            raise AuthenticationFailed()


class LinkViewSet(viewsets.ModelViewSet):
    model = Link
    serializer_class = LinkSerializer
    filter_backends = (filters.SearchFilter, django_filters.rest_framework.DjangoFilterBackend,)
    search_fields = ('title', 'url', 'description')
    filter_fields = ('archived',)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Link.objects.all()
        else:
            return Link.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@ensure_csrf_cookie
def index(request):
    return render(request, 'index.html')
