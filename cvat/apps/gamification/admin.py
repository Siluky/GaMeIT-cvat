# Copyright (C) 2022 Intel Corporation
#
# SPDX-License-Identifier: MIT

from django.contrib import admin
from .models import Badge, BadgeStatus, Challenge, ChallengeStatus, ChatMessage, ChatRoom, EnergizerData, GamifLog, ImageStatus, Question, ShopItem, Statistic,  UserProfile

admin.site.register(UserProfile)

admin.site.register(Badge)
admin.site.register(BadgeStatus)

admin.site.register(Challenge)
admin.site.register(ChallengeStatus)

admin.site.register(ShopItem)

admin.site.register(Statistic)

admin.site.register(ChatRoom)
admin.site.register(ChatMessage)
admin.site.register(EnergizerData)
admin.site.register(Question)
admin.site.register(GamifLog)
admin.site.register(ImageStatus)

