# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2016-12-30 02:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20161219_2338'),
    ]

    operations = [
        migrations.AlterField(
            model_name='link',
            name='description',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='link',
            name='title',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]