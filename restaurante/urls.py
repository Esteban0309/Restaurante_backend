from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BebidaViewSet, DesayunoViewSet, EntradaViewSet, PlatoFuerteViewSet, PostreViewSet, VinoViewSet

router = DefaultRouter()
# Esto mapeará automáticamente /restaurante/bebidas/ para el CRUD completo
router.register(r'bebidas', BebidaViewSet, basename='bebidas')
router.register(r'desayunos', DesayunoViewSet, basename='desayunos') 
router.register(r'entradas', EntradaViewSet, basename='entradas')
router.register(r'platosfuertes', PlatoFuerteViewSet, basename='platosfuertes')
router.register(r'postres', PostreViewSet, basename='postres')
router.register(r'vinos', VinoViewSet, basename='vinos')

urlpatterns = [
    path('', include(router.urls)),
]