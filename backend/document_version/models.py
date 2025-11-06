from django.db import models
from backend.users.models import User
from documents.models import Documents
import uuid
from django_ckeditor_5.fields import CKEditor5Field
from django.utils.translation import gettext_lazy as _
from django.db.models import Index
from django.db.models.functions import Lower

class DocumentVersion(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document_id = models.ForeignKey(Documents, on_delete=models.CASCADE, related_name='document_version')
    created_by = models.DateTimeField(_(""), auto_now=False, auto_now_add=True)
    change_summary = models.TextField(_(""), default="")
    content_delta = CKEditor5Field( default="")
    version_number = models.CharField(_(""), max_length=10, default="1.0")
    
    def __str__(self):
        doc = Documents.objects.get(pk=self.document_id)
        return f"{doc.title} - {self.version_number}"
        
    class Meta:
        indexes = [
            Index(fields=['document_id', "version_number"], name='document_id_idx'),
        ]