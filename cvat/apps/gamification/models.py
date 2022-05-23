# Copyright (C) 2022 Intel Corporation
#
# SPDX-License-Identifier: MIT

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver #TODO: Double check import
from django.utils.timezone import now

class Badge(models.Model):
    title = models.CharField(max_length=40, default='Cool Badge 123')
    instruction = models.CharField(max_length=80, default='Do something cool')
    goal = models.IntegerField(default=10)
    #TODO: Make an enum for goalunit + migrate
    goalunit = models.CharField(max_length=20, default='images')
    visible = models.BooleanField(default=True)

    def __str__(self):
        return self.title

class Challenge(models.Model):
    instruction = models.CharField(max_length=80)
    progress = models.IntegerField()
    goal = models.IntegerField()
    reward = models.IntegerField()
    challengeType = models.CharField(max_length=80)

    def __str__(self):
        return self.instruction

class EnergizerData(models.Model):
    currentEnergy = models.IntegerField()
    energizersDone = models.IntegerField()
    #TODO: Data for individual energizers

# Stores additional information about exactly one user
# Gets automatically updated with user
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    badges = models.ManyToManyField(Badge, through='BadgeStatus')
    last_login = models.DateField(default=now)
    energizer_data = models.OneToOneField(EnergizerData, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.user.get_username()

# Automatically creates a user profile for a newly created user
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


"""
@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
"""
# Models a user's individual progress on specific badge
# Intermediate model with additional info on the m:n relationship between User and Badge
class BadgeStatus(models.Model):
    userProfile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, default=None)
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE, default=None)

    progress = models.IntegerField(default=0)
    got = models.BooleanField(default=False)
    receivedOn = models.DateTimeField(default=now)

    def __str__(self) -> str:
        return (self.userProfile,': ', self.badge)




