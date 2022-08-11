// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import gamifconsts from 'gamification/gamifconsts';
import { AnyAction } from 'redux';
import { EnergizerActionTypes } from '../actions/energizer-actions';
import { EnergizerState, EnergizerType } from '../gamif-interfaces';

const defaultState: EnergizerState = {
    energyLevel: 0,
    active: false,
    popupOpen: false,
    activeEnergizer: EnergizerType.NONE,
    leaderboardEntries: [],
    questions: [],
};

export default (state = defaultState, action: AnyAction): EnergizerState => {
    switch (action.type) {
        case EnergizerActionTypes.SWITCH_ENERGIZER: {
            return {
                ...state,
                active: action.payload,
            };
        }

        case EnergizerActionTypes.SWITCH_ENERGIZER_POPUP: {
            return {
                ...state,
                popupOpen: action.payload,
            };
        }

        case EnergizerActionTypes.SET_ACTIVE_ENERGIZER: {
            return {
                ...state,
                activeEnergizer: action.payload,
            };
        }

        case EnergizerActionTypes.INCREMENT_ENERGY: {
            return {
                ...state,
                energyLevel: Math.min(state.energyLevel + action.payload, gamifconsts.MAXIMUM_ENERGY),
            };
        }

        case EnergizerActionTypes.GET_CURRENT_ENERGY_FAILED: {
            return state;
        }

        case EnergizerActionTypes.GET_CURRENT_ENERGY_SUCCESS: {
            return {
                ...state,
                energyLevel: action.payload,
            };
        }

        case EnergizerActionTypes.SAVE_CURRENT_ENERGY_FAILED: {
            return state;
        }

        case EnergizerActionTypes.SAVE_CURRENT_ENERGY_SUCCESS: {
            return {
                ...state,
                energyLevel: action.payload,
            };
        }

        case EnergizerActionTypes.GET_LEADERBOARD_DATA_FAILED: {
            return state;
        }

        case EnergizerActionTypes.GET_LEADERBOARD_DATA_SUCCESS: {
            return {
                ...state,
                leaderboardEntries: action.payload,

            };
        }

        // case EnergizerActionTypes.GET_QUIZDUEL_QUESTIONS_FAILED: {
        //     return state;
        // }

        // case EnergizerActionTypes.GET_QUIZDUEL_QUESTIONS_SUCCESS: {
        //     return {
        //         ...state,
        //         questions: action.payload,
        //     };
        // }

        default: {
            return state;
        }
    }
};
