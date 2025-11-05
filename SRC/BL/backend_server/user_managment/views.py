from django.shortcuts import render
from django.http import HttpResponse
from .userCredentialMgr import userCredentialMgr
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

# Create your views here.
@csrf_exempt
def authenticateUser(request):
    if request.method == 'POST':
        print("Authenticate User called")
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        # Here you would typically validate the credentials
        if userCredentialMgr().validate_credentials(username, password):
            return JsonResponse({'message': 'Login success', 'status':'success'}, status=200)
        else:
            return JsonResponse({'message': 'Login Failed', 'status' : 'failed'}, status=401)
    else:
        returnJsonResponse({'message': 'Login Failed', 'status' : 'failed'}, status=405)