# Copyright (C) 2022 Intel Corporation
#
# SPDX-License-Identifier: MIT

from django.contrib import admin
from .models import Badge, BadgeStatus, ChatMessage, ChatRoom, EnergizerData, Question, UserProfile

admin.site.register(Badge)
admin.site.register(BadgeStatus)
admin.site.register(UserProfile)
admin.site.register(EnergizerData)
admin.site.register(Question)
admin.site.register(ChatRoom)
admin.site.register(ChatMessage)

