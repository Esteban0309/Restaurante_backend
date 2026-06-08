from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import ValidationError
from .models import Bebida, Desayuno, Entrada, PlatoFuerte, Postre, Vino
from .serializers import BebidaSerializer, DesayunoSerializer, EntradaSerializer, PlatoFuerteSerializer, PostreSerializer, VinoSerializer

class BebidaViewSet(viewsets.ModelViewSet):
    queryset = Bebida.objects.all()
    serializer_class = BebidaSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()] # GET /restaurante/bebidas/ no pide Token
        return [IsAuthenticated()] # POST, PUT, DELETE requieren JwtAuthGuard

    def list(self, request, *args, **kwargs):
        is_active = request.query_params.get('isActive', None)
        queryset = self.get_queryset()

        if is_active is not None:
            if is_active not in ['true', 'false']:
                raise ValidationError({"message": 'Valor inválido para "isActive". Usa "true" o "false".'})
            
            queryset = queryset.filter(disponibilidad=(is_active == 'true'))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return Response({
                "success": True,
                "message": "Bebidas obtenidas exitosamente",
                "data": self.get_paginated_response(serializer.data).data
            })

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "success": True,
            "message": "Bebidas obtenidas exitosamente",
            "data": serializer.data
        })

    # Respuesta personalizada al crear (POST)
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({
            "success": True,
            "message": "Bebida creada exitosamente",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)

    # Respuesta personalizada al actualizar (PUT / PATCH)
    # Nota: Maneja también la actualización de la imagen 'profile' de forma nativa
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({
            "success": True,
            "message": "Bebida actualizada exitosamente",
            "data": serializer.data
        })

    # Respuesta personalizada al eliminar (DELETE)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            "success": True,
            "message": "Bebida eliminada exitosamente",
            "data": None
        }, status=status.HTTP_200_OK)

class DesayunoViewSet(viewsets.ModelViewSet):
    queryset = Desayuno.objects.all()
    serializer_class = DesayunoSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()] # POST, PUT, DELETE protegidos con JWT

    # Control de listado (Equivalente a findAll)
    def list(self, request, *args, **kwargs):
        is_active = request.query_params.get('isActive', None)
        queryset = self.get_queryset()

        if is_active is not None:
            if is_active not in ['true', 'false']:
                raise ValidationError({"message": 'Valor inválido para "isActive". Usa "true" o "false".'})
            queryset = queryset.filter(disponibilidad=(is_active == 'true'))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return Response({
                "success": True,
                "message": "desayunos obtenidas exitosamente",
                "data": self.get_paginated_response(serializer.data).data
            })

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "success": True,
            "message": "desayunos obtenidas exitosamente",
            "data": serializer.data
        })

    # Respuesta personalizada al crear (POST)
    # Nota: Ya no necesitas parseFloat manual, DRF rechaza datos inválidos automáticamente
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({
            "success": True,
            "message": "desayuno creada exitosamente",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)

    # Respuesta personalizada al actualizar (PUT / PATCH)
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({
            "success": True,
            "message": "desayuno actualizada exitosamente",
            "data": serializer.data
        })

    # Respuesta personalizada al eliminar (DELETE)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            "success": True,
            "message": "desayuno eliminada exitosamente",
            "data": None
        }, status=status.HTTP_200_OK)
    
class EntradaViewSet(viewsets.ModelViewSet):
    queryset = Entrada.objects.all()
    serializer_class = EntradaSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]

    # Filtrado por parámetro de disponibilidad (isActive)
    def list(self, request, *args, **kwargs):
        is_active = request.query_params.get('isActive', None)
        queryset = self.get_queryset()

        if is_active is not None:
            if is_active not in ['true', 'false']:
                raise ValidationError({"message": 'Valor inválido para "isActive". Usa "true" o "false".'})
            queryset = queryset.filter(disponibilidad=(is_active == 'true'))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return Response({
                "success": True,
                "message": "Entradas obtenidas exitosamente",
                "data": self.get_paginated_response(serializer.data).data
            })

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "success": True,
            "message": "Entradas obtenidas exitosamente",
            "data": serializer.data
        })

    # Respuesta personalizada al crear (POST)
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({
            "success": True,
            "message": "Entrada creada exitosamente",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)

    # Respuesta personalizada al actualizar (PUT / PATCH)
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({
            "success": True,
            "message": "Entrada actualizada exitosamente",
            "data": serializer.data
        })

    # Respuesta personalizada al eliminar (DELETE)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            "success": True,
            "message": "Entrada eliminada exitosamente",
            "data": None
        }, status=status.HTTP_200_OK)
    
