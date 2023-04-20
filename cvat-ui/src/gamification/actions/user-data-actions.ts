// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { getCVATStore } from 'cvat-store';
import { ActionCreator, AnyAction, Dispatch } from 'redux';
import getCore from 'cvat-core-wrapper';
import { ThunkAction } from 'redux-thunk';
import { notification } from 'antd';
import { UrlLog, UserData } from '../gamif-interfaces';
import { addQuickStatistic } from './statistics-actions';
// eslint-disable-next-line import/no-cycle
import { initShop, updateBalance } from './shop-actions';
// eslint-disable-next-line import/no-cycle
import { initProfileBadges, loadBadgesAsync } from './badge-actions';
// eslint-disable-next-line import/no-cycle
import { getChallengesAsync } from './challenge-actions';

const cvat = getCore();

export enum UserDataActionTypes {
    GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS',
    GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED',
    SET_USER_ID = 'SET_USER_ID',
    SET_USER_NAME = 'SET_USER_NAME',
    SAVE_USER_DATA_SUCCESS = 'SAVE_USER_DATA_SUCCESS',
    SAVE_USER_DATA_FAILED = 'SAVE_USER_DATA_FAILED',

    ADD_LOG_SUCCESS = 'ADD_LOG_SUCCESS',
    ADD_LOG_FAILED = 'ADD_LOG_FAILED',

    UPDATE_USER_DATA_FIELD_SUCCESS = 'UPDATE_USER_DATA_FIELD_SUCCESS',
    UPDATE_USER_DATA_FIELD_FAILED = 'UPDATE_USER_DATA_FIELD_FAILED',

    TOGGLE_SURVEY_PROMPT = 'TOGGLE_SURVEY_PROMPT',
    SET_FINISHED_STATUS = 'SET_FINISHED_STATUS',

    SAVE_IMAGE_STATUSES_SUCCESS = 'SAVE_IMAGE_STATUSES_SUCCESS',
    SAVE_IMAGE_STATUSES_FAILED = 'SAVE_IMAGE_STATUSES_FAILED',
    GET_IMAGE_STATUS_SUCCESS = 'GET_IMAGE_STATUSES_SUCCESS',
    GET_IMAGE_STATUS_FAILED = 'GET_IMAGE_STATUSES_FAILED',

    SET_SURVEY_TIMING = 'SET_SURVEY_TIMING',
}

export function setSurveyTiming(timing: number): AnyAction {
    return {
        type: UserDataActionTypes.SET_SURVEY_TIMING,
        payload: timing,
    };
}

function addLogSuccess(event: string): AnyAction {
    return {
        type: UserDataActionTypes.ADD_LOG_SUCCESS,
        payload: event,
    };
}

function addLogFailed(error: any): AnyAction {
    return {
        type: UserDataActionTypes.ADD_LOG_FAILED,
        payload: error,
    };
}

