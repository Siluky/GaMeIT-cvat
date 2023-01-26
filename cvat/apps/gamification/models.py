# Copyright (C) 2022 Intel Corporation
#
# SPDX-License-Identifier: MIT

from enum import Enum
import json

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Badge(models.Model):
    title = models.CharField(max_length=40, default='Cool Badge 123')
    instruction = models.CharField(max_length=80, default='Do something cool')
    goal = models.IntegerField(default=10)
    goalunit = models.CharField(max_length=20, default='images')
    visible = models.BooleanField(default=True)

    def __str__(self):
        return self.title

class ChallengeChoice(str, Enum):
    DAILY = 'Daily'
    WEEKLY = 'Weekly'
    SPECIAL = 'Special'

    @classmethod
    def choices(cls):
        return tuple((x.value, x.name) for x in cls)

    def __str__(self):
        return self.value

class Challenge(models.Model):
    instruction = models.CharField(max_length=80, default='')
    goal = models.IntegerField(default=10)
    reward = models.IntegerField(default=100)
    challengeType = models.CharField(max_length=32, choices=ChallengeChoice.choices(),
                                    default=ChallengeChoice.DAILY)

    def __str__(self):
        return self.instruction

class ShopItem(models.Model):
    itemName = models.CharField(max_length=40, default='Item X')
    price = models.IntegerField(default=100)
    repeatable = models.BooleanField(default=False)

    def __str__(self):
        return self.itemName

class Statistic(models.Model):
    name = models.CharField(max_length=40, default='')
    unit = models.CharField(max_length=40, default='')
    tooltip = models.CharField(max_length=255, default='')

    def __str__(self):
        return self.name

class OnlineStatusChoice(str, Enum):
    ONLINE = 'Online'
    DO_NOT_DISTURB = 'Do not Disturb'
    OFFLINE = 'Offline'

    @classmethod
    def choices(cls):
        return tuple((x.value, x.name) for x in cls)

    def __str__(self):
        return self.value

# Stores additional information about exactly one user
# Gets automatically updated with user
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # meta-level data
    last_login_date = models.DateTimeField(auto_now=True)
    last_login_ms = models.IntegerField(default=0)
    images_annotated_total = models.IntegerField(default=0)
    tags_set_total = models.IntegerField(default=0)
    images_annotated_night = models.IntegerField(default=0)

    annotation_time_total = models.IntegerField(default=0)
    annotation_streak_current = models.IntegerField(default=0)
    annotation_streak_max = models.IntegerField(default=0)
    annotation_streak_saver = models.BooleanField(default=False)

    # badge-related data
    badges_obtained_total = models.IntegerField(default=0)
    selectedBadges = models.CharField(max_length=255, default='0')

    # challenges-related data
    challenges_completed = models.IntegerField(default=0)

    # energizer-related data
    energy_current = models.IntegerField(default=0)
    energy_total = models.IntegerField(default=0)
    energizers_completed = models.IntegerField(default=0)
    energy_expired = models.IntegerField(default=0)
    tetris_played = models.IntegerField(default=0)
    quiz_played = models.IntegerField(default=0)
    snake_played = models.IntegerField(default=0)

    # shop-related data
    currentBalance = models.IntegerField(default=0)
    items_bought = models.CharField(max_length=255, default='')
    annotation_coins_total = models.IntegerField(default=0)
    annotation_coins_max = models.IntegerField(default=0)
    items_bought_total = models.IntegerField(default=0)
    mystery_gifts_bought = models.IntegerField(default=0)

    # social-related data
    chat_messages_total = models.IntegerField(default=0)

    # profile data
    profile_class = models.IntegerField(default=0)
    profile_background = models.IntegerField(default=0)
    profile_border = models.IntegerField(default=0)
    profile_background_elements = models.IntegerField(default=0)
    # online_status = models.CharField(max_length=32, choices=OnlineStatusChoice.choices(),
    #                 default=OnlineStatusChoice.ONLINE)
    online_status = models.IntegerField(default=0)

    avatar = models.CharField(max_length=64, default='')
    avatar_border = models.CharField(max_length=64, default='')
    # statistics-related data
    selectedStatistics = models.CharField(max_length=255, default='')

    def set_selectedStatistics(self, x):
        self.selectedStatistics = json.dumps(x)

    def get_selectedStatistics(self):
        return json.loads(self.selectedStatistics)

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

class BadgeStatus(models.Model):
    id = models.CharField(default='0-0', primary_key=True, max_length=8)
    userId = models.ForeignKey(UserProfile, on_delete=models.CASCADE, default=None)
    # badge = models.ForeignKey(Badge, on_delete=models.CASCADE, default=None)

    badgeId = models.IntegerField(default=0)
    tier = models.IntegerField(default=0)
    receivedOn = models.CharField(default='', max_length=255) # Takes a string from the JS frontend

    def __str__(self):
        return (str(self.badgeId) + ': ' + self.userId.user.get_username() + '-' + str(self.tier))

    def save(self, *args, **kwargs):
        self.id = str(self.userId.id) + '-' + str(self.badgeId)
        super(BadgeStatus, self).save(*args, **kwargs)

class ChallengeStatus(models.Model):
    id = models.CharField(default='0-0', primary_key=True, max_length=8)
    userId = models.ForeignKey(UserProfile, on_delete=models.CASCADE, default=None)
    challengeId = models.IntegerField(default=0)
    title = models.CharField(default='', max_length=255)

    goal = models.IntegerField(default=0)
    progress = models.IntegerField(default=0)

    def __str__(self):
        return (self.userId.user.get_username() + '-' + str(self.challengeId))

    def save(self, *args, **kwargs):
        self.id = str(self.userId.id) + '-' + str(self.challengeId)
        print('Saving Challenge Status')
        super().save(**kwargs)

class ChatRoom(models.Model):
    user1 = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='user1')
    user2 = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='user2')
    id = models.CharField(default='0-0', primary_key=True, max_length=8)

    def __str__(self):
        return (self.id + ': ' + self.user1.user.get_username() + '-' + self.user2.user.get_username())

    def save(self, *args, **kwargs):
        self.id = str(self.user1.id) + '-' + str(self.user2.id)
        super(ChatRoom, self).save(*args, **kwargs)

class ChatMessage(models.Model):
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE)
    senderId = models.IntegerField(default=0)
    content = models.CharField(max_length=1000)
    timestamp = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (str(self.room.id) + ': Message ' + self.id)

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
        return (str(self.id) + self.userProfile.user.get_username() + '-' + self.energizer + ': ' + str(self.score))

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

class GamifLog(models.Model):
    userId = models.IntegerField(default=0)
    date = models.DateTimeField(auto_now=True)
    event = models.CharField(default='', max_length=256)





