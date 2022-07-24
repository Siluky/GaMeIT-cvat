// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { ChallengeActionTypes } from '../actions/challenge-actions';
import { ChallengeState, ChallengeType, Challenge } from '../gamif-interfaces';

const testChallenge1: Challenge = {
    instruction: 'Annotate 5 images in a row',
    progress: 1,
    goal: 5,
    reward: 1000,
    challengeType: ChallengeType.DAILY,
};

const testChallenge2: Challenge = {
    instruction: 'Do something fun',
    progress: 0,
    goal: 100,
    reward: 222,
    challengeType: ChallengeType.DAILY,
};

const testChallenge3: Challenge = {
    instruction: 'Annotate 10 images in a row',
    progress: 7,
    goal: 10,
    reward: 10000,
    challengeType: ChallengeType.WEEKLY,
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
