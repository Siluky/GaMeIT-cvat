# Copyright (C) 2022 Intel Corporation
#
# SPDX-License-Identifier: MIT

from rest_framework import serializers
from cvat.apps.gamification import models

# User profile Model
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserProfile
        fields = '__all__'

class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserProfile
        fields = (
        'id', 'user',
        'last_login','annotation_time_total','images_annotated_total', 'tags_set_total', 'images_annotated_night',
        'annotation_time_total', 'annotation_streak_current','annotation_streak_max',
        'badges_obtained_total', 'selectedBadges',
        'challenges_completed',
        'energy_current', 'energy_total','energizers_completed','energy_expired','tetris_played','quiz_played','snake_played',
        'currentBalance','items_bought','annotation_coins_total','annotation_coins_max','items_bought_total','mystery_gifts_bought',
        'chat_messages_total',
        'selectedStatistics',
        )

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['user'] = instance.user.get_username()
        return rep

class ProfileDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserProfile
        fields = ('id', 'user','online_status', 'profile_style', 'selectedBadges',
        'avatar','avatar_border','profile_border','profile_background',)

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['user'] = instance.user.get_username()
        return rep

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Badge
        fields = '__all__'

class BadgeStatusSerializer(serializers.ModelSerializer):
    badge = BadgeSerializer()

    class Meta:
        model = models.BadgeStatus
        fields = '__all__'

    def create(self, validated_data):
        return super().create(validated_data)

class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Challenge
        fields = '__all__'

class ChallengeStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ChallengeStatus
        fields = '__all__'


class SaveChallengesSerializer(serializers.ModelSerializer):
    # userId = serializers.PrimaryKeyRelatedField(queryset = models.UserProfile.objects.all())
    userId = serializers.SlugRelatedField(
        slug_field='id',
        queryset = models.UserProfile.objects.all(),
    )

    class Meta:
        model = models.ChallengeStatus
        # fields = '__all__'
        fields = ('challengeId','goal','progress','title','userId',)

class ShopItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ShopItem
        fields = '__all__'

class StatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Statistic
        fields = '__all__'

class EnergySerializer(serializers.Serializer):
    currentEnergy = serializers.IntegerField()

class EnergizerDataSerializer(serializers.ModelSerializer):
    userProfile = serializers.PrimaryKeyRelatedField(many=False, read_only=False, queryset=models.UserProfile.objects.all())

    class Meta:
        model = models.EnergizerData
        fields = ('userProfile','energizer','score', 'timestamp')

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['userProfile'] = instance.userProfile.user.get_username()
        return rep

class ChatSerializer(serializers.ModelSerializer):
    room = serializers.PrimaryKeyRelatedField(many=False, read_only=False, queryset=models.ChatRoom.objects.all())

    class Meta:
        model = models.ChatMessage
        fields = ('room','content', 'timestamp')

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Question
        fields= '__all__'

    def create(self, validated_data):
        return super().create(validated_data)