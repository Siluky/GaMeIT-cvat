# Copyright (C) 2022 Intel Corporation
#
# SPDX-License-Identifier: MIT

from datetime import date, timedelta
import datetime
from rest_framework import viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.http import Http404
from .models import Badge, BadgeStatus, Challenge, ChallengeStatus, ChatMessage, ChatRoom, EnergizerData, GamifLog, ImageStatus, Question, ShopItem, Statistic, UserProfile
from .serializers import BadgeSerializer, BadgeStatusSerializer, ChallengeSerializer, ChallengeStatusSerializer, ChatSerializer, EnergizerDataSerializer, EnergySerializer, GamifLogSerializer, ImageStatusSerializer, ProfileDataSerializer, QuestionSerializer, SaveImageStatusSerializer, SaveChallengesSerializer, ShopItemSerializer, StatisticSerializer, UserDataSerializer, UserProfileSerializer

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

    def get_queryset(self):
        # currentUser = self.request.user
        return UserProfile.objects.all()
        # return UserProfile.objects.all().exclude(user = currentUser)

class BadgeViewSet(viewsets.ModelViewSet):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer

class BadgeStatusViewSet(viewsets.ModelViewSet):
    queryset = BadgeStatus.objects.all()
    serializer_class = BadgeStatusSerializer

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

class UserBadgeList(viewsets.GenericViewSet, mixins.ListModelMixin,
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = BadgeStatus.objects.all().order_by('id')
    serializer_class = BadgeStatusSerializer

    def get_queryset(self):
        userId = self.request.query_params.get('id')
        if userId:
            pass
        currentUser = self.request.user
        currentUserProfile = UserProfile.objects.get(user = currentUser)
        queryset = BadgeStatus.objects.filter(userId = currentUserProfile)
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
        if serializer.is_valid(raise_exception=True):
            # print('SaveChallengeSerializer is valid')
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

# Chat stuff

class ChatViewSet(viewsets.ModelViewSet):
    queryset = ChatRoom.objects.all()
    serializer_class = ChatSerializer

    def get_queryset(self):
        chatRoomId = self.request.query_params.get('chatId')
        queryset = ChatMessage.objects.all()

        if chatRoomId:
            targetChatRoom = ChatRoom.objects.filter(id = chatRoomId).first()
            print(targetChatRoom)
            if (not targetChatRoom):
                print('creating Chat Room')
                userids = chatRoomId.split('-')
                _user1= UserProfile.objects.get(id=userids[0])
                _user2= UserProfile.objects.get(id=userids[1])
                print(_user1)
                print(_user2)
                ChatRoom.objects.create(user1=_user1, user2=_user2, id=chatRoomId)
            queryset = ChatMessage.objects.filter(room = targetChatRoom)
        return queryset.order_by('-timestamp')

    # def create(self, request, *args, **kwargs):
    #     try:
    #         instance = self.get_object()
    #         serializer = self.get_serializer(instance, data=request.data)
    #         serializer.is_valid(raise_exception=True)
    #         self.perform_create(serializer)
    #         headers = self.get_success_headers(serializer.data)
    #         return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)

    #     except Http404:
    #         ids = request.data.room.split('-')
    #         ChatRoom.objects.create(user1=ids[0], user2=id[1])
    #         serializer = self.get_serializer(instance, data=request.data)
    #         serializer.is_valid(raise_exception=True)
    #         self.perform_create(serializer)
    #         headers = self.get_success_headers(serializer.data)
    #         return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)

class EnergizerLeaderboardViewSet(viewsets.ModelViewSet):
    queryset = EnergizerData.objects.all()
    serializer_class = EnergizerDataSerializer

    def get_queryset(self):
        queryset = EnergizerData.objects.all()
        energizerName = self.request.query_params.get('energizer')
        if energizerName:
            queryset = queryset.filter(energizer=energizerName)

        timeframe = self.request.query_params.get('time')
        print(timeframe)

        if timeframe:
            today = date.today()
            if (timeframe == 'Daily'):
                start = today - timedelta(days=1)
            elif (timeframe == 'Weekly'):
                start = today - timedelta(days=6)
            print(start)
            queryset = queryset.filter(timestamp__date__range=[start, today])

        # return queryset.order_by('-score').distinct('userProfile', 'score')[:10]
        return queryset.order_by('-score')[:10]

class QuizDuelQuestionsViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    @action(detail=False, methods=['GET'])
    def pickQuestions(self, request):
        # pick 3 random questions from all questions
        random_questions = Question.objects.all().order_by('?')[:5]
        serializer = QuestionSerializer(random_questions, many=True)
        return Response(serializer.data)


class GamifLogsViewSet(viewsets.ModelViewSet):
    queryset = GamifLog.objects.all()
    serializer_class = GamifLogSerializer

class ImageStatusViewSet(viewsets.ModelViewSet):
    queryset = ImageStatus.objects.all()
    serializer_class = ImageStatusSerializer

    def get_queryset(self):
        queryset = ImageStatus.objects.all()
        currentUser = self.request.user
        currentUserProfile = UserProfile.objects.get(user = currentUser)
        queryset = ImageStatus.objects.filter(userId = currentUserProfile.id)

        relevantJobId = self.request.query_params.get('jobId')
        if relevantJobId:
            queryset = queryset.filter(jobId = relevantJobId)

        return queryset

    @action(detail=False, methods=['GET','PUT'], serializer_class=SaveImageStatusSerializer)
    def save(self, request):
        serializer = SaveImageStatusSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            print('SaveImageStatusSerializer is valid')
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