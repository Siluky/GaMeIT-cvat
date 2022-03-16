// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { Badge } from '../gamif-interfaces';

// TODO: const cvat = getCore() -- necessary?

export enum BadgeActionTypes {
    SET_BADGES = 'SET_BADGES',
    SET_CURRENT_BADGE = 'SET_CURRENT_BADGE',
}

export function setBadges(badges: Badge[]): AnyAction {
    return {
        type: BadgeActionTypes.SET_BADGES,
        payload: badges,
    };
}

export function setCurrentBadge(badge: Badge): AnyAction {
    return {
        type: BadgeActionTypes.SET_CURRENT_BADGE,
        payload: badge,

    };
}
