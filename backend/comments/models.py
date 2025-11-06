from django.db import models
from backend.users.models import User
from documents.models import Documents
from django.utils.translation import gettext_lazy as _
import uuid
from django_ckeditor_5.fields import CKEditor5Field
from enum import IntEnum
from django.db.models import Index
from django.db.models.functions import Lower


class CommentStatus(IntEnum):
    DRAFT = 1
    PUBLISHED = 2
    


class Comments(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document_id = models.ForeignKey(Documents, on_delete=models.CASCADE, related_name='comments')
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_id')
    comment = CKEditor5Field(default="", blank=True)
    position = models.IntegerField(_(""), default=0, blank=True)
    status = models.IntegerField(_(""), choices=[(tag.value, tag.name) for tag in CommentStatus])
    created_at = models.DateTimeField(_(""), auto_now=False, auto_now_add=True)
    updated_at = models.DateTimeField(_(""), auto_now=True, auto_now_add=False)
    
    def __str__(self):
        return self.comment
    
    class Meta:
        indexes = [
            Index(fields=["comment"], name='comment_idx'),
            Index(Lower('comment'), name='comment_lower_idx'),
        
        ]