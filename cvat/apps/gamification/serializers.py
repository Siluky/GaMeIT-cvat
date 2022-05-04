# Copyright (C) 2022 Intel Corporation
#
# SPDX-License-Identifier: MIT

from rest_framework import serializers
from cvat.apps.gamification import models

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Badge
        fields = ('title','instruction','goal','visible')

#TODO: BadgeStatus next
class BadgeStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BadgeStatus
        fields = ('user','badge','progress','got','receivedOn')

    def create(self, validated_data):
        return super().create(validated_data) #TODO:



# TODO: Combine all Serializers into one
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserProfile
        fields = ('user','badges','last_login')

    # user = ??? #TODO:

    try:
        # Get all badges that belong to one user
        # --> essentially turn the user:badge relationship from m:n to 1:n
        badges = models.BadgeStatus.objects.get(user='user')
    except models.Badge.DoesNotExist:
        raise serializers.ValidationError('The specified badges do not exist')

    badges = BadgeSerializer
