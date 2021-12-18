from django.db import models

# Create your models here.


from django.contrib.postgres.fields import ArrayField



class Skill(models.Model):
    name = models.CharField(max_length=50)
    skills = ArrayField(models.CharField(max_length=200), blank=True)

# Skill.objects.create(name='First name', skills=['thoughts', 'django'])
# Skill.objects.filter(skills__contains=['thoughts'])