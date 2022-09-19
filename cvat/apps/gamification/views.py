# Copyright (C) 2022 Intel Corporation
#
# SPDX-License-Identifier: MIT

from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Badge, BadgeStatus, Challenge, ChallengeStatus, ChatMessage, ChatRoom, EnergizerData, ItemStatus, Question, ShopItem, Statistic, StatisticsStatus, UserProfile
from .serializers import BadgeSerializer, BadgeStatusSerializer, ChallengeSerializer, ChallengeStatusSerializer, ChatSerializer, EnergizerDataSerializer, EnergySerializer, ItemStatusSerializer, QuestionSerializer, ShopItemSerializer, StatisticSerializer, StatisticStatusSerializer, UserDataSerializer, UserProfileSerializer

# def currentUserProfile(self):
#     currentUser = self.request.user
#     return UserProfile.objects.get(user = currentUser)

class AllUserProfilesViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        currentUser = self.request.user
        return UserProfile.objects.filter(user = currentUser)

    @action(detail=False, methods=['GET','PUT'], serializer_class=EnergySerializer)
    def currentEnergy(self, request):
        currentUserProfile = UserProfile.objects.get(user = self.request.user)
        print(request.method)

        if request.method == 'GET':
            return Response(data=currentUserProfile.energy_current)

        elif request.method == 'PUT':
            print (request.data.get('currentEnergy'))
            print (request.data)
            currentUserProfile.currentEnergy = request.data.get('currentEnergy')
            currentUserProfile.save()

        #     serializer = EnergySerializer(data=request.data)
        #     if serializer.is_valid():
        #         print('currentEnergy: Serializer Valid')
        #         serializer.save()
        #         return Response(data=serializer.data, status=status.HTTP_200_OK)
        #     return Response(data=serializer.initial_data, status=status.HTTP_200_OK)

class UserDataViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserDataSerializer

    def get_queryset(self):
        currentUser = self.request.user
        return UserProfile.objects.filter(user = currentUser)

class BadgeViewSet(viewsets.ModelViewSet):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer

class BadgeStatusViewSet(viewsets.ModelViewSet):
    queryset = BadgeStatus.objects.all()
    serializer_class = BadgeStatusSerializer

class UserBadgeList(viewsets.GenericViewSet, mixins.ListModelMixin,
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = BadgeStatus.objects.all().order_by('id')
    serializer_class = BadgeStatusSerializer

    def get_queryset(self):
        currentUser = self.request.user
        currentUserProfile = UserProfile.objects.get(user = currentUser)
        queryset = BadgeStatus.objects.filter(userProfile = currentUserProfile)
        return queryset

    # @action(detail=False, methods=['GET'])
    # def test(self):
    #     pass

class ChallengeViewSet(viewsets.ModelViewSet):
    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer

    @action(detail=False, methods=['GET'])
    def pickChallenge(self, request):
        # pick 1 random challenge
        challenge = Challenge.objects.all().order_by('?').first()
        # TODO: Logic so that no challenge is picked that already exists
        print(challenge)
        ChallengeStatus.objects.create(challenge = challenge, userProfile = UserProfile.objects.get(user = self.request.user))
        serializer = ChallengeSerializer(challenge)
        return Response(serializer.data)

class ChallengeStatusViewSet(viewsets.ModelViewSet):
    queryset = ChallengeStatus.objects.all()
    serializer_class = ChallengeStatusSerializer

class UserChallengeList(viewsets.GenericViewSet, mixins.ListModelMixin,
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = ChallengeStatus.objects.all().order_by('id')
    serializer_class = ChallengeStatusSerializer

    def get_queryset(self):
        currentUser = self.request.user
        currentUserProfile = UserProfile.objects.get(user = currentUser)
        queryset = ChallengeStatus.objects.filter(userProfile = currentUserProfile)
        return queryset

class ShopItemViewSet(viewsets.ModelViewSet):
    queryset = ShopItem.objects.all()
    serializer_class = ShopItemSerializer

class ShopItemStatusViewSet(viewsets.ModelViewSet):
    queryset = ItemStatus.objects.all()
    serializer_class = ItemStatusSerializer

class UserItemList(viewsets.GenericViewSet, mixins.ListModelMixin,
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = ItemStatus.objects.all().order_by('id')
    serializer_class = ItemStatusSerializer

    def get_queryset(self):
        currentUser = self.request.user
        currentUserProfile = UserProfile.objects.get(user = currentUser)
        queryset = ItemStatus.objects.filter(userProfile = currentUserProfile)
        return queryset

class StatisticViewSet(viewsets.ModelViewSet):
    queryset = Statistic.objects.all()
    serializer_class = StatisticSerializer

class StatisticStatusViewSet(viewsets.ModelViewSet):
    queryset = StatisticsStatus.objects.all()
    serializer_class = StatisticStatusSerializer

class UserStatisticList(viewsets.GenericViewSet, mixins.ListModelMixin,
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = StatisticsStatus.objects.all().order_by('id')
    serializer_class = StatisticStatusSerializer

    def get_queryset(self):
        currentUser = self.request.user
        currentUserProfile = UserProfile.objects.get(user = currentUser)
        queryset = StatisticsStatus.objects.filter(userProfile = currentUserProfile)
        return queryset

# TODO: Chat stuff

class ChatViewSet(viewsets.ModelViewSet):
    queryset = ChatRoom.objects.all()
    serializer_class = ChatSerializer

    def get_queryset(self):
        chatRoomId = self.request.query_params.get('chatId')
        queryset = ChatMessage.objects.all()

        if chatRoomId:
            targetChatRoom = ChatRoom.objects.filter(id = chatRoomId).first()
            queryset = ChatMessage.objects.filter(room = targetChatRoom)
        return queryset

class EnergizerLeaderboardViewSet(viewsets.ModelViewSet):
    queryset = EnergizerData.objects.all()
    serializer_class = EnergizerDataSerializer

    def get_queryset(self):
        queryset = EnergizerData.objects.all()
        energizerName = self.request.query_params.get('energizer')
        if energizerName:
            queryset = queryset.filter(energizer=energizerName)
        return queryset

class QuizDuelQuestionsViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    @action(detail=False, methods=['GET'])
    def pickQuestions(self, request):
        # pick 3 random questions from all questions
        random_questions = Question.objects.all().order_by('?')[:3]
        serializer = QuestionSerializer(random_questions, many=True)
        return Response(serializer.data)