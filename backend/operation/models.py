from django.db import models
from documents.models import Documents
from django_ckeditor_5.fields import CKEditor5Field
from backend.users.models import User


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
    