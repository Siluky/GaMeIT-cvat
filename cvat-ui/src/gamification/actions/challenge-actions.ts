// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
// import getCore from 'cvat-core-wrapper';

// const cvat = getCore();

export enum ChallengeActionTypes {
    // ADD_CHALLENGE = 'ADD_CHALLENGE',
    GET_CHALLENGES = 'GET_CHALLENGES',
}

export function getChallenges(): AnyAction {
    return {
        type: ChallengeActionTypes.GET_CHALLENGES,
    };
}
