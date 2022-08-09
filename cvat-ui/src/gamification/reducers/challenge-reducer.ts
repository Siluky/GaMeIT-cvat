// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { ChallengeActionTypes } from '../actions/challenge-actions';
import { ChallengeState, ChallengeType, Challenge } from '../gamif-interfaces';

const testChallenge1: Challenge = {
    id: 1,
    instruction: 'Annotate 10 images',
    progress: 5,
    goal: 10,
    reward: 100,
    challengeType: ChallengeType.DAILY,
};

const testChallenge2: Challenge = {
    id: 2,
    instruction: 'Finish one job',
    progress: 0,
    goal: 10,
    reward: 100,
    challengeType: ChallengeType.DAILY,
};

const testChallenge3: Challenge = {
    id: 3,
    instruction: 'Annotate 5 images in one session',
    progress: 3,
    goal: 5,
    reward: 60,
    challengeType: ChallengeType.DAILY,
};

const defaultState: ChallengeState = {
    availableChallenges: [testChallenge1, testChallenge2, testChallenge3],
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

        case ChallengeActionTypes.REMOVE_CHALLENGE: {
            const updatedChallenges = state.availableChallenges.filter((challenge) => challenge.id !== action.payload);
            console.log('🚀 ~ file: challenge-reducer.ts ~ line 57 ~ updatedChallenges', updatedChallenges);
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
