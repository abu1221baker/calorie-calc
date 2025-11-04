from django.shortcuts import render,redirect
from newapp.models import *
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail



# Create your views here.
@login_required
def home(request):
    return render(request,'index.html')

@login_required
def aboutus(request):
    return render(request,"abiutus.html")

@login_required
def calories_count(request):
    return render(request,"caloriecount.html" )

@login_required
def delete_items(request,id):
    querryset=history.objects.get(id=id)
    querryset.delete()



def sign(request):
    if request.user.is_authenticated:
        return redirect("home")
    
    print("hello")
    print(request.method)
    if request.method =="POST":
        data=request.POST
        username=data.get("username")
        password=data.get("password")
        user=authenticate(request,username=username,password=password)
        print(user)
        if user is not None:
            login(request,user)
            return redirect("home")
        else:
            messages.error(request,"Invalid Username or Password")
            return redirect("sign")
    return render(request,"signin.html")



def register(request):
    if request.user.is_authenticated:
        return redirect("home")
    
    if request.method=="POST":
        data=request.POST
        username=data.get("username")
        first_name=data.get("first_name")
        last_name=data.get("last_name")
        email=data.get("email")
        password=data.get("password")

        if User.objects.filter(username=username).exists():
            messages.error(request,"this username exits")
            return redirect("register")
        if User.objects.filter(email=email).exists():
            messages.error(request,"this username exits")
            return redirect("register")

        User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password
        )
        
        return redirect("sign")
        
    return render(request,"register.html")

@login_required
def bmi(request):
    return render(request,"bmi.html")
@login_required
def bmr(request):
    return render(request,"bmr.html")
@login_required
def tdee(request):
    return render(request,"tdee.html")
@login_required
def calculators(request):
    return render(request,"calculator.html")

def contact(request):
    return render(request,"contact.html")

def logout_page(request):
    logout(request)
    return redirect("sign")


def message(request):
    if request.method == "POST":
        data = request.POST
        name = data.get("name")
        email = data.get("email")
        subject = data.get("subject")
        message = data.get("message")
        
        querryset = Contact.objects.create(
            name = name,
            email=email,
            subject=subject,
            message=message
        )
        full_message = f"this message is from {name}\n\n from:{email}\n\n{message}"
        send_mail(
            subject,
            full_message,
            "abubakergit1221@gmail.com",  # sender
            ["abubakergit1221@gmail.com"],  
            fail_silently=False,
        )


    return redirect("contact")
