from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

# Equivalente a AppController -> getHello()
def api_home_welcome(request):
    return JsonResponse({
        "success": True,
        "message": "Restaurant - Api OnLine!"
    })

urlpatterns = [
    path('admin/', admin.site.site_path if hasattr(admin.site, 'site_path') else admin.site.urls),
    
    path('', api_home_welcome, name='api-welcome'),
    
    path('api/', include('restaurante.urls'))]