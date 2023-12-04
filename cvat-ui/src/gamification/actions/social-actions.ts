// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { ActionCreator, AnyAction, Dispatch } from 'redux';
import getCore from 'cvat-core-wrapper';
import { ThunkAction } from 'redux-thunk';
import {
    BadgeStatus, ChatRoom, Message, OnlineStatus, Profile,
} from 'gamification/gamif-interfaces';
import { getCVATStore } from 'cvat-store';
import { decodeBadgeTier, decodeStatus, encodeStatus } from 'gamification/gamif-items';

const cvat = getCore();

export enum SocialActionTypes {
    GET_FRIENDS_LIST_SUCCESS = 'GET_FRIENDS_LIST_SUCCESS',
    GET_FRIENDS_LIST_FAILED = 'GET_FRIENDS_LIST_FAILED',

    TOGGLE_CHAT_WINDOW = 'TOGGLE_CHAT_WINDOW',

    SET_STATUS = 'SET_STATUS',
    SET_ADDITIONAL_CLASSNAMES = 'SET_ADDITIONAL_CLASSNAMES',
    SET_PROFILE_BACKGROUND = 'SET_PROFILE_BACKGROUND',
    SET_COLOR = 'SET_COLOR',
    SET_PROFILE_BORDER = 'SET_PROFILE_BORDER',
    SET_BACKGROUND_ELEMENTS = 'SET_BACKGROUND_ELEMENTS',
    SET_AVATAR = 'SET_AVATAR',
    SET_AVATAR_BORDER = 'SET_AVATAR_BORDER',

    SAVE_PROFILE_DATA_SUCCESS = 'SAVE_PROFILE_DATA_SUCCESS',
    SAVE_PROFILE_DATA_FAILED = 'SAVE_PROFILE_DATA_FAILED',

    SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS',
    SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED',

    GET_CHAT_HISTORY_SUCCESS = 'GET_CHAT_HISTORY_SUCCESS', // TODO:
    GET_CHAT_HISTORY_FAILED = 'GET_CHAT_HISTORY_FAILED', // TODO:

    SET_HAS_UNREAD_MESSAGES = 'SET_HAS_UNREAD_MESSAGES',
}

export function setHasUnreadMessages(room: ChatRoom, hasUnread: boolean): AnyAction {
    return {
        type: SocialActionTypes.SET_HAS_UNREAD_MESSAGES,
        payload: { room, hasUnread },
    };
}

function getFriendsListSuccess(profiles: Profile[]): AnyAction {
    return {
        type: SocialActionTypes.GET_FRIENDS_LIST_SUCCESS,
        payload: profiles,
    };
}

function getFriendsListFailed(error: any): AnyAction {
    return {
        type: SocialActionTypes.GET_FRIENDS_LIST_FAILED,
        payload: { error },
    };
}

export function getFriendsListAsync(): ThunkAction<void, {}, {}, AnyAction> {
    return async function getFriendsListThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        try {
            const profilesImport = await cvat.social.friends();

            profilesImport.sort((a: any, b: any) => b.online_status - a.online_status);

            const profiles: Profile[] = profilesImport.map((profile: any): Profile => ({
                username: profile.user,
                userId: profile.id,
                status: decodeStatus(profile.online_status),
                selectedBadges: [],
                selectedBadgeStatuses: profile.selectedBadges.map((status: any): BadgeStatus => ({
                    id: status.badgeId,
                    tier: decodeBadgeTier(status.tier),
                    receivedOn: status.receivedOn,
                })) ?? [],
                profileStyle: {
                    additionalClassNames: profile.profile_class,
                    background: profile.profile_background,
                    border: profile.profile_border,
                    backgroundElements: profile.profile_background_elements,
                    color: 0, // TODO:
                },
                chatActive: false,
            }));

            dispatch(getFriendsListSuccess(profiles));
        } catch (error) {
            dispatch(getFriendsListFailed(error));
        }
    };
}

export function toggleChat(userId: number, show: boolean): AnyAction {
    return {
        type: SocialActionTypes.TOGGLE_CHAT_WINDOW,
        payload: { userId, show },
    };
}

export function setStatus(status: OnlineStatus): AnyAction {
    return {
        type: SocialActionTypes.SET_STATUS,
        payload: status,
    };
}

