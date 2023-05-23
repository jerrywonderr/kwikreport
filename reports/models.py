"""Report model module"""
from django.db import models
from django.contrib.auth import get_user_model


class Reports(models.Model):
    # pylint: disable=too-few-public-methods
    """Report model class"""
    id = models.UUIDField('id', primary_key=True)
    owner = models.ManyToOneRel(get_user_model, 'email', 'owner', on_delete=models.CASCADE)
    title = models.CharField('title', unique=True, blank=False)
    created = models.DateTimeField('created', auto_now_add=True)
    last_modified = models.DateTimeField('last modifed', auto_now=True)
    data = models.JSONField('data', null=True)

    class Meta:
        """Meta class for report model"""
        db_table = 'reports'
