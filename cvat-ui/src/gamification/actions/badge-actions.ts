// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
// import getCore from 'cvat-core-wrapper';
import { Badge } from '../gamif-interfaces';

// const cvat = getCore();

export enum BadgeActionTypes {
    LOAD_BADGES = 'LOAD_BADGES',
    SET_CURRENT_BADGE = 'SET_CURRENT_BADGE',
}

export async function loadBadges(badges: Badge[]): Promise<AnyAction> {
    /*
    try {
        badges = await cvat.badges.list();
    } catch (error) {
        // do something to handle the error
    } */

    return {
        type: BadgeActionTypes.LOAD_BADGES,
        payload: badges,
    };
}

export function setCurrentBadge(badge: Badge): AnyAction {
    return {
        type: BadgeActionTypes.SET_CURRENT_BADGE,
        payload: badge,

    };
}
