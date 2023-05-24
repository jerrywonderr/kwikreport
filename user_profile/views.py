"""Views for user_profile app"""

from django.contrib.auth import views as auth_views


class LoginView(auth_views.LoginView): # pylint: disable=too-many-ancestors
    """Custom class based login view that extends django's login view"""

    template_name = "login.html"
    redirect_authenticated_user = True


class LogoutView(auth_views.LogoutView):
    """Custom class based logout view that extends django's logout view"""
