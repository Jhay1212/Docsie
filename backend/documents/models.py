from django.db import models
import uuid
from django.utils.translation import gettext_lazy as _
from backend.users.models import User
from django.utils.text import slugify
from django.db.models import Index
from django_ckeditor_5.fields import CKEditor5Field

from django.db.models.functions import Lower

class Documents(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(_("Document Title"), max_length=128, default="Untitled", blank=True)
    slug = models.CharField(_("Document Slug"), max_length=128, default="untitled", blank=True)
    owner_id = models.ForeignKey(User, on_delete=models.CASCADE)
    text = CKEditor5Field( default="", blank=True)
    date_created = models.DateTimeField(_(""), auto_now=False, auto_now_add=True)
    date_modified = models.DateTimeField(_(""), auto_now=True, auto_now_add=False)
    collaborator = models.ManyToManyField(
    User,
    related_name='collaborator',
    blank=True,
    )
    is_public = models.BooleanField(_(""), default=False)
    
    @property
    def line_count(self):
        return len(self.text.splitlines())
    
    @property
    def word_count(self):
        return len(self.text.split())
    
    @property
    def character_count(self):
        return len(self.text)
    
    @property
    def collaborators(self):
        return self.collaborator.all()
    def save(self, *args, **kwargs):
        """
        Override the original save method to set the
        modified_by field to add value to slug field
        """
        if self.title.lower() != "untitled":
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
        
    
    
    class Meta:
        verbose_name = _("Document")
        verbose_name_plural = _("Documents")
        indexes = [
            Index(fields=['title'], name='title_idx'),
            Index(Lower('title'), name='title_lower_idx'),
            Index(fields=['slug'], name='slug_idx'),
            Index(Lower('slug'), name='slug_lower_idx'),
        ]


    def __str__(self):
        return self.title

class Operation(models.Model):
    OPERATION_TYPES = [
        ("insert", "Insert"),
        ("delete", "delete"),
        ("retain", "retain")
    ]
    
    document = models.ForeignKey(Documents, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    operation_type = models.CharField(max_length=10, choices=OPERATION_TYPES)
    data = CKEditor5Field()
    timestamp = models.DateTimeField(auto_now_add=True)
    position = models.IntegerField(default=0)
    version = models.IntegerField(default=1)
    