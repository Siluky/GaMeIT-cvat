// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
/* eslint-disable import/no-cycle */

import { ActionCreator, AnyAction, Dispatch } from 'redux';
import getCore from 'cvat-core-wrapper';
import { ThunkAction } from 'redux-thunk';
import { availableChallenges, getChallengeValue } from 'gamification/gamif-items';
import { Challenge } from 'gamification/gamif-interfaces';
import { getCVATStore } from 'cvat-store';
import { notification } from 'antd';
import { updateBalance } from './shop-actions';
import { addGamifLog, updateUserData } from './user-data-actions';

const cvat = getCore();

export enum ChallengeActionTypes {
    GET_CHALLENGES_SUCCESS = 'GET_CHALLENGES_SUCCESS',
    GET_CHALLENGES_FAILED = 'GET_CHALLENGES_FAILED',

    ADD_CHALLENGE = 'ADD_CHALLENGE',
    ADD_CHALLENGE_FAILED = 'ADD_CHALLENGE_FAILED',
    ADD_CHALLENGE_SUCCESS = 'ADD_CHALLENGE_SUCCESS',
    UPDATE_CHALLENGE_PROGRESS = 'UPDATE_CHALLENGE_PROGRESS',

    UPDATE_CHALLENGES_SUCCESS = 'UPDATE_CHALLENGES_SUCCESS',
    UPDATE_CHALLENGES_FAILED = 'UPDATE_CHALLENGES_FAILED',

    SAVE_CHALLENGES_FAILED = 'SAVE_CHALLENGES_FAILED',
    SAVE_CHALLENGES_SUCCESS = 'SAVE_CHALLENGES_SUCCESS',

    REMOVE_CHALLENGE_SUCCESS = 'REMOVE_CHALLENGE_SUCCESS',
    REMOVE_CHALLENGE_FAILED = 'REMOVE_CHALLENGE_FAILED',
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
        console.log('🚀 ~ saveChallengeThunk ~ currentChallenges:', currentChallenges);
        try {
            const challenges = currentChallenges.map((chal: Challenge) => ({
                userId: id,
                challengeId: chal.id,
                title: chal.instruction,
                goal: chal.goal,
                progress: chal.progress,
                reward: chal.reward,
            }));

            await cvat.challenges.save(challenges);
            dispatch(saveChallengesSuccess);
        } catch (error) {
            dispatch(saveChallengesFailed(error));
        }
    };
}

export function addChallengeSuccess(chal: Challenge): AnyAction {
    return {
        type: ChallengeActionTypes.ADD_CHALLENGE_SUCCESS,
        payload: chal,
    };
}

export function addChallengeFailed(error: any): AnyAction {
    return {
        type: ChallengeActionTypes.ADD_CHALLENGE_FAILED,
        payload: error,
    };
}

const formatInstruction = (challenge: Challenge, actualGoal?: number): string => {
    const relevantGoal = actualGoal || challenge.goal;
    if (challenge.id === 2 || challenge.id === 3) {
        return challenge.instruction.replace('GOAL', (Math.round(relevantGoal / 60)).toString());
    } return challenge.instruction.replace('GOAL', relevantGoal.toString());
};

