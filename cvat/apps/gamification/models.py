# Copyright (C) 2022 Intel Corporation
#
# SPDX-License-Identifier: MIT

from enum import Enum

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.timezone import now


class ChallengeChoice(str, Enum):
    DAILY = 'Daily'
    WEEKLY = 'Weekly'
    SPECIAL = 'Special'

    @classmethod
    def choices(cls):
        return tuple((x.value, x.name) for x in cls)

    def __str__(self):
        return self.value

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
    instruction = models.CharField(max_length=80, default='')
    progress = models.IntegerField(default=0)
    goal = models.IntegerField(default=10)
    reward = models.IntegerField(default=100)
    challengeType = models.CharField(max_length=32, choices=ChallengeChoice.choices(),
                                    default=ChallengeChoice.DAILY)

    def __str__(self):
        return self.instruction

class ShopItem(models.Model):
    itemName = models.CharField(max_length=40, default='Item')
    price = models.IntegerField(default=100)
    iconpath = models.CharField(max_length=40, default='') #TODO: not sure about this one yet

class Statistic(models.Model):
    name = models.CharField(max_length=40, default='')
    value = models.CharField(max_length=40, default='')
    hoverOverText = models.CharField(max_length=40, default='')
    iconpath = models.CharField(max_length=40, default='') #TODO: s.o



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
    currentEnergy = models.IntegerField(default=0)
    energizersDone = models.IntegerField(default=0)

    # shop-related data
    items = models.ManyToManyField(ShopItem, through='ItemStatus')
    current_balance = models.IntegerField(default=0)

    # social-related data
    # not sure how to model this yet

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
# including Badges, Challenges, ShopItems

# Models a user's individual progress on specific badges
class BadgeStatus(models.Model):
    userProfile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, default=None)
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE, default=None)

    id = models.CharField(default='0-0', primary_key=True, max_length=8)

    progress = models.IntegerField(default=0)
    got = models.BooleanField(default=False)
    receivedOn = models.DateTimeField(default=now)

    def __str__(self):
        return (self.id + ': ' + self.userProfile.user.get_username() + '-' + self.badge.title)

    def save(self, *args, **kwargs):
        self.id = str(self.userProfile.id) + '-' + str(self.badge.id)
        super(BadgeStatus, self).save(*args, **kwargs)

# Model's a user's individual status of the shop (i.e., items bought, current balance, ...)
# TODO: Not sure about this one yet
# TODO: idea: save 3 numbers for each user profile, which correspond to challenge IDs
class ChallengeStatus(models.Model):
    userProfile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, default=None)
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE, default=None)


# Model's a user's individual status of the shop (i.e., items bought, current balance, ...)
class ItemStatus(models.Model):
    userProfile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, default=None)
    item = models.ForeignKey(ShopItem, on_delete=models.CASCADE, default=None)


class EnergizerChoice(str, Enum):
    TETRIS = 'TETRIS',
    SNAKE = 'SNAKE',
    QUIZ = 'QUIZ',
    NONE = 'NONE',

    @classmethod
    def choices(cls):
        return tuple((x.value, x.name) for x in cls)

    def __str__(self):
        return self.value

class EnergizerData(models.Model):
    userProfile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, default=None)
    energizer = models.CharField(max_length=32, choices=EnergizerChoice.choices(),
                                    default=EnergizerChoice.NONE)
    score = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (self.userProfile.user.get_username() + '-' + self.energizer + ': ' + str(self.score))


class Question(models.Model):
    class correctAnswer(models.IntegerChoices):
        A = 1
        B = 2
        C = 3
        D = 4

    question = models.CharField(max_length=80, default='')
    answerA = models.CharField(max_length=32, default='A: ')
    answerB = models.CharField(max_length=32, default='B: ')
    answerC = models.CharField(max_length=32, default='C: ')
    answerD = models.CharField(max_length=32, default='D: ')
    correctAnswer = models.IntegerField(choices=correctAnswer.choices, default=1)

    def __str__(self):
        return self.question


# Model's a user's individual status of individual statistics
class StatisticsStatus(models.Model):
    userProfile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, default=None)
    statistic = models.ForeignKey(Statistic, on_delete=models.CASCADE, default=None)

