"""Just helper functions for the report app"""

import json
from reports.models import Report

def report_save(owner, content):
    """
    Wraps the model's save
    It simply saves the report with the given content
    """
    if content.get("id"):
        report_id = content["id"]
        report = Report.objects.get(id=report_id, owner=owner) # pylint: disable=no-member
    else:
        report = Report()
        report.owner = owner
    report.title = content["title"]
    report.data = json.dumps(content)
    report.save()

    return report
