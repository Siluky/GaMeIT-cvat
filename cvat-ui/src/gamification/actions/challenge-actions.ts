// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
// import getCore from 'cvat-core-wrapper';

// const cvat = getCore();

export enum ChallengeActionTypes {
    // TODO:
    GET_CHALLENGES = 'GET_CHALLENGES',
    ADD_CHALLENGE = 'ADD_CHALLENGE',
    UPDATE_CHALLENGE = 'UPDATE_CHALLENGE',
    COMPLETE_CHALLENGE = 'COMPLETE_CHALLENGE',
}

/**  Load the currently active challenges of a user */
export function getChallenges(): AnyAction {
    return {
        type: ChallengeActionTypes.GET_CHALLENGES,
    };
}
