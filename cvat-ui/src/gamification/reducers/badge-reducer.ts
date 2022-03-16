// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { BadgeActionTypes } from '../actions/badge-actions';
import { Badge, BadgeState } from '../gamif-interfaces';

const dummyBadge = {
    title: '',
    instruction: 'Default selected badge',
    progress: 0,
    goal: 10,
    goalunit: '',
    got: true,
};

const testBadges: Badge[] = [];

for (let i = 0; i < 10; i++) {
    let ttl = 'Badge ';

    testBadges.push({
        title: ttl += i,
        instruction: 'Annotate 5 livers',
        progress: i,
        goal: i + 1,
        goalunit: 'Livers',
        got: true,
    });
}

const defaultState: BadgeState = {
    availableBadges: testBadges,
    selectedBadge: dummyBadge, // no selected badge at the start
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
