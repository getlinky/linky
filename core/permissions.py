from rest_framework import permissions

class IsAuthenticatedOrIsCreate(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated():
            if view.action == 'create':
                return True
            else:
                return False
        else:
            return True

class IsSuperUserOrNoList(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_superuser and view.action == 'list':
            return False
        else:
            return True

