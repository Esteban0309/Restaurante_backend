from django.db import models

class Bebida(models.Model):
    nombre = models.CharField(max_length=150)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    tipo = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    disponibilidad = models.BooleanField(default=True)
    # Django maneja la subida de archivos de forma nativa aquí (adiós Multer/diskStorage)
    profile = models.ImageField(upload_to='public/profile/', blank=True, null=True)

    def __str__(self):
        return self.nombre

class Desayuno(models.Model):
    nombre = models.CharField(max_length=150)
    # En NestJS tenías nullable: true para el precio en desayuno
    precio = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    tipo = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    porciones = models.CharField(max_length=100, blank=True, null=True)
    disponibilidad = models.BooleanField(default=True)
    profile = models.ImageField(upload_to='public/profile/', blank=True, null=True)

    # Forzar a Django a usar el nombre de tabla exacto que tenías
    class Meta:
        db_table = 'desayunos'

    def __str__(self):
        return self.nombre

class Entrada(models.Model):
    nombre = models.CharField(max_length=150)
    precio = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    tipo = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    porciones = models.CharField(max_length=100, blank=True, null=True)
    disponibilidad = models.BooleanField(default=True)
    profile = models.ImageField(upload_to='public/profile/', blank=True, null=True)

    class Meta:
        db_table = 'entradas' # Respeta el nombre de tabla que usabas en TypeORM

    def __str__(self):
        return self.nombre

class PlatoFuerte(models.Model):
    nombre = models.CharField(max_length=150)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    tipo = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    porciones = models.CharField(max_length=100, blank=True, null=True)
    disponibilidad = models.BooleanField(default=True)
    profile = models.ImageField(upload_to='public/profile/', blank=True, null=True)

    class Meta:
        db_table = 'platosfuertes' # Nombre de la tabla idéntico al de TypeORM

    def __str__(self):
        return self.nombre

class Postre(models.Model):
    nombre = models.CharField(max_length=150)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    tipo = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    porciones = models.CharField(max_length=100, blank=True, null=True)
    disponibilidad = models.BooleanField(default=True)
    profile = models.ImageField(upload_to='public/profile/', blank=True, null=True)

    class Meta:
        db_table = 'postres' # Mapea exactamente al nombre de tabla en TypeORM

    def __str__(self):
        return self.nombre

class Vino(models.Model):
    nombre = models.CharField(max_length=150)
    # Reemplaza los campos opcionales de Mongoose por campos Nullables en SQL
    precioCopa = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    precioBotella = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    tipo = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    porciones = models.CharField(max_length=100, blank=True, null=True)
    disponibilidad = models.BooleanField(default=True)
    profile = models.ImageField(upload_to='public/profile/', blank=True, null=True)

    class Meta:
        db_table = 'vinos'

    def __str__(self):
        return self.nombre
    
