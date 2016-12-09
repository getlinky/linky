from django.db import models
from django.contrib.auth.models import User

class LinkList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Link(models.Model):
    linklist = models.ForeignKey(LinkList, on_delete=models.CASCADE)
    # meat of the link
    title = models.CharField(max_length=200)
    url = models.URLField()
    description = models.CharField(max_length=200)
    archived = models.BooleanField(default=False)
    # dates
    created = models.DateField(auto_now_add=True)
    last_updated = models.DateField(auto_now=True)
