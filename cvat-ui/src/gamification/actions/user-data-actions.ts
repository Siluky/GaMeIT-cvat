// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { getCVATStore } from 'cvat-store';
import { ActionCreator, AnyAction, Dispatch } from 'redux';
import getCore from 'cvat-core-wrapper';
import { ThunkAction } from 'redux-thunk';
import { UserData } from '../gamif-interfaces';
import { addQuickStatistic } from './statistics-actions';
// eslint-disable-next-line import/no-cycle
import { initShop, updateBalance } from './shop-actions';
import { toggleBadgeInProfile } from './badge-actions';

const cvat = getCore();

export enum UserDataActionTypes {
    GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS',
    GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED',
    SET_USER_ID = 'SET_USER_ID',
    SET_USER_NAME = 'SET_USER_NAME',
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

export function updateUserName(name: string): AnyAction {
    return {
        type: UserDataActionTypes.SET_USER_NAME,
        payload: name,
    };
}

export function updateUserDataSuccess(field_name: keyof UserData, increment: number): AnyAction {
    return {
        type: UserDataActionTypes.UPDATE_USER_DATA_FIELD_SUCCESS,
        payload: { field_name, increment },
    };
}
// export function updateUserDataSuccess(userData: UserData): AnyAction {
//     return {
//         type: UserDataActionTypes.UPDATE_USER_DATA_FIELD_SUCCESS,
//         payload: userData,
//     };
// }

export function updateUserDataFailed(error: any): AnyAction {
    return {
        type: UserDataActionTypes.UPDATE_USER_DATA_FIELD_FAILED,
        payload: error,
    };
}

export function updateUserData(field_name: keyof UserData, increment: number): ThunkAction<void, {}, {}, AnyAction> {
    return async function updateUserDataThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        try {
            dispatch(updateUserDataSuccess(field_name, increment));
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
                // eslint-disable-next-line max-len
                annotation_time_avg: Math.floor(userDataImport.annotation_time_total / userDataImport.images_annotated_total),
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

            const username = userDataImport.user;
            dispatch(updateUserName(username));

            // Selected Badges / Statistics + Bought Items are stored as a string with the ids
            // separated by commas, e.g., "1,2,3" --> split them and parse to int

            const selectedStatsImport = userDataImport.selectedStatistics.split(',');
            const selectedStatIds = selectedStatsImport.map((id: string) => parseInt(id, 10));
            dispatch(addQuickStatistic(selectedStatIds));

            dispatch(updateBalance(userDataAllTime.currentBalance));

            const boughtItemsImport = userDataImport.items_bought.split(',');
            const boughtItems = boughtItemsImport.map((id: string) => parseInt(id, 10));
            dispatch(initShop(boughtItems));

            const selectedBadgesImport = userDataImport.items_bought.split(',');
            console.log('🚀 ~ file: user-data-actions.ts ~ line 142 ~ loadUserDataThunk ~ selectedBadgesImport', selectedBadgesImport);
            // eslint-disable-next-line max-len
            // FIXME: Probably do one dispatch with an array --> initBadges action
            selectedBadgesImport.map((id: string) => dispatch(toggleBadgeInProfile(parseInt(id, 10))));

            const userDataSession: UserData = {
                last_login: Date.now(),
                images_annotated: 0,
                tags_set: 0,
                images_annotated_night: 0,
                annotation_time: 0,
                annotation_time_avg: 0,
                annotation_streak_current: userDataAllTime.annotation_streak_current,
                annotation_streak_max: 0,
                badges_obtained: 0,
                challenges_completed: 0,
                energy_gained: 0,
                energizers_completed: 0,
                energy_expired: 0,
                tetris_played: 0,
                quiz_played: 0,
                snake_played: 0,
                currentBalance: 0,
                annotation_coins_obtained: 0,
                annotation_coins_max: userDataAllTime.annotation_coins_max,
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
    const state = getCVATStore().getState();
    const userDataState = state.gamifuserdata;
    const shopState = state.shop;

    const totalData = userDataState.userdata_total;
    const sessionData = userDataState.userdata_session;

    const { selectedStatistics } = state.statistics;
    let stats = '';
    for (const id of selectedStatistics) {
        stats += id.toString();
        stats += ',';
    }
    stats = stats.slice(0, -1); // remove trailing comma

    const { badgesinProfile } = state.badges;
    let badgeIds = '';
    for (const id of badgesinProfile) {
        badgeIds += id.toString();
        badgeIds += ',';
    }
    badgeIds = badgeIds.slice(0, -1); // remove trailing comma

    let itemsBought = '';
    const items = shopState.availableItems;
    for (const item of items) {
        if (item.bought) {
            itemsBought += item.id.toString();
            itemsBought += ',';
        }
    }
    itemsBought = itemsBought.slice(0, -1); // remove trailing comma

    console.log('🚀 ~ file: user-data-actions.ts ~ line 184 ~ saveUserData ~ stats', stats);

    const userDataPrepared = {
        id: userDataState.userId,
        user: userDataState.userId,
        last_login: sessionData.last_login,
        image_annotated_total: totalData.images_annotated,
        tags_set_total: totalData.tags_set,
        images_annotated_night: totalData.images_annotated_night,
        annotation_time_total: totalData.annotation_time,
        annotation_streak_current: sessionData.annotation_streak_current,
        annotation_streak_max: totalData.annotation_streak_max,
        badges_obtained_total: totalData.badges_obtained,
        challenges_completed: totalData.challenges_completed,
        energy_total: totalData.energy_gained,
        energizers_completed: totalData.energizers_completed,
        energy_expired: totalData.energy_expired,
        tetris_played: totalData.tetris_played,
        quiz_played: totalData.quiz_played,
        snake_played: totalData.snake_played,
        currentBalance: shopState.currentBalance,
        annotation_coins_total: totalData.annotation_coins_obtained,
        annotation_coins_max: totalData.annotation_coins_max,
        items_bought_total: totalData.items_bought,
        chat_messages_total: totalData.chat_messages,

        items_bought: itemsBought,
        selectedStatistics: stats,
        selectedBadges: badgeIds,
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
