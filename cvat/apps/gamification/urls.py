# Copyright (C) 2022 Intel Corporation
#
# SPDX-License-Identifier: MIT


# Copyright (C) 2018-2021 Intel Corporation
#
# SPDX-License-Identifier: MIT

from django.urls import path, include
from . import views
from rest_framework import routers


router = routers.DefaultRouter(trailing_slash=False)
router.register('badges', views.BadgeViewSet)
router.register('badge-status', views.BadgeStatusViewSet)
router.register('user-profile', views.UserProfileViewSet)
router.register('user-badges', views.UserBadgeList)

urlpatterns = [
    path('api/', include(router.urls)),
]
