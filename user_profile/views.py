"""Views for user_profile app"""

from django.contrib.auth import views as auth_views
from django.views.generic import CreateView
from django.urls import reverse_lazy
from user_profile.forms import LoginForm, CustomUserCreationForm


class LoginView(auth_views.LoginView): # pylint: disable=too-many-ancestors
    """Custom class based login view that extends django's login view"""

    template_name = "login.html"
    redirect_authenticated_user = True
    authentication_form = LoginForm


class LogoutView(auth_views.LogoutView):
    """Custom class based logout view that extends django's logout view"""

class SignupView(CreateView): # pylint: disable=too-many-ancestors
    """Custom class based signup view that extends django's signup view"""
    template_name = "signup.html"
    success_url = reverse_lazy('login')
    form_class = CustomUserCreationForm
