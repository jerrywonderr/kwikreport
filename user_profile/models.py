""" Model for the user_profile app """

from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from user_profile.manager import UserManager

class User(AbstractBaseUser):
    # pylint: disable=too-few-public-methods
    """Model for the user_profile app"""
    username = None
    email = models.EmailField(max_length=255,unique=True,)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects= UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


    class Meta:
        """Meta class for user model"""

        db_table = "profile"

    @property
    def is_staff(self):
        """the is_staff property of the user model"""
        return self.is_admin

    def __str__(self):
        """ string representation of the user_profile model """
        return f"{self.email}"

    def has_perm(self, *args): # pylint: disable=unused-argument
        """
        checks if a user have a particular permission
        not fully implemented yet
        """
        return True

    def has_module_perms(self, *args): # pylint: disable=unused-argument
        """
        checks if a user have a particular module permission
        not fully implemented yet
        """
        return True
