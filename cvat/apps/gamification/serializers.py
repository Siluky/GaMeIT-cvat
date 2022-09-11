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
        'last_login','annotation_time_total','images_annotated_total', 'tags_set_total', 'images_annotated_night',
        'annotation_time_total', 'annotation_streak_current','annotation_streak_max',
        'badges_obtained_total',
        'challenges_completed',
        'energy_current', 'energy_total','energizers_completed','energy_expired','tetris_played','quiz_played','snake_played',
        'currentBalance','annotation_coins_total','annotation_coins_max','items_bought_total',
        'chat_messages_total',
        )



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
    challenge = ChallengeSerializer()

    class Meta:
        model = models.ChallengeStatus
        fields = '__all__'

class ShopItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ShopItem
        fields = '__all__'

class ItemStatusSerializer(serializers.ModelSerializer):
    item = ShopItemSerializer()

    class Meta:
        model = models.ItemStatus
        fields = '__all__'

class StatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Statistic
        fields = '__all__'

class StatisticStatusSerializer(serializers.ModelSerializer):
    statistic = StatisticSerializer()

    class Meta:
        model = models.StatisticsStatus
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