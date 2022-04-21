# Copyright (C) 2022 Intel Corporation
#
# SPDX-License-Identifier: MIT

from rest_framework import viewsets
from .models import Challenge
from .serializers import ChallengeSerializer

class ChallengeViewSet(viewsets.ModelViewSet):
    queryset = Challenge.objects.order_by('instruction')
    serializer_class = ChallengeSerializer