from django.core.signals import request_finished
from django.dispatch import receiver, Signal
from django.contrib.auth import get_user_model
from django.db.models.signals import pre_save, post_save
from .models import Documents
from document_version.models import DocumentVersion


@receiver(post_save,sender=Documents )
def document_created(sender, instance, created,*args, **kwargs):
    """
    Docstring for document_created
    
    Creates document version when document is created    
    """
    if created:
        latest_version = instance.document_version.order_by("-version_number").first()
        if latest_version:
            next_version = (latest_version.version_number + 1) if latest_version else 1
            doc_version = DocumentVersion.objects.create(document=instance, 
                                                        version_number=str(next_version))
    

   