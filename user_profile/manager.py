""" Manager for user_profile app """

from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    """
    Manager class for user_profile app
    """
    def create_user(self, email, password=None):
        """
        Method to create a regular user
        """
        if not email:
            raise ValueError("Email must be provided")

        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Method to create a super user
        """
        user = self.create_user(email, password=password)
        user.is_admin = True
        user.save(using=self._db)
        return user
