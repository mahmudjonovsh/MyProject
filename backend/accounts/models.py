from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    company = models.CharField(max_length=100, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    plan_type = models.CharField(max_length=20, default='free')
    newsletter_subscribed = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email