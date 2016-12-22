from rest_framework import routers, serializers, viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated

from core.models import MyUser, Link


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MyUser
        fields = ('email', 'is_staff', 'password')


class LinkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Link
        fields = ('title', 'url', 'description', 'archived', 'created',
                  'last_updated', 'id')
        read_only = ('id', 'last_updated', 'created')


# TODO: make this viewable on admin interface as postable
class UserViewSet(viewsets.ModelViewSet):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer

    permission_classes_by_action = {'create': [AllowAny],
                                    'list': [IsAdminUser]}

    # Only allow super users to index into /users/, but allow normal users to
    # request /users/me
    def get_object(self):
        pk = self.kwargs['pk']
        if pk == 'me':
            return self.request.user
        elif self.request.user.is_superuser:
            return MyUser.objects.get(pk=pk)
        else:
            raise PermissionDenied()

    def get_permissions(self):
        try:
            # return permission_classes depending on `action`
            return [permission()
                    for permission in self.permission_classes_by_action[
                        self.action]]
        except KeyError:
            # action is not set return default permission_classes
            return [permission() for permission in self.permission_classes]


class LinkViewSet(viewsets.ModelViewSet):
    model = Link
    serializer_class = LinkSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Link.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'links', LinkViewSet, base_name='links')
