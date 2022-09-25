// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { UserDataActionTypes } from '../actions/user-data-actions';
import { UserData, UserDataState } from '../gamif-interfaces';

const userdataInit: UserData = {
    last_login: Date.now(),
    images_annotated: 0,
    tags_set: 0,
    images_annotated_night: 0,
    annotation_time: 0,
    annotation_streak_current: 0,
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
    annotation_coins_max: 0,
    items_bought: 0,
    chat_messages: 0,
};

const defaultState: UserDataState = {
    userdata_session: userdataInit,
    userdata_total: userdataInit,
    userId: 0,
    username: 'test',
};

export default (state = defaultState, action: AnyAction): UserDataState => {
    switch (action.type) {
        case UserDataActionTypes.GET_USER_DATA_SUCCESS: {
            return {
                ...state,
                userdata_total: action.payload.allTime,
                userdata_session: action.payload.session,
            };
        }

        case UserDataActionTypes.UPDATE_USER_DATA_FIELD_SUCCESS: {
            return {
                ...state,
                userdata_session: action.payload,
            };
        }

        case UserDataActionTypes.SET_USER_ID: {
            return {
                ...state,
                userId: action.payload,
            };
        }

        case UserDataActionTypes.SET_USER_NAME: {
            return {
                ...state,
                username: action.payload,
            };
        }

        case UserDataActionTypes.SAVE_USER_DATA_FAILED: return state;
        case UserDataActionTypes.SAVE_USER_DATA_SUCCESS: return state; // just to know API call worked, no state changes
        case UserDataActionTypes.GET_USER_DATA_FAILED: return state;
        case UserDataActionTypes.UPDATE_USER_DATA_FIELD_FAILED: return state;
        default: return state;
    }
};
