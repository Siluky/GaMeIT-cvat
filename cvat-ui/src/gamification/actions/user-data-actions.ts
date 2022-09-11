// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { getCVATStore } from 'cvat-store';
import { ActionCreator, AnyAction, Dispatch } from 'redux';
import getCore from 'cvat-core-wrapper';
import { ThunkAction } from 'redux-thunk';
import { UserData } from '../gamif-interfaces';

const cvat = getCore();

export enum UserDataActionTypes {
    GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS',
    GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED',
    SAVE_USER_DATA_SUCCESS = 'SAVE_USER_DATA_SUCCESS',
    SAVE_USER_DATA_FAILED = 'SAVE_USER_DATA_FAILED',

    UPDATE_USER_DATA_FIELD_SUCCESS = 'UPDATE_USER_DATA_FIELD_SUCCESS',
    UPDATE_USER_DATA_FIELD_FAILED = 'UPDATE_USER_DATA_FIELD_FAILED',
}

export function getUserDataSuccess(userData: UserData): AnyAction {
    return {
        type: UserDataActionTypes.GET_USER_DATA_SUCCESS,
        payload: userData,
    };
}

export function getUserDataFailed(error: any): AnyAction {
    return {
        type: UserDataActionTypes.GET_USER_DATA_FAILED,
        payload: error,
    };
}

export function updateUserDataSuccess(userData: UserData): AnyAction {
    return {
        type: UserDataActionTypes.UPDATE_USER_DATA_FIELD_SUCCESS,
        payload: userData,
    };
}

export function updateUserDataFailed(error: any): AnyAction {
    return {
        type: UserDataActionTypes.UPDATE_USER_DATA_FIELD_FAILED,
        payload: error,
    };
}

export function updateUserData(field_name: string, increment: number): ThunkAction<void, {}, {}, AnyAction> {
    return async function updateUserDataThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        const userDataState = getCVATStore().getState().gamifuserdata;

        try {
            const updatedUserData = userDataState.userdata_total;
            updatedUserData[field_name] += increment;
            dispatch(updateUserDataSuccess(updatedUserData));
        } catch (error) {
            dispatch(updateUserDataFailed(error));
        }
    };
}

export function initializeUserData(): ThunkAction<void, {}, {}, AnyAction> {
    return async function loadUserDataThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        let userDataImport = null;
        try {
            userDataImport = await cvat.gamifuserdata.get();
            console.log('🚀 ~ file: user-data-actions.ts ~ line 73 ~ loadUserDataThunk ~ userDataImport', userDataImport);

            const userData: UserData = {
                last_login: userDataImport.last_login,
                images_annotated: userDataImport.images_annotated_total,
                tags_set: userDataImport.tags_set_total,
                images_annotated_night: userDataImport.images_annotated_night,
                annotation_time: userDataImport.annotation_time_total,
                annotation_streak_current: userDataImport.annotation_streak_current,
                annotation_streak_max: userDataImport.annotation_streak_max,
                badges_obtained: userDataImport.badges_obtained_total,
                challenges_completed: userDataImport.challenges_completed,
                energy_gained: userDataImport.energy_total,
                energizers_completed: userDataImport.energizers_completed,
                energy_expired: userDataImport.energy_expired,
                tetris_played: userDataImport.tetris_played,
                quiz_played: userDataImport.quiz_played,
                snake_played: userDataImport.snake_played,
                currentBalance: userDataImport.currentBalance,
                annotation_coins_obtained: userDataImport.annotation_coins_total,
                annotation_coins_max: userDataImport.annotation_coins_max,
                items_bought: userDataImport.items_bought_total,
                chat_messages: userDataImport.chat_messages_total,
            };

            dispatch(getUserDataSuccess(userData));
        } catch (error) {
            dispatch(getUserDataFailed(error));
        }
    };
}

export function saveUserData(userData: UserData): AnyAction {
    return {
        type: UserDataActionTypes.SAVE_USER_DATA_SUCCESS,
        payload: userData,
    };
}
