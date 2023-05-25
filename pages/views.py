"""
Views for pages app
"""

from django.shortcuts import render
from django.views.decorators.http import (
    require_http_methods,
)
from django.contrib.auth.decorators import login_required

from reports.models import Report


@login_required
@require_http_methods(["GET"])
def home(request):
    """
    The home view function
    """
    reports = Report.objects.filter(owner=request.user) # pylint: disable=no-member
    params = {
        "reports": reports
    }
    return render(request, "home.html", params)


def add_report(request):
    """This view handles report creation"""
    return render(request, 'add-report.html')
