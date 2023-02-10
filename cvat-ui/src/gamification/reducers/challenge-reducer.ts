// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { ChallengeActionTypes } from '../actions/challenge-actions';
import { ChallengeState } from '../gamif-interfaces';

const defaultState: ChallengeState = {
    availableChallenges: [],
};

export default (state = defaultState, action: AnyAction): ChallengeState => {
    switch (action.type) {
        case ChallengeActionTypes.GET_CHALLENGES_FAILED: {
            return {
                ...state,
            };
        }

        case ChallengeActionTypes.GET_CHALLENGES_SUCCESS: {
            return {
                ...state,
                availableChallenges: action.payload,
            };
        }

        case ChallengeActionTypes.UPDATE_CHALLENGE_PROGRESS: {
            const updatedChallenges = state.availableChallenges.map((challenge) => {
                if (challenge.id === action.payload.id) {
                    return { ...challenge, progress: challenge.progress + action.payload.increment };
                }
                return challenge;
            });

            return {
                ...state,
                availableChallenges: updatedChallenges,
            };
        }

        case ChallengeActionTypes.ADD_CHALLENGE_SUCCESS: {
            const challenges = state.availableChallenges.concat(action.payload);
            return {
                ...state,
                availableChallenges: challenges,
            };
        }

        case ChallengeActionTypes.ADD_CHALLENGE_FAILED: {
            return state;
        }

        case ChallengeActionTypes.REMOVE_CHALLENGE_FAILED: {
            return state;
        }

        case ChallengeActionTypes.SAVE_CHALLENGES_FAILED: {
            return state;
        }

        case ChallengeActionTypes.SAVE_CHALLENGES_SUCCESS: {
            return state;
        }

        case ChallengeActionTypes.UPDATE_CHALLENGES_FAILED: {
            return state;
        }

        case ChallengeActionTypes.UPDATE_CHALLENGES_SUCCESS: {
            return {
                ...state,
                availableChallenges: action.payload,
            };
        }

        case ChallengeActionTypes.REMOVE_CHALLENGE_SUCCESS: {
            const updatedChallenges = state.availableChallenges.filter((challenge) => challenge.id !== action.payload);
            return {
                ...state,
                availableChallenges: updatedChallenges,
            };
        }

        default: {
            return state;
        }
    }
};
