// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { ActionCreator, AnyAction, Dispatch } from 'redux';
import getCore from 'cvat-core-wrapper';
import { ThunkAction } from 'redux-thunk';
import { Challenge } from 'gamification/gamif-interfaces';
import { updateBalance } from './shop-actions';

const cvat = getCore();

export enum ChallengeActionTypes {
    // TODO:
    GET_CHALLENGES_SUCCESS = 'GET_CHALLENGES_SUCCESS',
    GET_CHALLENGES_FAILED = 'GET_CHALLENGES_FAILED',

    ADD_CHALLENGE = 'ADD_CHALLENGE',
    UPDATE_CHALLENGE_PROGRESS = 'UPDATE_CHALLENGE_PROGRESS',
    REMOVE_CHALLENGE = 'REMOVE_CHALLENGE',
}

export function getChallengesSuccess(challenges: Challenge[]): AnyAction {
    return {
        type: ChallengeActionTypes.GET_CHALLENGES_SUCCESS,
        payload: challenges,
    };
}

export function getChallengesFailed(error: any): AnyAction {
    return {
        type: ChallengeActionTypes.GET_CHALLENGES_FAILED,
        payload: error,
    };
}

export function getChallengesAsync(): ThunkAction<void, {}, {}, AnyAction> {
    return async function getChallengesThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        let challengesImport = null;
        try {
            challengesImport = await cvat.challenges.get(); // TODO: Not implemented yet!
            dispatch(getChallengesSuccess(challengesImport));
        } catch (error) {
            dispatch(getChallengesFailed(error));
        }
    };
}

// export function addChallenge(): AnyAction {}

export function updateChallengeProgress(id: number, increment: number): AnyAction {
    return {
        type: ChallengeActionTypes.UPDATE_CHALLENGE_PROGRESS,
        payload: { id, increment },
    };
}

export function removeChallenge(id: number): AnyAction {
    return {
        type: ChallengeActionTypes.REMOVE_CHALLENGE,
        payload: id,
    };
}

export function completeChallenge(challenge: Challenge): ThunkAction<void, {}, {}, AnyAction> {
    return (dispatch) => {
        dispatch(updateBalance(challenge.reward));
        dispatch(removeChallenge(challenge.id));
    };
}
