from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

from django.contrib.auth.signals import user_logged_out

class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('User must have an email address')
        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

    # https://docs.djangoproject.com/en/1.10/topics/auth/customizing/#django.contrib.auth.models.CustomUserManager.create_superuser
    def create_superuser(self, email, password):
        user = self.create_user(email=email, password=password)
        user.is_admin = True
        user.is_superuser = True
        user.is_active = True
        user.save(using=self._db)
        return user

# https://docs.djangoproject.com/en/1.10/topics/auth/customizing/#django.contrib.auth.models.CustomUser.USERNAME_FIELD
class MyUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    created = models.DateField(auto_now_add=True)
    last_updated = models.DateField(auto_now=True)

    @property
    def links(self):
        return Link.objects.filter(user=self).values('title', 'url',
                                                     'description', 'archived',
                                                     'created', 'last_updated')

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    # TODO: should these methods be in serializer or the model?
    # need to overwrite the create method so the password gets hashed
    def create(self, validated_data):
        user = MyUser(email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        return user

    # need to overwrite update method so that the password gets hashed
    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.set_password(validated_data['password'])
        instance.save()
        return instance

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        # TODO
        return True

    def has_moduel_perms(self, app_label):
        # TODO
        return True

    @property
    def is_staff(self):
        return self.is_admin

class Settings(models.Model):
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE)
    background_choices = [('sepia', 'sepia'), ('bright', 'bright'), ('dark', 'dark')]
    background = models.CharField(max_length=10, choices=background_choices, default='bright')

    def __str__(self):
        return 'Settings of user: {}'.format(self.user)

    def __repr__(self):
        return '<Settings:: user: %s, background: %s>'.format(self.user, self.background)

class Link(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)

    title = models.CharField(max_length=200)
    url = models.URLField()
    description = models.CharField(max_length=200)
    archived = models.BooleanField(default=False)

    created = models.DateField(auto_now_add=True)
    last_updated = models.DateField(auto_now=True)

    def create(self, validated_data):
        return Link.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.url = validated_data.get('url', instance.url)
        instance.archived = validated_data.get('archived', instance.archived)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        return instance

    def as_dict(self):
        return {'title': self.title, 'url': self.url, 'archived': self.archived}

    def __repr__(self):
        return "<Link:: title: {}, url: {}, description: {}>".format(self.title, self.url, self.description)

    # used in Django Admin page
    def __str__(self):
        return "Link with title: {}, url: {}, description: {}".format(self.title, self.url, self.description)
