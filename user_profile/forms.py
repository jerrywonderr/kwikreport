"""Forms we'll be using for authentication"""

from django.contrib.auth.forms import AuthenticationForm, UserCreationForm, UserChangeForm
from user_profile.models import User

class LoginForm(AuthenticationForm): # pylint: disable=too-many-ancestors
    """Login form for authentication"""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        fields = self.visible_fields()

        for field in fields:
            field.field.widget.attrs['class'] = 'form-control'
            field.field.widget.attrs['placeholder'] = field.field.label

class CustomUserCreationForm(UserCreationForm): # pylint: disable=too-many-ancestors
    # pylint: disable=too-few-public-methods
    """Form to create a new user"""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        fields = self.visible_fields()

        for field in fields:
            field.field.widget.attrs['class'] = 'form-control'
            field.field.widget.attrs['placeholder'] = field.field.label

    class Meta:
        """Meta class for the form"""
        model = User
        fields = ("email", )


class CustomUserChangeForm(UserChangeForm): # pylint: disable=too-many-ancestors
    # pylint: disable=too-few-public-methods
    """Form to edit user info"""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        fields = self.visible_fields()

        for field in fields:
            field.field.widget.attrs['class'] = 'form-control'
            field.field.widget.attrs['placeholder'] = field.field.label
        self.fields['email'].widget.attrs['helper_text'] = 'Enter a valid email address'

    class Meta:
        """Meta class for the form"""
        model = User
        fields = ("email", )