export function setAdditionalClassNames(name: number): AnyAction {
    return {
        type: SocialActionTypes.SET_ADDITIONAL_CLASSNAMES,
        payload: name,
    };
}

export function setProfileBackground(background: number): AnyAction {
    return {
        type: SocialActionTypes.SET_PROFILE_BACKGROUND,
        payload: background,
    };
}

export function setColor(color: string): AnyAction {
    return {
        type: SocialActionTypes.SET_COLOR,
        payload: color,
    };
}

export function setProfileBorder(border: number): AnyAction {
    return {
        type: SocialActionTypes.SET_PROFILE_BORDER,
        payload: border,
    };
}

export function setProfileBackgroundEffects(backgroundElements: number): AnyAction {
    return {
        type: SocialActionTypes.SET_BACKGROUND_ELEMENTS,
        payload: backgroundElements,
    };
}

export function setAvatar(avatar: number): AnyAction {
    return {
        type: SocialActionTypes.SET_AVATAR,
        payload: avatar,
    };
}

export function setAvatarBorder(border: string): AnyAction {
    return {
        type: SocialActionTypes.SET_AVATAR_BORDER,
        payload: border,
    };
}

function saveProfileDataSuccess(profile: Profile): AnyAction {
    return {
        type: SocialActionTypes.SAVE_PROFILE_DATA_SUCCESS,
        payload: profile,
    };
}

function saveProfileDataFailed(error: any): AnyAction {
    return {
        type: SocialActionTypes.SAVE_PROFILE_DATA_FAILED,
        payload: error,
    };
}

export function saveProfileDataAsync(): ThunkAction<void, {}, {}, AnyAction> {
    return async function saveProfileDataThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        try {
            const { gamifuserdata, social } = getCVATStore().getState();
            const style = social.ownProfile.profileStyle;

            const data = {
                // selectedBadges: '',
                online_status: encodeStatus(social.status),
                profile_class: style.additionalClassNames,
                profile_border: style.border,
                profile_background: style.background,
                profile_background_elements: style.backgroundElements,
            };

            const profiles = await cvat.social.saveProfileData(gamifuserdata.userId, data);

            dispatch(saveProfileDataSuccess(profiles));
        } catch (error) {
            dispatch(saveProfileDataFailed(error));
        }
    };
}

function getChatHistorySuccess(id: number, messages: Message[]): AnyAction {
    return {
        type: SocialActionTypes.GET_CHAT_HISTORY_SUCCESS,
        payload: { id, messages },
    };
}

function getChatHistoryFailed(error: any): AnyAction {
    const action = {
        type: SocialActionTypes.GET_CHAT_HISTORY_FAILED,
        payload: { error },
    };
    return action;
}

export function getChatHistoryAsync(user2Id: number): ThunkAction<void, {}, {}, AnyAction> {
    const { userId } = getCVATStore().getState().gamifuserdata;

    return async function getChatHistoryThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        try {
            const messages = await cvat.social.chatHistory(Math.min(userId, user2Id), Math.max(userId, user2Id));

            const messagesFormatted: Message[] = messages.map((msg: any) => ({
                sender: msg.senderId === userId,
                content: msg.content,
                timestamp: msg.timestamp,
            }));

            dispatch(getChatHistorySuccess(user2Id, messagesFormatted));
        } catch (error) {
            dispatch(getChatHistoryFailed(error));
        }
    };
}

function sendMessageSuccess(id: number, message: string): AnyAction {
    return {
        type: SocialActionTypes.SEND_MESSAGE_SUCCESS,
        payload: { id, message },
    };
}

function sendMessageFailed(error: any): AnyAction {
    const action = {
        type: SocialActionTypes.SEND_MESSAGE_FAILED,
        payload: { error },
    };
    return action;
}

export function sendMessageAsync(user2Id: number, content: string): ThunkAction<void, {}, {}, AnyAction> {
    const { userId } = getCVATStore().getState().gamifuserdata;

    return async function sendMessageThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        try {
            const msg = await cvat.social.sendMessage(userId, user2Id, content);

            dispatch(sendMessageSuccess(user2Id, msg));
        } catch (error) {
            dispatch(sendMessageFailed(error));
        }
    };
}
