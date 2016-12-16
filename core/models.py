from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django import forms

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
        user = self.model(email=email, password=password)
        user.is_admin = True
        user.save(using=self._db)
        return user

# https://docs.djangoproject.com/en/1.10/topics/auth/customizing/#django.contrib.auth.models.CustomUser.USERNAME_FIELD
class MyUser(AbstractUser):
    email = models.EmailField(unique=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    created = models.DateField(auto_now_add=True)
    last_updated = models.DateField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

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

class Link(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    # meat of the link
    title = models.CharField(max_length=200)
    url = models.URLField()
    description = models.CharField(max_length=200)
    archived = models.BooleanField(default=False)
    # dates
    created = models.DateField(auto_now_add=True)
    last_updated = models.DateField(auto_now=True)

    def __repr__(self):
        return "<Link: title: {}, url: {}, description: {}>".format(self.title, self.url, self.description)
