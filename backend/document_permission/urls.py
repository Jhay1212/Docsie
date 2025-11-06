from .views import DocumentPermissionViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"document_permission", DocumentPermissionViewSet, basename="document_permission")

urlpatterns = router.urls
