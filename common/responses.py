from rest_framework.response import Response
from rest_framework import status

class SuccessResponse(Response):
    """
    Equivalente a SuccessResponseDto de NestJS.
    Preformatea una respuesta JSON exitosa con la estructura unificada.
    """
    def __init__(self, message, data=None, status_code=status.HTTP_200_OK, **kwargs):
        response_data = {
            "success": True,
            "message": message,
            "data": data
        }
        super().__init__(data=response_data, status=status_code, **kwargs)


class ErrorResponse(Response):
    """
    Equivalente a ErrorResponseDto de NestJS.
    Preformatea una respuesta JSON de error con la estructura unificada.
    """
    def __init__(self, message, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, error=None, **kwargs):
        response_data = {
            "success": False,
            "message": message,
            "statusCode": status_code
        }
        if error is not None:
            response_data["error"] = error
            
        super().__init__(data=response_data, status=status_code, **kwargs)