// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { ActionCreator, AnyAction, Dispatch } from 'redux';
import getCore from 'cvat-core-wrapper';
import { ThunkAction } from 'redux-thunk';
import { Badge } from '../gamif-interfaces';

const cvat = getCore();

export enum BadgeActionTypes {
    LOAD_BADGES = 'LOAD_BADGES',
    LOAD_BADGES_FAILED = 'LOAD_BADGES_FAILED',
    LOAD_BADGES_SUCCESS = 'LOAD_BADGES_SUCCESS',
    SET_CURRENT_BADGE = 'SET_CURRENT_BADGE',
    INCREMENT_BADGE = 'INCREMENT_BADGE',
    SAVE_BADGES = 'SAVE_BADGES',
}

function loadBadgesFailed(error: any): AnyAction {
    const action = {
        type: BadgeActionTypes.LOAD_BADGES_FAILED,
        payload: { error },
    };
    return action;
}

function loadBadgesSuccess(badges: any[]): AnyAction {
    console.log('LOAD_BADGES_SUCCESS should be dispatched now with data: ');
    console.log(badges);

    const action = {
        type: BadgeActionTypes.LOAD_BADGES_SUCCESS,
        payload: badges,
    };
    return action;
}

export function loadBadgesAsync(): ThunkAction<void, {}, {}, AnyAction> {
    return async function loadBadgesThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        let allBadges = null;
        try {
            allBadges = await cvat.badges.getStatus();
        } catch (error) {
            dispatch(loadBadgesFailed(error));
        }

        dispatch(loadBadgesSuccess(allBadges));
    };
}

export function incrementBadge(badge: Badge): AnyAction {
    return {
        type: BadgeActionTypes.INCREMENT_BADGE,
        payload: badge,
    };
}

export function saveBadges(): AnyAction {
    // TODO:

    return {
        type: BadgeActionTypes.SAVE_BADGES,
        payload: { },
    };
}

export function setCurrentBadge(badge: Badge): AnyAction {
    return {
        type: BadgeActionTypes.SET_CURRENT_BADGE,
        payload: badge,

    };
}
