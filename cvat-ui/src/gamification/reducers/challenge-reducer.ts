// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { ChallengeActionTypes } from '../actions/challenge-actions';
import { ChallengeState } from '../gamif-interfaces';

const defaultState: ChallengeState = {
    availableChallenges: 0,
};

export default (state = defaultState, action: AnyAction): ChallengeState => {
    switch (action.type) {
        case ChallengeActionTypes.GET_CHALLENGES: {
            return {
                ...state,
                // TODO:
            };
        }

        default: {
            return state;
        }
    }
};
