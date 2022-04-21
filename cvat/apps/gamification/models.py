# Copyright (C) 2022 Intel Corporation
#
# SPDX-License-Identifier: MIT

from django.db import models

class Challenge(models.Model):
    instruction = models.CharField(max_length=80)
    progress: models.IntegerField()
    goal: models.IntegerField()
    reward: models.IntegerField()
    challengeType: models.CharField(max_length=80)

    def __str__(self):
        return self.name
