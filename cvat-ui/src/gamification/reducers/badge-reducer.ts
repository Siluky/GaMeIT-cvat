// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { BadgeActionTypes } from '../actions/badge-actions';
import { BadgeState } from '../gamif-interfaces';

const dummyBadge = {
    title: '',
    instruction: 'Select a Badge to see details about it!',
    progress: 0,
    goal: 10,
    goalunit: '',
    got: true,
    receivedOn: null,
    visible: true,
};

const defaultState: BadgeState = {
    availableBadges: [{
        title: '',
        instruction: '',
        progress: 0,
        goal: 0,
        goalunit: '',
        got: true,
        receivedOn: null,
        visible: true,
    }],
    selectedBadge: dummyBadge, // no selected badge at the start
    loading: false,
};

export default (state = defaultState, action: AnyAction): BadgeState => {
    switch (action.type) {
        case BadgeActionTypes.SET_CURRENT_BADGE: {
            return {
                ...state,
                selectedBadge: action.payload,
            };
        }

        case BadgeActionTypes.LOAD_BADGES_SUCCESS: {
            return {
                ...state,
                availableBadges: action.payload,
            };
        }

        case BadgeActionTypes.LOAD_BADGES_FAILED: {
            return state;
        }

        case BadgeActionTypes.INCREMENT_BADGE: {
            const { badge } = action.payload;
            // TODO: CHeck if goal reached!
            return {
                ...state,
                availableBadges: {
                    ...state.availableBadges,
                    [badge]: {
                        ...state.availableBadges[badge],
                        progress: state.availableBadges[badge].progress + 1,
                    },
                },
            };
        }

        default: {
            return state;
        }
    }
};
