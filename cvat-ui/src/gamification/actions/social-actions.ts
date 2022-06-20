// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
// import getCore from 'cvat-core-wrapper';

// const cvat = getCore();

export enum SocialActionTypes {
    GET_CHAT_HISTORY = 'GET_CHAT_HISTORY',
}

export function getChallenges(): AnyAction {
    return {
        type: SocialActionTypes.GET_CHAT_HISTORY,
    };
}