export function addChallenge(challengeID?: number): ThunkAction<void, {}, {}, AnyAction> {
    return (dispatch) => {
        try {
            if (challengeID) {
                console.log('Given a specific challenge ID.');
                // challenge ID is given, activating this challenge
                // eslint-disable-next-line max-len
                const newChallenge = availableChallenges.find((chal) => chal.id === challengeID) ?? availableChallenges[0];

                // randomize goal and reward by same factor
                const randomFactor = Math.random();
                // eslint-disable-next-line max-len
                const goalAdjusted = Math.max(1, Math.floor((newChallenge.goal + (randomFactor * newChallenge.goal_variance)) / 5) * 5);
                // eslint-disable-next-line max-len
                const rewardAdjusted = Math.round((newChallenge.reward + (randomFactor * newChallenge.reward_variance)) / 5) * 5;

                const newChal: Challenge = {
                    ...newChallenge,
                    goal: goalAdjusted,
                    reward: rewardAdjusted,
                    baselineValue: getChallengeValue(newChallenge.id),
                    progress: 0,
                };
                dispatch(addChallengeSuccess(
                    { ...newChal, instruction: formatInstruction(newChal) },
                ));
                dispatch(saveChallenges());
            } else {
                const state = getCVATStore().getState();
                const challenges = state.challenges.availableChallenges;

                if (challenges.length >= 3) {
                    dispatch(addChallengeFailed('You already have 3 challenges'));
                } else {
                    // Brute force pick a new, not already existing challenge
                    const existingIds = challenges.map((chal: Challenge) => chal.id);
                    let idExists = true;
                    let newId = 0;
                    while (idExists) {
                        newId = Math.floor(Math.random() * (availableChallenges.length + 1));
                        idExists = existingIds.includes(newId);
                    }

                    // eslint-disable-next-line max-len
                    const newChallenge = availableChallenges.find((chal) => chal.id === newId) ?? availableChallenges[0];

                    // randomize goal and reward by same factor
                    const randomFactor = Math.random();
                    // eslint-disable-next-line max-len
                    const goalAdjusted = Math.max(1, Math.floor((newChallenge.goal + (randomFactor * newChallenge.goal_variance)) / 5) * 5);
                    // eslint-disable-next-line max-len
                    const rewardAdjusted = Math.round((newChallenge.reward + (randomFactor * newChallenge.reward_variance)) / 5) * 5;

                    const newChal: Challenge = {
                        ...newChallenge,
                        goal: goalAdjusted,
                        reward: rewardAdjusted,
                        baselineValue: getChallengeValue(newChallenge.id),
                        progress: 0,
                    };
                    dispatch(addChallengeSuccess(
                        { ...newChal, instruction: formatInstruction(newChal) },
                    ));
                    dispatch(saveChallenges());
                }
            }
        } catch (error) {
            dispatch(addChallengeFailed(error));
        }
    };
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

export function getChallengesAsync(newDay?: boolean): ThunkAction<void, {}, {}, AnyAction> {
    return async function getChallengesThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        let challengesImport = null;
        try {
            challengesImport = await cvat.challenges.get();
            const challenges = challengesImport.map((chal: any): Challenge => {
                const challenge = availableChallenges.find((c) => c.id === chal.challengeId) ?? availableChallenges[0];

                return {
                    ...challenge,
                    importedProgress: chal.progress,
                    baselineValue: getChallengeValue(chal.id),
                    progress: 0,
                    goal: chal.goal,
                    reward: chal.reward,
                    instruction: formatInstruction(challenge, chal.goal),
                };
            });
            dispatch(getChallengesSuccess(challenges));
            if (challenges.length < 3 && newDay) { dispatch(addChallenge()); }
        } catch (error) {
            dispatch(getChallengesFailed(error));
        }
    };
}

export function updateChallengeSuccess(challenges: Challenge[]): AnyAction {
    return {
        type: ChallengeActionTypes.UPDATE_CHALLENGES_SUCCESS,
        payload: challenges,
    };
}

export function updateChallengeFailed(error: any): AnyAction {
    return {
        type: ChallengeActionTypes.UPDATE_CHALLENGES_FAILED,
        payload: error,
    };
}

export function updateChallenges(): ThunkAction<void, {}, {}, AnyAction> {
    return (dispatch) => {
        const state = getCVATStore().getState();
        const challenges = state.challenges.availableChallenges;
        // const userDataState = state.gamifuserdata;

        try {
            const updatedChallenges = challenges.map((challenge: Challenge) => {
                const updatedProgress = challenge.importedProgress + (
                    getChallengeValue(challenge.id) - challenge.baselineValue);

                return {
                    ...challenge,
                    progress: updatedProgress,
                };
            });
            dispatch(updateChallengeSuccess(updatedChallenges));
            // dispatch(saveChallenges());
        } catch (error) {
            dispatch(updateChallengeFailed(error));
        }
    };
}

// DEBUGGING ONLY
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
    return async function completeChallengeThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        const { userId } = getCVATStore().getState().gamifuserdata;
        try {
            await cvat.challenges.remove(userId, challenge.id);
            dispatch(addGamifLog(`Challenge completed: ${challenge.id}`));
            dispatch(updateBalance(challenge.reward));
            dispatch(updateUserData('annotation_coins_obtained', challenge.reward));
            dispatch(removeChallengeSuccess(challenge.id));
            // eslint-disable-next-line security/detect-non-literal-fs-filename
            notification.open({
                message: 'Challenge Completed!',
                description: `You obtained ${challenge.reward} coins for completing the challenge:
                "${challenge.instruction}"!`,
            });
        } catch (error) {
            dispatch(removeChallengeFailed(error));
        }
    };
}
