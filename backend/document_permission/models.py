from django.db import models
from backend.users.models import User
from documents.models import Documents
import uuid
from enum import IntEnum
class PermissionType(IntEnum):
    EDIT = 1
    VIEW = 2
    FULL = 3

class DocumentPermission(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    docs = models.ForeignKey(Documents, on_delete=models.CASCADE, related_name='document_permission')
    granted_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='granted_by')
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name="user_permission")
    permission_type = models.IntegerField(choices=[(tag.value, tag.name) for tag in PermissionType])

    def __str__(self):
        return str(self.permission_type)
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["docs", "granted_by", "user_id"],
                name="unique_document_permission",
            )
        ]