export function addGamifLog(event: string): ThunkAction<void, {}, {}, AnyAction> {
    const { userId } = getCVATStore().getState().gamifuserdata;

    return async (dispatch) => {
        try {
            await cvat.gamiflogs.save(userId, event);
            dispatch(addLogSuccess(event));
        } catch (error) {
            dispatch(addLogFailed(error));
        }
    };
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

export function saveUserData(backup: boolean): ThunkAction<void, {}, {}, AnyAction> {
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
    if (!badgeIds) { badgeIds = '0'; }

    let itemsBought = '';
    const items = shopState.availableItems;
    for (const item of items) {
        if (item.bought) {
            itemsBought += item.id.toString();
            itemsBought += ',';
        }
    }
    itemsBought = itemsBought.slice(0, -1); // remove trailing comma

    const userDataPrepared = {
        id: userDataState.userId,
        user: userDataState.userId,
        last_login_ms: Math.floor(sessionData.last_login / 1000), // in sec to avoid overflow
        images_annotated_total: totalData.images_annotated,
        tags_set_total: totalData.polygons_drawn,
        images_annotated_night: totalData.images_annotated_night,
        annotation_time_total: totalData.annotation_time,
        annotation_streak_current: sessionData.annotation_streak_current,
        annotation_streak_max: totalData.annotation_streak_max,
        annotation_streak_saver: sessionData.streak_saver_active,
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
        mystery_gifts_bought: totalData.mystery_gifts_bought,
        moneyBadgeTier: totalData.money_badge_tier,

        items_bought: itemsBought,
        selectedStatistics: stats,
        selectedBadges: badgeIds,
    };

    return async (dispatch) => {
        try {
            await cvat.gamifuserdata.save(userDataPrepared);
            dispatch(saveUserDataSuccess());
            if (backup) { dispatch(addGamifLog(JSON.stringify(userDataPrepared))); }
        } catch (error) {
            dispatch(saveUserDataFailed(error));
        }
    };
}

export function initializeUserData(test?: boolean): ThunkAction<void, {}, {}, AnyAction> {
    return async function loadUserDataThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        let userDataImport = null;
        try {
            userDataImport = await cvat.gamifuserdata.get();

            // Guard against division by 0
            const zeroImagesAnnotated = userDataImport.images_annotated_total === 0;

            const userDataAllTime: UserData = {
                last_login: userDataImport.last_login_ms * 1000,
                images_annotated: userDataImport.images_annotated_total,
                polygons_drawn: userDataImport.tags_set_total,
                images_annotated_night: userDataImport.images_annotated_night,
                annotation_time: userDataImport.annotation_time_total,
                // eslint-disable-next-line max-len
                annotation_time_avg: zeroImagesAnnotated ? 0 : Math.ceil(
                    userDataImport.annotation_time_total / userDataImport.images_annotated_total,
                ),
                annotation_streak_current: userDataImport.annotation_streak_current,
                annotation_streak_max: userDataImport.annotation_streak_max,
                streak_saver_active: userDataImport.annotation_streak_saver,
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
                mystery_gifts_bought: userDataImport.mystery_gifts_bought,
                chat_messages: userDataImport.chat_messages_total,
                money_badge_tier: userDataImport.moneyBadgeTier,
            };

            const userId = userDataImport.id;
            dispatch(updateUserId(userId));

            const username = userDataImport.user;
            dispatch(updateUserName(username));

            // Selected Badges / Statistics + Bought Items are stored as a string with the ids
            // separated by commas, e.g., "1,2,3" --> split them and parse to int

            if (!test) {
                const selectedStatsImport = userDataImport.selectedStatistics.split(',');
                const selectedStatIds = selectedStatsImport.map((id: string) => parseInt(id, 10));
                dispatch(addQuickStatistic(selectedStatIds));
            }

            dispatch(updateBalance(userDataAllTime.currentBalance));

            const boughtItemsImport = userDataImport.items_bought.split(',');
            const boughtItems = boughtItemsImport.map((id: string) => parseInt(id, 10));
            dispatch(initShop(boughtItems));

            const selectedBadgesImport = userDataImport.selectedBadges.split(',');
            // eslint-disable-next-line max-len
            const badgeIdsPrepared = selectedBadgesImport.map((id: string) => parseInt(id, 10));
            dispatch(initProfileBadges(badgeIdsPrepared));
            dispatch(loadBadgesAsync());

            const lastLogin = userDataAllTime.last_login;
            const currentTime = Date.now();

            const newDay = test ? true : (new Date(lastLogin).getDay() - new Date(currentTime).getDay()) !== 0;
            if (newDay) {
                // console.log('New day has started');

                const timeSinceLogin = currentTime - lastLogin;
                let message = '';
                let description = '';
                if ((timeSinceLogin > 24 * 60 * 60 * 1000) || test) {
                    if (userDataAllTime.streak_saver_active) {
                        userDataAllTime.streak_saver_active = false;
                        message = 'Streak Saved.';
                        description = 'Your Streak Saver has protected you from losing your annotation streak';
                    } else {
                        userDataAllTime.annotation_streak_current = 0;
                        message = 'Streak Lost.';
                        description = 'You have lost your current annotation streak due to being inactive too long';
                    }
                    // eslint-disable-next-line security/detect-non-literal-fs-filename
                    notification.open({
                        message,
                        description,
                    });
                }

                userDataAllTime.annotation_streak_current++;

                userDataAllTime.annotation_streak_max = Math.max(
                    userDataAllTime.annotation_streak_max, userDataAllTime.annotation_streak_current,
                );
            }

            dispatch(getChallengesAsync(newDay));

            const userDataSession: UserData = {
                last_login: currentTime,
                images_annotated: 0,
                polygons_drawn: 0,
                images_annotated_night: 0,
                annotation_time: 0,
                annotation_time_avg: 0,
                annotation_streak_current: 0,
                annotation_streak_max: userDataAllTime.annotation_streak_current,
                streak_saver_active: userDataAllTime.streak_saver_active,
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
                annotation_coins_max: userDataAllTime.currentBalance,
                items_bought: 0,
                chat_messages: 0,
                mystery_gifts_bought: 0,
                money_badge_tier: 0,
            };

            dispatch(getUserDataSuccess(userDataAllTime, userDataSession));
            dispatch(saveUserData(false));
        } catch (error) {
            dispatch(getUserDataFailed(error));
        }
    };
}

