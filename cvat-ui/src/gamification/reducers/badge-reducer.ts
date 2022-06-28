// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { BadgeActionTypes } from '../actions/badge-actions';
import { BadgeState } from '../gamif-interfaces';

/* const dummyBadge = {
    id: 0,
    title: '',
    instruction: 'Select a Badge to see details about it!',
    progress: 0,
    goal: 10,
    goalunit: '',
    got: true,
    receivedOn: null,
    visible: true,
}; */

const defaultState: BadgeState = {
    availableBadges: [{
        id: 0,
        title: '',
        instruction: '',
        progress: 0,
        goal: 0,
        goalunit: '',
        got: true,
        receivedOn: null,
        visible: true,
    }],
    selectedBadgeId: 0, // no selected badge at the start
    currentUserId: 0,
    loading: false,
};

export default (state = defaultState, action: AnyAction): BadgeState => {
    switch (action.type) {
        case BadgeActionTypes.SET_CURRENT_BADGE: {
            return {
                ...state,
                selectedBadgeId: action.payload,
            };
        }

        case BadgeActionTypes.SET_USER_PROFILE: {
            return {
                ...state,
                currentUserId: action.payload,
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

        case BadgeActionTypes.INCREMENT_BADGE_FAILED: {
            return state;
        }

        case BadgeActionTypes.INCREMENT_BADGE_SUCCESS: {
            // TODO: Maybe pull the ternary operator into the actions to ensure consistency with DB

            console.log('🚀 ~ file: badge-reducer.ts ~ line 72 ~ action.payload', action.payload);
            // TODO: Establish better structure in action.payload, super unelegant rn
            const updatedBadges = state.availableBadges.map(
                (_badge) => {
                    console.log('🚀 ~ file: badge-reducer.ts ~ line 76 ~ _badge', _badge);
                    if (_badge.id === action.payload.badge.id) {
                        if (action.payload.progress === action.payload.badge.goal) {
                            console.log('🚀 ~ file: badge-reducer.ts ~ line 78 ~ action.payload.progress === action.payload.badge.goal', action.payload.progress === action.payload.badge.goal);
                            return { ..._badge, progress: _badge.goal, got: true };
                        }
                        return { ..._badge, progress: action.payload.progress };
                    }
                    return _badge;
                },
            );

            return {
                ...state,
                availableBadges: updatedBadges,
            };
        }

        default: {
            return state;
        }
    }
};
