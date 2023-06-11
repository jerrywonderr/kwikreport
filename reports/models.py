"""Report model module"""
from uuid import uuid4
from django.db import models
from django.core.serializers import serialize

class Report(models.Model):
    """Report model class"""
    # pylint: disable=too-few-public-methods

    class SharingChoice(models.TextChoices):
        """This enum defines the possible values for the sharing state of a report"""

        PUBLIC = "PB", "Public"  # Share with public
        NONE = "No", "None"  # Not shared

    id = models.UUIDField("id", primary_key=True, default=uuid4)
    owner = models.ForeignKey(
        "user_profile.User", to_field="email", name="owner", on_delete=models.CASCADE
    )
    title = models.CharField("title", blank=False)
    created = models.DateTimeField("created", auto_now_add=True)
    last_modified = models.DateTimeField("last modifed", auto_now=True)
    data = models.JSONField("data", null=True, blank=True)
    sharing = models.CharField(
        "sharing",
        max_length=12,
        choices=SharingChoice.choices,
        default=SharingChoice.NONE,
    )

    class Meta:
        """Meta class for report model"""

        db_table = "report"

    def __str__(self):
        return f"{self.title}"

    def to_json(self, fields=None, extra_fields=None):
        """
        Serializes the report object to a response ready JSON format
        Default fields are title, owner, data
        Args
        fields - the name of the instance properties to be parsed (this overrides the default)
        extra_fields - extra fields to be parsed alongside the default
        """
        fields_to_parse = ["title", "owner", "data"]
        if not fields:
            fields_to_parse = fields
        if extra_fields:
            fields_to_parse.extend(extra_fields)
        data = serialize("json", [self], fields=fields_to_parse)
        return data

    def is_shared(self) -> bool:
        """Checks if a report is public"""
        return self.sharing == self.SharingChoice.PUBLIC

    def is_not_shared(self) -> bool:
        """Checks if a report is private"""
        return self.sharing == self.SharingChoice.NONE

    def make_public(self):
        """Makes a report public"""
        if not self.is_shared():
            self.sharing = self.SharingChoice.PUBLIC

    def make_private(self):
        """Makes a report private"""
        if not self.is_not_shared():
            self.sharing = self.SharingChoice.NONE
