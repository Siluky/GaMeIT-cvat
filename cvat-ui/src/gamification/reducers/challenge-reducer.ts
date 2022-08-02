// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { ChallengeActionTypes } from '../actions/challenge-actions';
import { ChallengeState, ChallengeType, Challenge } from '../gamif-interfaces';

const testChallenge1: Challenge = {
    instruction: 'Annotate 10 images',
    progress: 5,
    goal: 10,
    reward: 100,
    challengeType: ChallengeType.DAILY,
};

const testChallenge2: Challenge = {
    instruction: 'Finish one job',
    progress: 0,
    goal: 10,
    reward: 100,
    challengeType: ChallengeType.DAILY,
};

const testChallenge3: Challenge = {
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

        default: {
            return state;
        }
    }
};
