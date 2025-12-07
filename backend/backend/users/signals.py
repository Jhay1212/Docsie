from django.core.signals import request_finished
from django.dispatch import receiver, Signal
from django.contrib.auth import get_user_model
from django.db.models.signals import pre_save, post_save
from .models import User
from django.core.mail import send_mail

User = get_user_model()

@receiver(post_save, sender=User)
def user_created_handler(sender, instance, created, *args, **kwargs):
    if created:
        send_mail(subject=f"Account created for {sender}", message="Account created successfully", from_email="jhayjane78@gmail.com", recipient_list=[instance.email])


    