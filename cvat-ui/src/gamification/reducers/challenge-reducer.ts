// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { availableChallenges } from 'gamification/gamif-items';
import { AnyAction } from 'redux';
import { ChallengeActionTypes } from '../actions/challenge-actions';
import { ChallengeState } from '../gamif-interfaces';

const defaultState: ChallengeState = {
    availableChallenges: [],
};

export default (state = defaultState, action: AnyAction): ChallengeState => {
    switch (action.type) {
        case ChallengeActionTypes.GET_CHALLENGES_FAILED: {
            return {
                ...state,
            };
        }

        case ChallengeActionTypes.GET_CHALLENGES_SUCCESS: {
            return {
                ...state,
                availableChallenges: action.payload,
            };
        }

        case ChallengeActionTypes.UPDATE_CHALLENGE_PROGRESS: {
            const updatedChallenges = state.availableChallenges.map((challenge) => {
                if (challenge.id === action.payload.id) {
                    return { ...challenge, progress: challenge.progress + action.payload.increment };
                }
                return challenge;
            });

            return {
                ...state,
                availableChallenges: updatedChallenges,
            };
        }

        case ChallengeActionTypes.ADD_CHALLENGE_SUCCESS: {
            // Pick a new, not already existing challenge
            const existingIds = state.availableChallenges.map((chal) => chal.id);
            let idExists = true;
            let newId = 0;
            while (idExists) {
                newId = Math.floor(Math.random() * availableChallenges.length);
                console.log('🚀 ~ file: challenge-reducer.ts ~ line 77 ~ newId', newId);
                idExists = existingIds.includes(newId);
                console.log('🚀 ~ file: challenge-reducer.ts ~ line 78 ~ idExists', idExists);
            }

            const newChallenge = availableChallenges.find((chal) => chal.id === newId) ?? availableChallenges[0];
            console.log('🚀 ~ file: challenge-reducer.ts ~ line 83 ~ newChallenge', newChallenge);

            // randomize goal and reward by same factor
            const randomFactor = Math.random();
            const goalAdjusted = Math.floor(newChallenge.goal + (randomFactor * newChallenge.goal_variance));
            // eslint-disable-next-line max-len
            const rewardAdjusted = Math.round((newChallenge.reward + (randomFactor * newChallenge.reward_variance)) / 5) * 5;

            const newChal = {
                ...newChallenge,
                goal: goalAdjusted,
                reward: rewardAdjusted,
                instruction: newChallenge.instruction.replace('GOAL', goalAdjusted.toString()),
                progress: 0,
            };
            console.log('🚀 ~ file: challenge-actions.ts ~ line 107 ~ addChallengeThunk ~ newChal', newChal);

            const challenges = state.availableChallenges.concat(newChal);
            return {
                ...state,
                availableChallenges: challenges,
            };
        }

        case ChallengeActionTypes.ADD_CHALLENGE_FAILED: {
            return state;
        }

        case ChallengeActionTypes.REMOVE_CHALLENGE_FAILED: {
            return state;
        }

        case ChallengeActionTypes.SAVE_CHALLENGES_FAILED: {
            return state;
        }

        case ChallengeActionTypes.SAVE_CHALLENGES_SUCCESS: {
            return state;
        }

        case ChallengeActionTypes.REMOVE_CHALLENGE_SUCCESS: {
            const updatedChallenges = state.availableChallenges.filter((challenge) => challenge.id !== action.payload);
            console.log('🚀 ~ file: challenge-reducer.ts ~ line 57 ~ updatedChallenges', updatedChallenges);
            return {
                ...state,
                availableChallenges: updatedChallenges,
            };
        }

        default: {
            return state;
        }
    }
};
