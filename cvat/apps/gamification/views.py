# Copyright (C) 2022 Intel Corporation
#
# SPDX-License-Identifier: MIT

from rest_framework import viewsets, mixins
from .models import Badge, BadgeStatus, UserProfile
from .serializers import BadgeSerializer, BadgeStatusSerializer, UserProfileSerializer

class BadgeViewSet(viewsets.ModelViewSet):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer

class BadgeStatusViewSet(viewsets.ModelViewSet):
    queryset = BadgeStatus.objects.all()
    serializer_class = BadgeStatusSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class UserBadgeList(viewsets.GenericViewSet, mixins.ListModelMixin,
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = BadgeStatus.objects.all()
    serializer_class = BadgeStatusSerializer

    def get_queryset(self):
        currentUser = self.request.user
        currentUserProfile = UserProfile.objects.get(user = currentUser)
        queryset = BadgeStatus.objects.filter(userProfile = currentUserProfile)
        #TODO: Format results as appropriate
        # https://books.agiliq.com/projects/django-orm-cookbook/en/latest/select_some_fields.html
        # https://docs.djangoproject.com/en/4.0/ref/models/querysets/
        return queryset


