# Copyright (C) 2022 Intel Corporation
#
# SPDX-License-Identifier: MIT

from rest_framework import serializers
from cvat.apps.gamification import models

# User profile Model
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserProfile
        fields = ('user','last_login','currentEnergy')

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Badge
        fields = ('id','title','instruction','goal','goalunit','visible')

class BadgeStatusSerializer(serializers.ModelSerializer):
    badge = BadgeSerializer()

    class Meta:
        model = models.BadgeStatus
        fields = ('userProfile','badge','progress','got','receivedOn')

    def create(self, validated_data):
        return super().create(validated_data)


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Question
        fields= ('__all__')

    def create(self, validated_data):
        return super().create(validated_data)

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