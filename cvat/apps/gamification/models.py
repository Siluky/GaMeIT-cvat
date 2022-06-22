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



class ShopItem(models.Model):
    itemName = models.CharField(max_length=40)
    price = models.IntegerField()
    iconpath = models.CharField(max_length=40) #TODO: not sure about this one yet

class Statistic(models.Model):
    name = models.CharField(max_length=40)
    value = models.CharField(max_length=40)
    hoverOverText = models.CharField(max_length=40)
    iconpath = models.CharField(max_length=40) #TODO: s.o



# Stores additional information about exactly one user
# Gets automatically updated with user
class UserProfile(models.Model):
    # general data
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    last_login = models.DateField(default=now)

    # badge-related data
    badges = models.ManyToManyField(Badge, through='BadgeStatus')
    # TODO: Selected badges

    # challenge-related data
    challenges = models.ManyToManyField(Challenge, through='ChallengeStatus')

    # energizer-related data
    energizer_data = models.OneToOneField(EnergizerData, on_delete=models.CASCADE)

    # shop-related data
    items = models.ManyToManyField(ShopItem, through='ItemStatus')
    current_balance = models.IntegerField(default=0)

    # social-related data
    # TODO: not sure how to model this yet

    # statistics-related data
    statistics = models.ManyToManyField(Statistic, through='StatisticsStatus')


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


# The following status models are intermediate models with additional information
# on the m:n relationship between a User(UserProfile) and other Models
# including Badges, Challenges, ShopItems, Energizers

# Models a user's individual progress on specific badges
class BadgeStatus(models.Model):
    userProfile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, default=None)
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE, default=None)

    progress = models.IntegerField(default=0)
    got = models.BooleanField(default=False)
    receivedOn = models.DateTimeField(default=now)

    def __str__(self) -> str:
        return (self.userProfile,': ', self.badge)

# Model's a user's individual status of the shop (i.e., items bought, current balance, ...)
# TODO: Not sure about this one yet
class ChallengeStatus(models.Model):
    userProfile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, default=None)
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE, default=None)


# Model's a user's individual status of the shop (i.e., items bought, current balance, ...)
class ItemStatus(models.Model):
    userProfile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, default=None)
    item = models.ForeignKey(ShopItem, on_delete=models.CASCADE, default=None)

# Model's a user's individual status of individual statistics
class StatisticsStatus(models.Model):
    userProfile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, default=None)
    statistic = models.ForeignKey(Statistic, on_delete=models.CASCADE, default=None)

