from django.db import models

# Create your models here.


class history(models.Model):
    food = models.CharField( max_length=100)
    gram = models.IntegerField()

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    subject = models.CharField(max_length=200)
    message = models.CharField(max_length=2000)
    
    