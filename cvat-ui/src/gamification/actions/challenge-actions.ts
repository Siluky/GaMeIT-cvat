// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
/* eslint-disable import/no-cycle */

import { ActionCreator, AnyAction, Dispatch } from 'redux';
import getCore from 'cvat-core-wrapper';
import { ThunkAction } from 'redux-thunk';
import { availableChallenges } from 'gamification/gamif-items';
import { Challenge } from 'gamification/gamif-interfaces';
import { getCVATStore } from 'cvat-store';
import { updateBalance } from './shop-actions';
import { updateUserData } from './user-data-actions';

const cvat = getCore();

export enum ChallengeActionTypes {
    // TODO:
    GET_CHALLENGES_SUCCESS = 'GET_CHALLENGES_SUCCESS',
    GET_CHALLENGES_FAILED = 'GET_CHALLENGES_FAILED',

    ADD_CHALLENGE = 'ADD_CHALLENGE',
    ADD_CHALLENGE_FAILED = 'ADD_CHALLENGE_FAILED',
    ADD_CHALLENGE_SUCCESS = 'ADD_CHALLENGE_SUCCESS',
    UPDATE_CHALLENGE_PROGRESS = 'UPDATE_CHALLENGE_PROGRESS',

    SAVE_CHALLENGES_FAILED = 'SAVE_CHALLENGES_FAILED',
    SAVE_CHALLENGES_SUCCESS = 'SAVE_CHALLENGES_SUCCESS',

    REMOVE_CHALLENGE_SUCCESS = 'REMOVE_CHALLENGE_SUCCESS',
    REMOVE_CHALLENGE_FAILED = 'REMOVE_CHALLENGE_FAILED',
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
            challengesImport = await cvat.challenges.get();
            const challenges = challengesImport.map((chal: any): Challenge => {
                const challenge = availableChallenges.find((c) => c.id === chal.challengeId) ?? availableChallenges[0];

                return {
                    ...challenge,
                    initProgress: chal.progress,
                    progress: 0,
                    goal: chal.goal,
                    instruction: challenge.instruction.replace('GOAL', chal.goal.toString()),
                };
            });
            dispatch(getChallengesSuccess(challenges));
        } catch (error) {
            dispatch(getChallengesFailed(error));
        }
    };
}

export function saveChallengesSuccess(): AnyAction {
    return {
        type: ChallengeActionTypes.SAVE_CHALLENGES_SUCCESS,
    };
}

export function saveChallengesFailed(error: any): AnyAction {
    return {
        type: ChallengeActionTypes.SAVE_CHALLENGES_FAILED,
        payload: error,
    };
}

export function saveChallenges(): ThunkAction<void, {}, {}, AnyAction> {
    return async function saveChallengeThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        const state = getCVATStore().getState();
        const id = state.gamifuserdata.userId;
        const currentChallenges = state.challenges.availableChallenges;
        try {
            const challenges = currentChallenges.map((chal: Challenge) => ({
                userId: id,
                challengeId: chal.id,
                title: chal.instruction,
                goal: chal.goal,
                progress: chal.progress,
            }));

            await cvat.challenges.save(challenges);
            dispatch(saveChallengesSuccess);
        } catch (error) {
            dispatch(saveChallengesFailed(error));
        }
    };
}

export function addChallengeSuccess(): AnyAction {
    return {
        type: ChallengeActionTypes.ADD_CHALLENGE_SUCCESS,
    };
}

export function addChallengeFailed(error: any): AnyAction {
    return {
        type: ChallengeActionTypes.ADD_CHALLENGE_FAILED,
        payload: error,
    };
}

export function addChallenge(): ThunkAction<void, {}, {}, AnyAction> {
    return async function addChallengeThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        try {
            dispatch(addChallengeSuccess());
            dispatch(saveChallenges());
        } catch (error) {
            dispatch(addChallengeFailed(error));
        }
    };
}

export function updateChallengeProgress(id: number, increment: number): AnyAction {
    return {
        type: ChallengeActionTypes.UPDATE_CHALLENGE_PROGRESS,
        payload: { id, increment },
    };
}

export function removeChallengeSuccess(id: number): AnyAction {
    return {
        type: ChallengeActionTypes.REMOVE_CHALLENGE_SUCCESS,
        payload: id,
    };
}

export function removeChallengeFailed(error: any): AnyAction {
    return {
        type: ChallengeActionTypes.REMOVE_CHALLENGE_FAILED,
        payload: error,
    };
}

export function completeChallenge(challenge: Challenge): ThunkAction<void, {}, {}, AnyAction> {
    return async function addChallengeThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        const { userId } = getCVATStore().getState().gamifuserdata;
        try {
            await cvat.challenges.remove(userId, challenge.id);
            dispatch(updateBalance(challenge.reward));
            dispatch(updateUserData('annotation_coins_obtained', challenge.reward));
            dispatch(removeChallengeSuccess(challenge.id));
        } catch (error) {
            dispatch(removeChallengeFailed(error));
        }
    };
}
