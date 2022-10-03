// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { ActionCreator, AnyAction, Dispatch } from 'redux';
import getCore from 'cvat-core-wrapper';
import { ThunkAction } from 'redux-thunk';
import { OnlineStatus, Profile } from 'gamification/gamif-interfaces';

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

    GET_CHAT_HISTORY_SUCCESS = 'GET_CHAT_HISTORY_SUCCESS', // TODO:
    GET_CHAT_HISTORY_FAILED = 'GET_CHAT_HISTORY_FAILED', // TODO:
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
            console.log('🚀 ~ file: social-actions.ts ~ line 49 ~ getFriendsListThunk ~ profilesImport', profilesImport);
            const profiles: Profile[] = profilesImport.map((profile: any): Profile => ({
                username: profile.user,
                userId: profile.id,
                status: profile.online_status,
                selectedBadges: profile.selectedBadges.split(',').map((id: string) => parseInt(id, 10)) ?? [1, 2, 3],
                profileStyle: {
                    additionalClassNames: '',
                    background: profile.profile_background,
                    border: profile.profile_border,
                    backgroundElements: 0,
                    avatar: profile.avatar,
                    avatarBorder: profile.avatar_border,
                    color: 'white',
                },
                chatActive: false,
            }));
            console.log('🚀 ~ file: social-actions.ts ~ line 57 ~ getFriendsListThunk ~ profiles', profiles);
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

export function setAdditionalClassNames(names: string): AnyAction {
    return {
        type: SocialActionTypes.SET_ADDITIONAL_CLASSNAMES,
        payload: names,
    };
}

export function setProfileBackground(background: string): AnyAction {
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

export function setProfileBorder(border: string): AnyAction {
    return {
        type: SocialActionTypes.SET_PROFILE_BORDER,
        payload: border,
    };
}

export function setProfileBackgroundEffects(backgroundElements: any): AnyAction {
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
        type: SocialActionTypes.SET_PROFILE_BORDER,
        payload: error,
    };
}

export function saveProfileDataAsync(): ThunkAction<void, {}, {}, AnyAction> {
    return async function saveProfileDataThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        try {
            // TODO: Not implemented yet!
            const profiles = await cvat.social.getProfiles();

            dispatch(saveProfileDataSuccess(profiles));
        } catch (error) {
            dispatch(saveProfileDataFailed(error));
        }
    };
}

// TODO: M;ind the any type in params
function getChatHistorySuccess(messages: any): AnyAction {
    return {
        type: SocialActionTypes.GET_CHAT_HISTORY_SUCCESS,
        payload: messages,
    };
}

function getChatHistoryFailed(error: any): AnyAction {
    const action = {
        type: SocialActionTypes.GET_CHAT_HISTORY_FAILED,
        payload: { error },
    };
    return action;
}

export function getChatHistoryAsync(otherUserId: number): ThunkAction<void, {}, {}, AnyAction> {
    return async function getChatHistoryThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        try {
            // TODO: Not implemented yet!
            const messages = await cvat.social.getChat(otherUserId);

            dispatch(getChatHistorySuccess(messages));
        } catch (error) {
            dispatch(getChatHistoryFailed(error));
        }
    };
}
