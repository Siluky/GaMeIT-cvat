// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { badges } from 'gamification/gamif-items';
import { BadgeActionTypes } from '../actions/badge-actions';
import { BadgeState } from '../gamif-interfaces';

const defaultState: BadgeState = {
    availableBadges: badges,
    selectedBadgeId: 0,
    badgesinProfile: [1],
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
            // TODO: Establish better structure in action.payload, super unelegant rn
            const updatedBadges = state.availableBadges.map(
                (_badge) => {
                    if (_badge.id === action.payload.badge.id) {
                        if (action.payload.progress === action.payload.badge.goal) {
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

        case BadgeActionTypes.ADD_BADGE_TO_PROFILE_FAILED: {
            return state;
        }

        case BadgeActionTypes.ADD_BADGE_TO_PROFILE_SUCCESS: {
            const newBadgesinProfile = state.badgesinProfile.concat([action.payload]);
            return {
                ...state,
                badgesinProfile: newBadgesinProfile,
            };
        }

        case BadgeActionTypes.REMOVE_BADGE_FROM_PROFILE: {
            const index = state.badgesinProfile.indexOf(action.payload);
            console.log('🚀 ~ file: badge-reducer.ts ~ line 107 ~ state.badgesinProfile', state.badgesinProfile);
            console.log('🚀 ~ file: badge-reducer.ts ~ line 109 ~ index', index);
            const newArray = state.badgesinProfile;
            newArray.splice(index, 1);
            console.log('🚀 ~ file: badge-reducer.ts ~ line 107 ~ newArray', newArray);
            return {
                ...state,
                badgesinProfile: newArray,
            };
        }

        case BadgeActionTypes.UPDATE_BADGE_TIERS: {
            return {
                ...state,
                availableBadges: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};
