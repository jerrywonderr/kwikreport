"""Views for user_profile app"""

from django.contrib.auth import views as auth_views
from django.shortcuts import render
from django.views.decorators.http import (
    require_http_methods,
)
from django.contrib.auth.forms import UserCreationForm


class LoginView(auth_views.LoginView): # pylint: disable=too-many-ancestors
    """Custom class based login view that extends django's login view"""

    template_name = "login.html"
    redirect_authenticated_user = True


class LogoutView(auth_views.LogoutView):
    """Custom class based logout view that extends django's logout view"""

@require_http_methods(['GET', 'POST'])
def signup(request):
    """The view that handles signup"""
    return render(request, 'signup.html', {'form': UserCreationForm})
