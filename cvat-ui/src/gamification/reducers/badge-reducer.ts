// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { BadgeActionTypes } from '../actions/badge-actions';
import { BadgeState } from '../gamif-interfaces';

const defaultState: BadgeState = {
    availableBadges: [{
        title: 'Badge 1',
        instruction: 'Annotate 5 livers',
        progress: 5,
        goal: 5,
        goalunit: 'Livers',
        got: true,
    }, {
        title: 'Badge 2',
        instruction: 'Annotate ten images',
        progress: 1,
        goal: 10,
        goalunit: 'Images',
        got: false,
    }],
    selectedBadge: {
        title: '',
        instruction: 'Default selected badge',
        progress: 0,
        goal: 10,
        goalunit: '',
        got: true,
    }, // no selected badge at the start
};

export default (state = defaultState, action: AnyAction): BadgeState => {
    switch (action.type) {
        case BadgeActionTypes.SET_CURRENT_BADGE: {
            return {
                ...state,
                selectedBadge: action.payload,
            };
        }

        case BadgeActionTypes.SET_BADGES: {
            return {
                ...state,
                availableBadges: action.payload,
                // TODO:
            };
        }
        default: {
            return state;
        }
    }
};
