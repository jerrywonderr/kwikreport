"""Report model module"""
import json
from uuid import uuid4
from django.db import models
from django.core.serializers import serialize


class Report(models.Model):
    # pylint: disable=too-few-public-methods
    """Report model class"""
    id = models.UUIDField("id", primary_key=True, default=uuid4)
    owner = models.ForeignKey(
        "user_profile.User", to_field="email", name="owner", on_delete=models.CASCADE
    )
    title = models.CharField("title", blank=False)
    created = models.DateTimeField("created", auto_now_add=True)
    last_modified = models.DateTimeField("last modifed", auto_now=True)
    data = models.JSONField("data", null=True, blank=True)

    class Meta:
        """Meta class for report model"""

        db_table = "report"

    def __str__(self):
        return f'{self.title}'

    def save_report(self, owner, content):
        """
        Wraps the model's save
        It simply saves the report with the given content
        """
        self.title = content['title']
        self.owner = owner
        self.data = json.dumps(content)
        return self.save()

    def to_json(self, fields=None, extra_fields=None):
        """
        Serializes the report object to a response ready JSON format
        Default fields are id, title, owner, data
        Args
        fields - the name of the instance properties to be parsed (this overrides the default)
        extra_fields - extra fields to be parsed alongside the default
        """
        fields_to_parse = ['id', 'title', 'owner', 'data']
        if not fields:
            fields_to_parse = fields
        if extra_fields:
            fields_to_parse.extend(extra_fields)
        data = serialize('json', [self], fields=fields_to_parse)
        return data
