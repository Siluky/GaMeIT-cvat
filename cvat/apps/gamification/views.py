# Copyright (C) 2022 Intel Corporation
#
# SPDX-License-Identifier: MIT

from rest_framework import viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.http import Http404
from .models import Badge, BadgeStatus, Challenge, ChallengeStatus, ChatMessage, ChatRoom, EnergizerData, Question, ShopItem, Statistic, UserProfile
from .serializers import BadgeSerializer, BadgeStatusSerializer, ChallengeSerializer, ChallengeStatusSerializer, ChatSerializer, EnergizerDataSerializer, EnergySerializer,ProfileDataSerializer, QuestionSerializer, SaveChallengesSerializer, ShopItemSerializer, StatisticSerializer, UserDataSerializer, UserProfileSerializer

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

class UserDataViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserDataSerializer

    def get_queryset(self):
        currentUser = self.request.user
        return UserProfile.objects.filter(user = currentUser)

class FriendslistViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = ProfileDataSerializer

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

    @action(detail=False, methods=['GET','PUT'], serializer_class=SaveChallengesSerializer)
    def save(self, request):
        serializer = SaveChallengesSerializer(data=request.data)
        print('Trying to save challenge')
        print(serializer)
        print(request.data)
        if serializer.is_valid(raise_exception=True):
            print('SaveChallengeSerializer is valid')
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)
        except Http404:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True) # will throw ValidationError
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except ValidationError:  # typically serializer is not valid
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserChallengeList(viewsets.GenericViewSet, mixins.ListModelMixin,
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = ChallengeStatus.objects.all().order_by('id')
    serializer_class = ChallengeStatusSerializer

    def get_queryset(self):
        currentUser = self.request.user
        currentUserProfile = UserProfile.objects.get(user = currentUser)
        queryset = ChallengeStatus.objects.filter(userId = currentUserProfile)
        return queryset

class ShopItemViewSet(viewsets.ModelViewSet):
    queryset = ShopItem.objects.all()
    serializer_class = ShopItemSerializer


class StatisticViewSet(viewsets.ModelViewSet):
    queryset = Statistic.objects.all()
    serializer_class = StatisticSerializer

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

        # TODO: Filter by date as appropriate
        # time = self.request.query_params.get('time')
        # if timeframe:
        #     queryset.filter(timestamp=###)
        return queryset

class QuizDuelQuestionsViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    @action(detail=False, methods=['GET'])
    def pickQuestions(self, request):
        # pick 3 random questions from all questions
        random_questions = Question.objects.all().order_by('?')[:5]
        serializer = QuestionSerializer(random_questions, many=True)
        return Response(serializer.data)