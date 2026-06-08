import logging
from datetime import datetime
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

# Configuramos un logger para imprimir el console.error en la terminal
logger = logging.getLogger(__name__)

def custom_exception_handler(exc, context):
    """
    Equivalente a GlobalHttpExceptionFilter / AllExceptionsFilter en NestJS.
    Intercepta errores de validación, autenticación, 404, etc., y los unifica.
    """
    # Ejecuta el manejador por defecto de DRF primero para obtener el error estándar
    response = exception_handler(exc, context)
    request = context.get('request')
    path = request.path if request else None

    # Log completo del error en la consola del servidor (Equivalente al console.error de Nest)
    logger.error(f"Exception thrown at path '{path}': {exc}", exc_info=True)

    # Si DRF reconoce la excepción (Ej: ValidationError, AuthenticationFailed, NotFound)
    if response is not None:
        # Extraemos los detalles del mensaje de error
        message_data = response.data
        
        # Simplificamos el formato del mensaje si viene como lista o diccionario de validación
        if isinstance(message_data, dict) and 'detail' in message_data:
            message = message_data['detail']
        elif isinstance(message_data, dict) and 'message' in message_data:
            message = message_data['message']
        else:
            message = message_data # Contiene el diccionario de validación de campos específicos

        return Response({
            "success": False,
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "path": path,
            "statusCode": response.status_code,
            "message": message
        }, status=response.status_code)

    # Si es un error no controlado (Ej: error de código Python, Base de datos caída -> Status 500)
    return Response({
        "success": False,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "path": path,
        "statusCode": status.HTTP_500_INTERNAL_SERVER_ERROR,
        "message": "Internal server error"
    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)