class PlatoFuerteViewSet(viewsets.ModelViewSet):
    queryset = PlatoFuerte.objects.all()
    serializer_class = PlatoFuerteSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]

    # Buscador con paginación y filtro de estado (isActive)
    def list(self, request, *args, **kwargs):
        is_active = request.query_params.get('isActive', None)
        queryset = self.get_queryset()

        if is_active is not None:
            if is_active not in ['true', 'false']:
                raise ValidationError({"message": 'Valor inválido para "isActive". Usa "true" o "false".'})
            queryset = queryset.filter(disponibilidad=(is_active == 'true'))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return Response({
                "success": True,
                "message": "platosfuertes obtenidas exitosamente",
                "data": self.get_paginated_response(serializer.data).data
            })

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "success": True,
            "message": "platosfuertes obtenidas exitosamente",
            "data": serializer.data
        })

    # Mensaje personalizado al guardar (POST)
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({
            "success": True,
            "message": "platofuerte creada exitosamente",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)

    # Mensaje personalizado al editar (PUT / PATCH)
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({
            "success": True,
            "message": "platofuerte actualizada exitosamente",
            "data": serializer.data
        })

    # Mensaje personalizado al remover (DELETE)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            "success": True,
            "message": "platofuerte eliminada exitosamente",
            "data": None
        }, status=status.HTTP_200_OK)
    
class PostreViewSet(viewsets.ModelViewSet):
    queryset = Postre.objects.all()
    serializer_class = PostreSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]

    # Buscador paginado y filtrado de disponibilidad (isActive)
    def list(self, request, *args, **kwargs):
        is_active = request.query_params.get('isActive', None)
        queryset = self.get_queryset()

        if is_active is not None:
            if is_active not in ['true', 'false']:
                raise ValidationError({"message": 'Valor inválido para "isActive". Usa "true" o "false".'})
            queryset = queryset.filter(disponibilidad=(is_active == 'true'))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return Response({
                "success": True,
                "message": "postres obtenidas exitosamente",
                "data": self.get_paginated_response(serializer.data).data
            })

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "success": True,
            "message": "postres obtenidas exitosamente",
            "data": serializer.data
        })

    # Respuesta personalizada al crear (POST)
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({
            "success": True,
            "message": "postre creada exitosamente",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)

    # Respuesta personalizada al actualizar (PUT / PATCH)
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({
            "success": True,
            "message": "postre actualizada exitosamente",
            "data": serializer.data
        })

    # Respuesta personalizada al eliminar (DELETE)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            "success": True,
            "message": "postre eliminada exitosamente",
            "data": None
        }, status=status.HTTP_200_OK)
    
class VinoViewSet(viewsets.ModelViewSet):
    queryset = Vino.objects.all().order_by('id') # Cumple con el .sort({ id: 1 }) de tu servicio Nest
    serializer_class = VinoSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()] # POST, PUT, DELETE protegidos con Jwt

    # findAll unificado con el comportamiento estándar de tu API
    def list(self, request, *args, **kwargs):
        is_active = request.query_params.get('isActive', None)
        queryset = self.get_queryset()

        if is_active is not None:
            if is_active not in ['true', 'false']:
                raise ValidationError({"message": 'Valor inválido para "isActive". Usa "true" o "false".'})
            queryset = queryset.filter(disponibilidad=(is_active == 'true'))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return Response({
                "success": True,
                "message": "Vinos obtenidos exitosamente",
                "data": self.get_paginated_response(serializer.data).data
            })

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "success": True,
            "message": "Vinos obtenidos exitosamente",
            "data": serializer.data
        })

    # create (POST)
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({
            "success": True,
            "message": "Vino creado exitosamente",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)

    # update (PUT / PATCH)
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({
            "success": True,
            "message": "Vino actualizado exitosamente",
            "data": serializer.data
        })

    # destroy (DELETE)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            "success": True,
            "message": "Vino eliminado exitosamente",
            "data": {"deleted": True} # Mantiene el flag estructural que tenías en Nest
        }, status=status.HTTP_200_OK)

