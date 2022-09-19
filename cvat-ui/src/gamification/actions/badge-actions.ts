// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { ActionCreator, AnyAction, Dispatch } from 'redux';
import getCore from 'cvat-core-wrapper';
import { getCVATStore } from 'cvat-store';
import { ThunkAction } from 'redux-thunk';
import { mapBadgeIdtoField } from 'gamification/gamif-items';
import { Badge, BadgeTier } from '../gamif-interfaces';

const cvat = getCore();

export enum BadgeActionTypes {
    LOAD_BADGES = 'LOAD_BADGES',
    SET_USER_PROFILE = 'SET_USER_PROFILE',
    LOAD_BADGES_FAILED = 'LOAD_BADGES_FAILED',
    LOAD_BADGES_SUCCESS = 'LOAD_BADGES_SUCCESS',
    SET_CURRENT_BADGE = 'SET_CURRENT_BADGE',
    INCREMENT_BADGE_SUCCESS = 'INCREMENT_BADGE_SUCCESS',
    INCREMENT_BADGE_FAILED = 'INCREMENT_BADGE_FAILED',
    SAVE_BADGES = 'SAVE_BADGES',
    ADD_BADGE_TO_PROFILE_SUCCESS = 'ADD_BADGE_TO_PROFILE_SUCCESS',
    ADD_BADGE_TO_PROFILE_FAILED = 'ADD_BADGE_TO_PROFILE_FAILED',
    REMOVE_BADGE_FROM_PROFILE = 'REMOVE_BADGE_FROM_PROFILE',
    UPDATE_BADGE_TIERS = 'UPDATE_BADGE_TIERS',
}

function setCurrentUserProfileId(id: number): AnyAction {
    const action = {
        type: BadgeActionTypes.SET_USER_PROFILE,
        payload: id,
    };
    return action;
}

/** Dispatched when loading of badges failed */
function loadBadgesFailed(error: any): AnyAction {
    const action = {
        type: BadgeActionTypes.LOAD_BADGES_FAILED,
        payload: { error },
    };
    return action;
}

/** Dispatched when loading of badges succeeded */
function loadBadgesSuccess(badges: any[]): AnyAction {
    const action = {
        type: BadgeActionTypes.LOAD_BADGES_SUCCESS,
        payload: badges,
    };
    return action;
}

/** Try to load badges from database
 * @async
 * @returns a list of badges or an error
*/
export function loadBadgesAsync(): ThunkAction<void, {}, {}, AnyAction> {
    return async function loadBadgesThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        let allBadgesImport = null;
        let allBadges = null;

        try {
            allBadgesImport = await cvat.badges.getStatus();
            console.log('🚀 ~ file: badge-actions.ts ~ line 51 ~ loadBadgesThunk ~ allBadgesImport', allBadgesImport);

            const currentUserProfileId = allBadgesImport[0].userProfile;

            allBadges = allBadgesImport.map((_badge: any): Badge => ({
                id: _badge.badge.id,
                title: _badge.badge.title,
                instruction: _badge.badge.instruction,
                goal: _badge.badge.goal,
                visible: _badge.badge.visible,
                tier: BadgeTier.NOT_OBTAINED,
                goalunit: _badge.badge.goalunit,
                // extra attributes of BadgeStatus relationship
                progress: _badge.progress,
                receivedOn: _badge.receivedOn,
            }));
            dispatch(setCurrentUserProfileId(currentUserProfileId));
            dispatch(loadBadgesSuccess(allBadges));
        } catch (error) {
            dispatch(loadBadgesFailed(error));
        }
    };
}

/** Dispatched when incrementing badge succeeded */
function incrementBadgeSuccess(badge: Badge): AnyAction {
    const action = {
        type: BadgeActionTypes.INCREMENT_BADGE_SUCCESS,
        payload: badge,
    };
    return action;
}

