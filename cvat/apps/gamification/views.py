# Copyright (C) 2022 Intel Corporation
#
# SPDX-License-Identifier: MIT

from rest_framework import viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Badge, BadgeStatus, ChatMessage, ChatRoom, EnergizerData, Question, UserProfile
from .serializers import BadgeSerializer, BadgeStatusSerializer, ChatSerializer, EnergizerDataSerializer, EnergySerializer, QuestionSerializer, UserProfileSerializer

def currentUserProfile(self):
    currentUser = self.request.user
    return UserProfile.objects.get(user = currentUser)

class BadgeViewSet(viewsets.ModelViewSet):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer

class BadgeStatusViewSet(viewsets.ModelViewSet):
    queryset = BadgeStatus.objects.all()
    serializer_class = BadgeStatusSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        currentUser = self.request.user
        return UserProfile.objects.filter(user = currentUser)
        # queryset = UserProfile.objects.filter(userProfile = currentUserProfile)

    @action(detail=False, methods=['GET','PUT'], serializer_class=EnergySerializer)
    def currentEnergy(self, request):

        currentUserProfile = UserProfile.objects.get(user = self.request.user)
        if request.method == 'GET':
            return Response(data=currentUserProfile.currentEnergy)


        elif request.method == 'PUT':
            print (request.data.get('currentEnergy')) # FIXME:
            currentUserProfile.currentEnergy = request.data.get('currentEnergy')
            currentUserProfile.save()

            serializer = EnergySerializer(data=request.data)
            if serializer.is_valid():
                print('currentEnergy: Serializer Valid')
                serializer.save()
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            return Response(data=serializer.initial_data, status=status.HTTP_200_OK)


class UserBadgeList(viewsets.GenericViewSet, mixins.ListModelMixin,
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = BadgeStatus.objects.all().order_by('id')
    serializer_class = BadgeStatusSerializer
    # lookup_field

    def get_queryset(self):
        currentUser = self.request.user
        currentUserProfile = UserProfile.objects.get(user = currentUser)
        queryset = BadgeStatus.objects.filter(userProfile = currentUserProfile)
        return queryset

    @action(detail=False, methods=['GET'])
    def test(self):
        pass

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