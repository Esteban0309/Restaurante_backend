from rest_framework import serializers
from .models import Bebida, Desayuno, Entrada, PlatoFuerte, Postre, Vino

class BebidaSerializer(serializers.ModelSerializer):
    porciones = serializers.CharField(required=False, allow_blank=True, read_only=True)

    class Meta:
        model = Bebida
        fields = ['id', 'nombre', 'precio', 'tipo', 'descripcion', 'disponibilidad', 'profile', 'porciones']

class DesayunoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Desayuno
        fields = ['id', 'nombre', 'precio', 'tipo', 'descripcion', 'porciones', 'disponibilidad', 'profile']

class EntradaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entrada
        fields = ['id', 'nombre', 'precio', 'tipo', 'descripcion', 'porciones', 'disponibilidad', 'profile']

class PlatoFuerteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlatoFuerte
        fields = ['id', 'nombre', 'precio', 'tipo', 'descripcion', 'porciones', 'disponibilidad', 'profile']

class PostreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Postre
        fields = ['id', 'nombre', 'precio', 'tipo', 'descripcion', 'porciones', 'disponibilidad', 'profile']

class VinoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vino
        fields = ['id', 'nombre', 'precioCopa', 'precioBotella', 'tipo', 'descripcion', 'porciones', 'disponibilidad', 'profile']
    
