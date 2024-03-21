// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { UserDataActionTypes } from '../actions/user-data-actions';
import {
    ImageStatus, UrlLog, UserData, UserDataState,
} from '../gamif-interfaces';

const userdataInit: UserData = {
    last_login: Date.now(),
    images_annotated: 0,
    polygons_drawn: 0,
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
    mystery_gifts_bought: 0,
    chat_messages: 0,
    money_badge_tier: 0,
};

const defaultState: UserDataState = {
    userdata_session: userdataInit,
    userdata_total: userdataInit,
    userId: 0,
    surveyTiming: 5,
    username: 'test',
    surveyPromptVisible: false,
    imagesFinished: { logs: [] },
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
                    sessionData.annotation_time_avg = sessionData.images_annotated !== 0 ? (Math.round(
                        (sessionData.annotation_time / sessionData.images_annotated) * 10,
                    ) / 10) : 0;
                    // eslint-disable-next-line max-len
                    totalData.annotation_time_avg = totalData.images_annotated !== 0 ? (Math.round(
                        (totalData.annotation_time / totalData.images_annotated) * 10,
                    ) / 10) : 0;
                    break;
                }
                case 'polygons_drawn': {
                    sessionData.polygons_drawn += action.payload.increment;
                    totalData.polygons_drawn += action.payload.increment;
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
                    sessionData.annotation_time_avg = sessionData.images_annotated !== 0 ? (Math.round(
                        (sessionData.annotation_time / sessionData.images_annotated) * 10,
                    ) / 10) : 0;
                    // eslint-disable-next-line max-len
                    totalData.annotation_time_avg = totalData.images_annotated !== 0 ? (Math.round(
                        (totalData.annotation_time / totalData.images_annotated) * 10,
                    ) / 10) : 0;
                    break;
                }
                case 'annotation_streak_current': {
                    sessionData.annotation_streak_current += action.payload.increment;
                    totalData.annotation_streak_current = Math.max(
                        sessionData.annotation_streak_current, totalData.annotation_streak_current,
                    );
                    totalData.annotation_streak_max = Math.max(
                        totalData.annotation_streak_max, totalData.annotation_streak_current,
                    );
                    break;
                }
                case 'badges_obtained': {
                    sessionData.badges_obtained += action.payload.increment;
                    totalData.badges_obtained += action.payload.increment;
                    break;
                }

                case 'annotation_coins_max': {
                    totalData.annotation_coins_max = action.payload.increment;
                    sessionData.annotation_coins_max = action.payload.increment;
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

                case 'mystery_gifts_bought': {
                    sessionData.mystery_gifts_bought += action.payload.increment;
                    totalData.mystery_gifts_bought += action.payload.increment;
                    break;
                }

                case 'money_badge_tier': {
                    totalData.money_badge_tier += action.payload.increment;
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

        case UserDataActionTypes.TOGGLE_SURVEY_PROMPT: {
            return {
                ...state,
                surveyPromptVisible: action.payload,
            };
        }

        case UserDataActionTypes.SET_FINISHED_STATUS: {
            // const url = window.location.href;
            const { logs } = state.imagesFinished;
            const relevantLog = logs.find((log) => log.id === action.payload.jobId);
            if (relevantLog) {
                const logIndex = logs.indexOf(relevantLog);
                logs.splice(logIndex, 1);
                const relevantStatus = relevantLog.statuses.find((status) => status.id === action.payload.imageId);

                // If a relevant status already exists, remove it
                if (relevantStatus) {
                    const relevantIndex = relevantLog.statuses.indexOf(relevantStatus);
                    relevantLog.statuses.splice(relevantIndex, 1);
                }

                // Afterwards: Push new status
                relevantLog.statuses.push({
                    id: action.payload.imageId,
                    finished: action.payload.status,
                });

                return {
                    ...state,
                    imagesFinished: {
                        logs: logs.concat(relevantLog),
                    },
                };
            }
            // if no relevant Log is found, create it.
            const status: ImageStatus = {
                id: action.payload.imageId,
                finished: action.payload.status,
            };
            const newLog: UrlLog = {
                id: action.payload.jobId,
                statuses: [
                    status,
                ],
            };

            return {
                ...state,
                imagesFinished: {
                    logs: state.imagesFinished.logs.concat(newLog),
                },
            };

            break;
        }

        case UserDataActionTypes.SET_SURVEY_TIMING: {
            return {
                ...state,
                surveyTiming: action.payload,
            };
        }

        case UserDataActionTypes.GET_IMAGE_STATUS_SUCCESS: {
            const modifiedLog = JSON.parse(action.payload.imageIds);
            // console.log('🚀 ~ file: user-data-reducer.ts:288 ~ log:', modifiedLog);
            const existingLogs = state.imagesFinished.logs;
            // console.log('🚀 ~ file: user-data-reducer.ts:286 ~ existingLogs:', existingLogs);
            const relevantLog = existingLogs.find((log: UrlLog) => log.id === modifiedLog.id);
            let relevantLogIndex = 0;
            if (!relevantLog) {
                // console.log('didnt find a log, creating');
                return {
                    ...state,
                    imagesFinished: { logs: state.imagesFinished.logs.concat(modifiedLog) },
                };
            }

            relevantLogIndex = existingLogs.indexOf(relevantLog);
            existingLogs[relevantLogIndex] = modifiedLog;
            // console.log('🚀 ~ file: user-data-reducer.ts:292 ~ existingLogs:', existingLogs);

            return {
                ...state,
                imagesFinished: { logs: existingLogs },
            };
        }

        case UserDataActionTypes.SAVE_IMAGE_STATUSES_SUCCESS: {
            return {
                ...state,
            };
        }

        case UserDataActionTypes.RESET_USERDATA_STATE: {
            return {
                ...state,
                userdata_session: userdataInit,
                userdata_total: userdataInit,
                surveyTiming: 5,
                surveyPromptVisible: false,
                imagesFinished: { logs: [] },
            };
        }

        case UserDataActionTypes.SAVE_USER_DATA_FAILED: return state;
        case UserDataActionTypes.SAVE_USER_DATA_SUCCESS: return state;
        case UserDataActionTypes.RESET_USER_DATA_FAILED: return state;
        case UserDataActionTypes.RESET_USER_DATA_SUCCESS: return state;
        case UserDataActionTypes.GET_USER_DATA_FAILED: return state;
        case UserDataActionTypes.UPDATE_USER_DATA_FIELD_FAILED: return state;
        case UserDataActionTypes.GET_IMAGE_STATUS_FAILED: return state;
        case UserDataActionTypes.SAVE_IMAGE_STATUSES_FAILED: return state;
        default: return state;
    }
};