export function toggleSurveyPrompt(show: boolean): AnyAction {
    return {
        type: UserDataActionTypes.TOGGLE_SURVEY_PROMPT,
        payload: show,
    };
}

export function setFinishedStatus(jobId: number, imageId: number, status: boolean): AnyAction {
    return {
        type: UserDataActionTypes.SET_FINISHED_STATUS,
        payload: { jobId, imageId, status },
    };
}

function saveImageStatusesSuccess(): AnyAction {
    return {
        type: UserDataActionTypes.SAVE_IMAGE_STATUSES_SUCCESS,
    };
}
function saveImageStatusesFailed(error: any): AnyAction {
    return {
        type: UserDataActionTypes.SAVE_IMAGE_STATUSES_FAILED,
        payload: error,
    };
}

export function saveImageStatusesAsync(): ThunkAction<void, {}, {}, AnyAction> {
    const { imagesFinished, userId } = getCVATStore().getState().gamifuserdata;
    const jobId = getCVATStore().getState().annotation.job.requestedId;
    // const url = window.location.href;

    const relevantLog = imagesFinished.logs.find((log: UrlLog) => log.id === jobId);
    // console.log('🚀 ~ file: user-data-actions.ts:400 ~ saveImageStatusesAsync ~ relevantLog:', relevantLog);

    const data = {
        userId,
        jobId,
        imageIds: JSON.stringify(relevantLog),
    };

    return async (dispatch) => {
        try {
            await cvat.gamifuserdata.saveImageStatus(userId, jobId, data);
            dispatch(saveImageStatusesSuccess());
        } catch (error) {
            dispatch(saveImageStatusesFailed(error));
        }
    };
}

function getImageStatusSuccess(data: any): AnyAction {
    return {
        type: UserDataActionTypes.GET_IMAGE_STATUS_SUCCESS,
        payload: data,
    };
}
function getImageStatusFailed(error: any): AnyAction {
    return {
        type: UserDataActionTypes.GET_IMAGE_STATUS_FAILED,
        payload: error,
    };
}

export function getImageStatusAsync(): ThunkAction<void, {}, {}, AnyAction> {
    // const url = window.location.href;
    const jobId = getCVATStore().getState().annotation.job.requestedId;
    let data = null;

    return async (dispatch) => {
        try {
            data = await cvat.gamifuserdata.getImageStatus(jobId);
            // console.log('🚀 ~ file: user-data-actions.ts:430 ~ return ~ data:', data);
            dispatch(getImageStatusSuccess(data));
        } catch (error) {
            dispatch(getImageStatusFailed(error));
        }
    };
}
