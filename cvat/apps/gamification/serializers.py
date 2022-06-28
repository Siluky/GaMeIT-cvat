# Copyright (C) 2022 Intel Corporation
#
# SPDX-License-Identifier: MIT

from rest_framework import serializers
from cvat.apps.gamification import models

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

# User profile Model
class UserProfileSerializer(serializers.ModelSerializer):
    badges = BadgeStatusSerializer()

    class Meta:
        model = models.UserProfile
        fields = ('user','badges','last_login')