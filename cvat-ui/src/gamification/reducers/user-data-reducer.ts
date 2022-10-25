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
    annotation_time_avg: 0,
    annotation_streak_current: 0,
    annotation_streak_max: 0,
    streak_saver_active: false,
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
            const sessionData = state.userdata_session;
            const totalData = state.userdata_total;

            // console.log('🚀 ~ file: user-data-reducer.ts ~ line 56 ~
            // action.payload.field_name', action.payload.field_name);

            switch (action.payload.field_name) {
                case 'images_annotated': {
                    sessionData.images_annotated += action.payload.increment;
                    totalData.images_annotated += action.payload.increment;
                    // eslint-disable-next-line max-len
                    sessionData.annotation_time_avg = Math.round((sessionData.annotation_time / sessionData.images_annotated) * 10) / 10;
                    // eslint-disable-next-line max-len
                    totalData.annotation_time_avg = Math.round((totalData.annotation_time / totalData.images_annotated) * 10) / 10;
                    break;
                }
                case 'tags_set': {
                    sessionData.tags_set += action.payload.increment;
                    totalData.tags_set += action.payload.increment;
                    break;
                }
                case 'images_annotated_night': {
                    sessionData.images_annotated_night += action.payload.increment;
                    totalData.images_annotated_night += action.payload.increment;
                    break;
                }
                case 'annotation_time': {
                    sessionData.annotation_time += action.payload.increment;
                    totalData.annotation_time += action.payload.increment;
                    break;
                }
                case 'annotation_streak_current': {
                    sessionData.annotation_streak_current += action.payload.increment;
                    totalData.annotation_streak_current = Math.max(
                        sessionData.annotation_streak_current, totalData.annotation_streak_current,
                    );
                    break;
                }
                case 'badges_obtained': {
                    sessionData.badges_obtained += action.payload.increment;
                    totalData.badges_obtained += action.payload.increment;
                    break;
                }
                case 'challenges_completed': {
                    sessionData.challenges_completed += action.payload.increment;
                    totalData.challenges_completed += action.payload.increment;
                    break;
                }
                case 'energy_gained': {
                    sessionData.energy_gained += action.payload.increment;
                    totalData.energy_gained += action.payload.increment;
                    break;
                }
                case 'energy_expired': {
                    sessionData.energy_expired += action.payload.increment;
                    totalData.energy_expired += action.payload.increment;
                    break;
                }
                case 'energizers_completed': {
                    sessionData.energizers_completed += action.payload.increment;
                    totalData.energizers_completed += action.payload.increment;
                    break;
                }
                case 'tetris_played': {
                    sessionData.tetris_played += action.payload.increment;
                    totalData.tetris_played += action.payload.increment;
                    sessionData.energizers_completed += action.payload.increment;
                    totalData.energizers_completed += action.payload.increment;
                    break;
                }
                case 'quiz_played': {
                    sessionData.quiz_played += action.payload.increment;
                    totalData.quiz_played += action.payload.increment;
                    sessionData.energizers_completed += action.payload.increment;
                    totalData.energizers_completed += action.payload.increment;
                    break;
                }
                case 'snake_played': {
                    sessionData.snake_played += action.payload.increment;
                    totalData.snake_played += action.payload.increment;
                    sessionData.energizers_completed += action.payload.increment;
                    totalData.energizers_completed += action.payload.increment;
                    break;
                }
                case 'annotation_coins_obtained': {
                    sessionData.annotation_coins_obtained += action.payload.increment;
                    totalData.annotation_coins_obtained += action.payload.increment;
                    break;
                }
                case 'items_bought': {
                    sessionData.items_bought += action.payload.increment;
                    totalData.items_bought += action.payload.increment;
                    break;
                }
                case 'chat_messages': {
                    sessionData.chat_messages += action.payload.increment;
                    totalData.chat_messages += action.payload.increment;
                    break;
                }
                case 'streak_saver_active': {
                    sessionData.streak_saver_active = true;
                    break;
                }

                default: break;
            }

            return {
                ...state,
                userdata_session: sessionData,
                userdata_total: totalData,
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