/** Dispatched when incrementing badge failed */
function incrementBadgeFailed(error: any): AnyAction {
    const action = {
        type: BadgeActionTypes.INCREMENT_BADGE_FAILED,
        payload: { error },
    };
    return action;
}

/** Increment the current value of a badge that belongs to the current user
 * @param userId: The id of the current user
 * @param badge: The badge to increment
 * @param increment: The amount by which to increment the badge
 */
export function incrementBadge(userId: number, badge: Badge, increment: number): ThunkAction<void, {}, {}, AnyAction> {
    return async function loadBadgesThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        try {
            const updatedBadge = await cvat.badges.save(userId, badge.id, badge.progress + increment);

            console.log('🚀 ~ file: badge-actions.ts ~ line 73 ~ incrementBadge ~ updatedBadge', updatedBadge);

            dispatch(incrementBadgeSuccess(updatedBadge));
        } catch (error) {
            dispatch(incrementBadgeFailed(error));
        }
    };
}

/** Save badges to database */
export function saveBadges(): AnyAction {
    // TODO:

    return {
        type: BadgeActionTypes.SAVE_BADGES,
        payload: { },
    };
}

/** Set the currently selected badge to show in detail view */
export function setCurrentBadge(badgeId: number): AnyAction {
    return {
        type: BadgeActionTypes.SET_CURRENT_BADGE,
        payload: badgeId,

    };
}

export function addBadgetoProfileSuccess(badgeId: number): AnyAction {
    return {
        type: BadgeActionTypes.ADD_BADGE_TO_PROFILE_SUCCESS,
        payload: badgeId,
    };
}

export function addBadgetoProfileFailed(): AnyAction {
    return {
        type: BadgeActionTypes.ADD_BADGE_TO_PROFILE_FAILED,
        payload: { },

    };
}

export function removeBadgefromProfile(badgeId: number): AnyAction {
    return {
        type: BadgeActionTypes.REMOVE_BADGE_FROM_PROFILE,
        payload: badgeId,
    };
}

export function toggleBadgeInProfile(badgeId: number): ThunkAction<void, {}, {}, AnyAction> {
    const badgeState = getCVATStore().getState().badges;
    const found = badgeState.badgesinProfile.find((el: number) => el === badgeId);

    return (dispatch) => {
        if (found) {
            console.log('Badge found in Profile!');
            dispatch(removeBadgefromProfile(badgeId));
        } else if (badgeState.badgesinProfile.length >= 3) {
            console.log('Badge Profile already contains 3 badges!');
            dispatch(addBadgetoProfileFailed());
        } else {
            console.log('Adding badge to Profile');
            dispatch(addBadgetoProfileSuccess(badgeId));
        }
    };
}

export function updateBadges(badges: Badge[]): AnyAction {
    const userDataState = getCVATStore().getState().gamifuserdata.userdata_total;

    const updatedBadges = badges.map((badge: Badge) => {
        let updatedTier = BadgeTier.NOT_OBTAINED;
        const updatedProgress = userDataState[mapBadgeIdtoField(badge.id)];
        if (updatedProgress >= badge.goal) {
            updatedTier = BadgeTier.GOLD;
        } else if (badge.goal_silver && updatedProgress >= badge.goal_silver) {
            updatedTier = BadgeTier.SILVER;
        } else if (badge.goal_bronze && updatedProgress >= badge.goal_bronze) { updatedTier = BadgeTier.BRONZE; }

        // switch visibility to true if badge is obtained,
        // otherwise preserve its inert visibility (i.e., don't reveal hidden badges)
        const updatedVisible = updatedTier === BadgeTier.NOT_OBTAINED ? badge.visible : true;
        const updatedBadge = {
            ...badge, tier: updatedTier, progress: updatedProgress, visible: updatedVisible,
        };
        return updatedBadge;
    });

    return {
        type: BadgeActionTypes.UPDATE_BADGE_TIERS,
        payload: updatedBadges,
    };
}
