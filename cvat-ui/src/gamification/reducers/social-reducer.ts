// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { SocialActionTypes } from '../actions/social-actions';
import { SocialState } from '../gamif-interfaces';

const defaultState: SocialState = {
    id: 0,
};

export default (state = defaultState, action: AnyAction): SocialState => {
    switch (action.type) {
        case SocialActionTypes.GET_CHAT_HISTORY: {
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
