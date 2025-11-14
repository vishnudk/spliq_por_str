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
@csrf_exempt
def createUser(request):
    if request.method == 'POST':
        print("Create User called")
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')
        
        # Here you would typically create the user
        if userCredentialMgr().create_user(username, password, email):
            return JsonResponse({'message': 'User created successfully', 'status':'success'}, status=201)
        else:
            return JsonResponse({'message': 'User creation failed', 'status' : 'failed'}, status=400)
    else:
        return JsonResponse({'message': 'User creation failed', 'status' : 'failed'}, status=405)