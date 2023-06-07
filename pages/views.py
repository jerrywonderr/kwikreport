"""
Views for pages app
"""

from django.shortcuts import render
from django.views.decorators.http import (
    require_http_methods,
)
from django.contrib.auth.decorators import login_required

@login_required
@require_http_methods(["GET"])
def home(request):
    """
    The home view function
    """
    return render(request, "home.html")


def add_report(request):
    """This view handles report creation"""
    return render(request, 'add-report.html')

@login_required
@require_http_methods(["GET"])
def contact(request):
    """
    The contact us view function
    """
    return render(request, "contact.html")

@login_required
@require_http_methods(["GET"])
def account(request):
    """
    The account view function
    """
    return render(request, "account.html")
