"""
Views for pages app
"""

from django.shortcuts import render
from django.views.decorators.http import (
    require_http_methods,
)


@require_http_methods(["GET"])
def home(request):
    """
    The home view function
    """
    return render(request, "home.html")
