// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { badges } from 'gamification/gamif-items';
import { BadgeActionTypes } from '../actions/badge-actions';
import { BadgeState, BadgeTier, EnergizerType } from '../gamif-interfaces';

const defaultState: BadgeState = {
    availableBadges: badges,
    selectedBadgeId: 0,
    badgesinProfile: [],
    currentUserId: 0,
    loading: false,
    energizerBadges: {
        quizBadge: 0,
        snakeBadge: 0,
        tetrisBadge: 0,
    },
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
            const newBadgesinProfile = state.badgesinProfile[0] === 0 ?
                [action.payload] : state.badgesinProfile.concat([action.payload]);
            return {
                ...state,
                badgesinProfile: newBadgesinProfile,
            };
        }

        case BadgeActionTypes.SAVE_SELECTED_BADGES_FAILED: {
            return state;
        }
        case BadgeActionTypes.SAVE_SELECTED_BADGES_SUCCESS: {
            return state;
        }
        case BadgeActionTypes.SAVE_BADGE_STATUS_FAILED: {
            return state;
        }
        case BadgeActionTypes.SAVE_BADGE_STATUS_SUCCESS: {
            return state;
        }

        case BadgeActionTypes.INIT_PROFILE_BADGES: {
            if (action.payload === 0) {
                return state;
            }
            return {
                ...state,
                badgesinProfile: action.payload,
            };
        }

        case BadgeActionTypes.REMOVE_BADGE_FROM_PROFILE: {
            const index = state.badgesinProfile.indexOf(action.payload);
            const newArray = state.badgesinProfile;
            newArray.splice(index, 1);
            return {
                ...state,
                badgesinProfile: newArray,
            };
        }

        case BadgeActionTypes.UPDATE_BADGE_TIERS_SUCCESS: {
            return {
                ...state,
                availableBadges: action.payload,
            };
        }

        case BadgeActionTypes.UPGRADE_BADGE_TIER: {
            const updatedBadges = state.availableBadges.map((badge) => {
                if (badge.id === action.payload) {
                    let newTier = BadgeTier.NOT_OBTAINED;
                    switch (badge.tier) {
                        case BadgeTier.NOT_OBTAINED: newTier = BadgeTier.BRONZE; break;
                        case BadgeTier.BRONZE: newTier = BadgeTier.SILVER; break;
                        case BadgeTier.SILVER: newTier = BadgeTier.GOLD; break;
                        case BadgeTier.GOLD: newTier = BadgeTier.GOLD; break;
                        default: break;
                    }
                    return { ...badge, tier: newTier };
                }
                return badge;
            });
            return {
                ...state,
                availableBadges: updatedBadges,
            };
        }

        case BadgeActionTypes.UPDATE_ENERGIZER_BADGE: {
            let energizerBadgeStatus = state.energizerBadges;

            // for each badge: Check whether it is obtained before updating the value --> avoid double obtain
            switch (action.payload) {
                case EnergizerType.QUIZ: {
                    if (state.availableBadges.find((badge) => badge.id === 104)?.tier !== BadgeTier.NOT_OBTAINED) {
                        break;
                    }
                    energizerBadgeStatus = { ...energizerBadgeStatus, quizBadge: 1 };
                    break;
                }
                case EnergizerType.SNAKE: {
                    if (state.availableBadges.find((badge) => badge.id === 105)?.tier !== BadgeTier.NOT_OBTAINED) {
                        break;
                    }
                    energizerBadgeStatus = { ...energizerBadgeStatus, snakeBadge: 1 };
                    break;
                }
                case EnergizerType.TETRIS: {
                    if (state.availableBadges.find((badge) => badge.id === 106)?.tier !== BadgeTier.NOT_OBTAINED) {
                        break;
                    }
                    energizerBadgeStatus = { ...energizerBadgeStatus, tetrisBadge: 1 };
                    break;
                }
                default: return state;
            }
            return {
                ...state,
                energizerBadges: energizerBadgeStatus,
            };
        }

        default: {
            return state;
        }
    }
};
