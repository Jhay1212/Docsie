from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from .views import DocumentViewSet
from .consumers import DocumentConsumer


router = DefaultRouter()
router.register("documents", DocumentViewSet, basename="documents")

urlpatterns = [
    path("", include(router.urls)),
    re_path(r"ws/chat/$", DocumentConsumer.as_asgi()),
]
