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
router.register('userProfiles', views.AllUserProfilesViewSet)
router.register('userProfile', views.UserProfileViewSet)
router.register('user-data', views.UserDataViewSet)

router.register('badges', views.BadgeViewSet)
router.register('badge-status', views.BadgeStatusViewSet)
router.register('user-badges', views.UserBadgeList)

router.register('challenges', views.ChallengeViewSet)
router.register('challenge-status', views.ChallengeStatusViewSet)
router.register('user-challenges', views.UserChallengeList)

router.register('items', views.ShopItemViewSet)
router.register('item-status', views.ShopItemStatusViewSet)
router.register('user-items', views.UserItemList)

router.register('statistics', views.StatisticViewSet)
router.register('statistic-status', views.StatisticStatusViewSet)
router.register('user-statistics', views.UserStatisticList)

router.register('energizer-data', views.EnergizerLeaderboardViewSet)
router.register('questions', views.QuizDuelQuestionsViewSet)

router.register('friends', views.FriendslistViewSet)
router.register('chat', views.ChatViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
