from django.urls import path
from newapp.views import *
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('',home,name="home"),
    path('aboutus/',aboutus,name="aboutus"),
    path("coloriecount/",calories_count,name="coloriecount"),
    path("sign/",sign,name="sign"),
    path("delete/<id>",delete_items),
    path("register/",register,name="register"),
    path("calculators/",calculators,name="calculators"),
    path("bmi/",bmi,name="bmi"),
    path("bmr/",bmr,name="bmr"),
    path("tdee/",tdee,name="tdee"),
    path("contact/",contact,name="contact"),
    path("logout_page/",logout_page,name="logout"),
    path("reset_password/",auth_views.PasswordResetView.as_view(template_name="reset/password_reset.html"),name="password_reset_view"),
    path("reset_password_done/",auth_views.PasswordResetDoneView.as_view(template_name="reset/password_reset_done.html"),name="password_reset_done"),
    path("reset/<uidb64>/<token>/",auth_views.PasswordResetConfirmView.as_view(template_name="password_reset_confirm.html"),name="password_reset_confirm"),
    path("reset_password_complete/",auth_views.PasswordResetCompleteView.as_view(template_name="password_reset_complete.html"),name="password_reset_complete"),
    path("messages/",message,name="message")

]
