// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { getCVATStore } from 'cvat-store';
import { ActionCreator, AnyAction, Dispatch } from 'redux';
import getCore from 'cvat-core-wrapper';
import { ThunkAction } from 'redux-thunk';
import { UserData } from '../gamif-interfaces';
import { addQuickStatistic } from './statistics-actions';
import { updateBalance } from './shop-actions';

const cvat = getCore();

export enum UserDataActionTypes {
    GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS',
    GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED',
    SET_USER_ID = 'SET_USER_ID',
    SAVE_USER_DATA_SUCCESS = 'SAVE_USER_DATA_SUCCESS',
    SAVE_USER_DATA_FAILED = 'SAVE_USER_DATA_FAILED',

    UPDATE_USER_DATA_FIELD_SUCCESS = 'UPDATE_USER_DATA_FIELD_SUCCESS',
    UPDATE_USER_DATA_FIELD_FAILED = 'UPDATE_USER_DATA_FIELD_FAILED',
}

export function getUserDataSuccess(userDataAllTime: UserData, userDataSession: UserData): AnyAction {
    return {
        type: UserDataActionTypes.GET_USER_DATA_SUCCESS,
        payload: {
            allTime: userDataAllTime,
            session: userDataSession,
        },
    };
}

export function getUserDataFailed(error: any): AnyAction {
    return {
        type: UserDataActionTypes.GET_USER_DATA_FAILED,
        payload: error,
    };
}

export function updateUserId(id: number): AnyAction {
    return {
        type: UserDataActionTypes.SET_USER_ID,
        payload: id,
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

export function updateUserData(field_name: keyof UserData, increment: number): ThunkAction<void, {}, {}, AnyAction> {
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

            const userDataAllTime: UserData = {
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

            const userId = userDataImport.id;
            dispatch(updateUserId(userId));

            const selectedStatsImport = userDataImport.selectedStatistics.split(',') ?? '1,2,3';
            const selectedStatIds = selectedStatsImport.map((id: string) => parseInt(id, 10));
            dispatch(addQuickStatistic(selectedStatIds));

            dispatch(updateBalance(userDataAllTime.currentBalance));

            const userDataSession: UserData = {
                last_login: Date.now(),
                images_annotated: 0,
                tags_set: 0,
                images_annotated_night: 0,
                annotation_time: 0,
                annotation_streak_current: 0, // TODO:
                annotation_streak_max: 0,
                badges_obtained: 0,
                challenges_completed: 0,
                energy_gained: 0,
                energizers_completed: 0,
                energy_expired: 0, // TODO:
                tetris_played: 0,
                quiz_played: 0,
                snake_played: 0,
                currentBalance: 0,
                annotation_coins_obtained: 0,
                annotation_coins_max: 0, // TODO:
                items_bought: 0,
                chat_messages: 0,
            };

            dispatch(getUserDataSuccess(userDataAllTime, userDataSession));
        } catch (error) {
            dispatch(getUserDataFailed(error));
        }
    };
}

function saveUserDataSuccess(): AnyAction {
    return {
        type: UserDataActionTypes.SAVE_USER_DATA_SUCCESS,
    };
}

function saveUserDataFailed(error: any): AnyAction {
    return {
        type: UserDataActionTypes.SAVE_USER_DATA_FAILED,
        payload: error,
    };
}

export function saveUserData(): ThunkAction<void, {}, {}, AnyAction> {
    const userDataState = getCVATStore().getState().gamifuserdata;

    // eslint-disable-next-line max-len
    const userdata = userDataState.userdata_total;
    console.log('🚀 ~ file: user-data-actions.ts ~ line 126 ~ saveUserData ~ userdata ', userdata);

    const userDataPrepared = {
        last_login: userdata.last_login,
        image_annotated_total: userdata.images_annotated,
        tags_set_total: userdata.tags_set,
        images_annotated_night: userdata.images_annotated_night,
        annotation_time_total: userdata.annotation_time,
        annotation_streak_current: userdata.annotation_streak_current,
        annotation_streak_max: userdata.annotation_streak_max,
        badges_obtained_total: userdata.badges_obtained,
        challenges_completed: userdata.challenges_completed,
        energy_total: userdata.energy_gained,
        energizers_completed: userdata.energizers_completed,
        energy_expired: userdata.energy_expired,
        tetris_played: userdata.tetris_played,
        quiz_played: userdata.quiz_played,
        snake_played: userdata.snake_played,
        currentBalance: userdata.currentBalance,
        annotation_coins_total: userdata.annotation_coins_obtained,
        annotation_coins_max: userdata.annotation_coins_max,
        items_bought_total: userdata.items_bought,
        chat_messages_total: userdata.chat_messages,
    };

    return async (dispatch) => {
        try {
            await cvat.gamifuserdata.save(userDataPrepared);
            dispatch(saveUserDataSuccess());
        } catch (error) {
            dispatch(saveUserDataFailed(error));
        }
    };
}
