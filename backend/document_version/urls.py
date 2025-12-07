from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DocumentVersionViewset

router = DefaultRouter()
router.register("documents/version", DocumentVersionViewset, basename="version")

urlpatterns = [
    path("", include(router.urls)),
]
