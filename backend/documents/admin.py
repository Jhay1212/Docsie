from django.contrib import admin
from .models import Documents
from document_version.models import DocumentVersion



@admin.register(Documents)
class DocumentAdmin(admin.ModelAdmin):
    class Media:
        list_display = ('id', 'owner_id',)
  