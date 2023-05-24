"""Report model module"""
from uuid import uuid4
from django.db import models


class Report(models.Model):
    # pylint: disable=too-few-public-methods
    """Report model class"""
    id = models.UUIDField("id", primary_key=True, default=uuid4)
    owner = models.ForeignKey(
        "user_profile.User", to_field="email", name="owner", on_delete=models.CASCADE
    )
    title = models.CharField("title", unique=True, blank=False)
    created = models.DateTimeField("created", auto_now_add=True)
    last_modified = models.DateTimeField("last modifed", auto_now=True)
    data = models.JSONField("data", null=True, blank=True)

    class Meta:
        """Meta class for report model"""

        db_table = "report"

    def __str__(self):
        return f'{self.title}'
