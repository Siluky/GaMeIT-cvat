// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { ActionCreator, AnyAction, Dispatch } from 'redux';
import getCore from 'cvat-core-wrapper';
import { ThunkAction } from 'redux-thunk';
import { EnergizerType, LeaderboardEntry } from 'gamification/gamif-interfaces';
import gamifconsts from 'gamification/gamifconsts';
import { getCVATStore } from 'cvat-store';
// eslint-disable-next-line import/no-cycle
import { updateUserData } from './user-data-actions';

const cvat = getCore();

export enum EnergizerActionTypes {
    SWITCH_ENERGIZER = 'SWITCH_ENERGIZER',
    INCREMENT_ENERGY = 'INCREMENT_ENERGY',
    SWITCH_ENERGIZER_POPUP = 'SWITCH_ENERGIZER_POPUP',
    SET_ACTIVE_ENERGIZER = 'SET_CURRENT_ENERGIZER',

    // GET_QUIZDUEL_QUESTIONS_ASYNC = 'GET_QUIZ_DUEL_QUESTIONS_ASYNC',
    // GET_QUIZDUEL_QUESTIONS_SUCCESS = 'GET_QUIZ_DUEL_QUESTIONS_SUCCESS',
    // GET_QUIZDUEL_QUESTIONS_FAILED = 'GET_QUIZ_DUEL_QUESTIONS_FAILED',

    SET_LATEST_ENTRY = 'SET_LATEST_ENTRY',

    GET_CURRENT_ENERGY_FAILED = 'GET_CURRENT_ENERGY_FAILED ',
    GET_CURRENT_ENERGY_SUCCESS = 'GET_CURRENT_ENERGY_SUCCESS',
    SAVE_CURRENT_ENERGY_FAILED = 'SAVE_CURRENT_ENERGY_FAILED ',
    SAVE_CURRENT_ENERGY_SUCCESS = 'SAVE_CURRENT_ENERGY_SUCCESS',

    SWITCH_ENERGIZER_LEADERBOARD = 'SWITCH_ENERGIZER_LEADERBOARD',
    GET_LEADERBOARD_DATA_SUCCESS = 'GET_LEADERBOARD_DATA_SUCCESS',
    GET_LEADERBOARD_DATA_FAILED = 'GET_LEADERBOARD_DATA_FAILED',
    ADD_LEADERBOARD_ENTRY_SUCCESS = 'ADD_LEADERBOARD_ENTRY_SUCCESS',
    ADD_LEADERBOARD_ENTRY_FAILED = 'ADD_LEADERBOARD_ENTRY_FAILED',

}

function getCurrentEnergySuccess(energy: number): AnyAction {
    const action = {
        type: EnergizerActionTypes.GET_CURRENT_ENERGY_SUCCESS,
        payload: energy,
    };
    return action;
}

function getCurrentEnergyFailed(error: any): AnyAction {
    const action = {
        type: EnergizerActionTypes.GET_CURRENT_ENERGY_FAILED,
        payload: { error },
    };
    return action;
}

export function getCurrentEnergyAsync(): ThunkAction<void, {}, {}, AnyAction> {
    return async function getCurrentEnergyThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        let energy = null;
        try {
            energy = await cvat.energizer.currentEnergy();
            dispatch(getCurrentEnergySuccess(energy));
        } catch (error) {
            dispatch(getCurrentEnergyFailed(error));
        }
    };
}

function saveCurrentEnergySuccess(energy: number): AnyAction {
    const action = {
        type: EnergizerActionTypes.SAVE_CURRENT_ENERGY_SUCCESS,
        payload: energy,
    };
    return action;
}

function saveCurrentEnergyFailed(error: any): AnyAction {
    const action = {
        type: EnergizerActionTypes.SAVE_CURRENT_ENERGY_FAILED,
        payload: { error },
    };
    return action;
}

export function saveCurrentEnergyAsync(newEnergy: number): ThunkAction<void, {}, {}, AnyAction> {
    return async function saveCurrentEnergyThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        let energy = null;
        const { userId } = getCVATStore().getState().gamifuserdata;
        try {
            energy = await cvat.energizer.setEnergy(userId, newEnergy);
            dispatch(saveCurrentEnergySuccess(energy));
        } catch (error) {
            dispatch(saveCurrentEnergyFailed(error));
        }
    };
}

export function setLatestEntry(entry: LeaderboardEntry): AnyAction {
    return {
        type: EnergizerActionTypes.SET_LATEST_ENTRY,
        payload: entry,
    };
}

export function switchEnergizerModal(show: boolean): AnyAction {
    return {
        type: EnergizerActionTypes.SWITCH_ENERGIZER,
        payload: show,
    };
}

export function switchEnergizerPopUp(show: boolean): AnyAction {
    return {
        type: EnergizerActionTypes.SWITCH_ENERGIZER_POPUP,
        payload: show,
    };
}

export function incrementEnergyAction(increment: number): AnyAction {
    return {
        type: EnergizerActionTypes.INCREMENT_ENERGY,
        payload: increment,
    };
}

export function incrementEnergy(increment: number): ThunkAction<void, {}, {}, AnyAction> {
    const { energyLevel, active } = getCVATStore().getState().energizer;

    return (dispatch) => {
        const newEnergy = energyLevel + increment;
        if (increment > 0) {
            if (newEnergy <= gamifconsts.MAXIMUM_ENERGY) {
                dispatch(updateUserData('energy_gained', increment));
            }
            if (newEnergy > gamifconsts.MAXIMUM_ENERGY) {
                const expired = newEnergy - gamifconsts.MAXIMUM_ENERGY;
                dispatch(updateUserData('energy_expired', expired));

                const gained = gamifconsts.MAXIMUM_ENERGY - energyLevel;
                dispatch(updateUserData('energy_gained', gained));
            }
        }

        dispatch(incrementEnergyAction(increment));
        dispatch(saveCurrentEnergyAsync(Math.min(newEnergy, 20)));
        if (newEnergy === gamifconsts.ENERGIZER_COST && !active) { dispatch(switchEnergizerPopUp(true)); }
    };
}

export function setActiveEnergizer(energizer: EnergizerType): AnyAction {
    return {
        type: EnergizerActionTypes.SET_ACTIVE_ENERGIZER,
        payload: energizer,

    };
}

export function switchEnergizerLeaderboard(show: boolean): AnyAction {
    return {
        type: EnergizerActionTypes.SWITCH_ENERGIZER_LEADERBOARD,
        payload: show,
    };
}

export function getLeaderboardDataSuccess(entries: LeaderboardEntry[]): AnyAction {
    return {
        type: EnergizerActionTypes.GET_LEADERBOARD_DATA_SUCCESS,
        payload: entries,
    };
}

export function getLeaderboardDataFailed(error: any): AnyAction {
    return {
        type: EnergizerActionTypes.GET_LEADERBOARD_DATA_FAILED,
        payload: error,
    };
}

export function getLeaderboardAsync(energizerName: EnergizerType, time?: string): ThunkAction<void, {}, {}, AnyAction> {
    return async function getLeaderboardThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        let entriesImport = null;
        let entries = null;
        try {
            entriesImport = await cvat.energizer.leaderboard(energizerName, time);

            entries = entriesImport.map((_entry: any): LeaderboardEntry => ({
                userId: 0,
                username: _entry.userProfile,
                energizer: energizerName,
                score: _entry.score,
            }));
            dispatch(getLeaderboardDataSuccess(entries));
        } catch (error) {
            dispatch(getLeaderboardDataFailed(error));
        }
    };
}

export function addLeaderboardEntrySuccess(entry: LeaderboardEntry): AnyAction {
    return {
        type: EnergizerActionTypes.ADD_LEADERBOARD_ENTRY_SUCCESS,
        payload: entry,

    };
}

export function addLeaderboardEntryFailed(error: any): AnyAction {
    return {
        type: EnergizerActionTypes.ADD_LEADERBOARD_ENTRY_FAILED,
        payload: error,
    };
}

// eslint-disable-next-line max-len
export function addLeaderboardEntry(entry: LeaderboardEntry): ThunkAction<void, {}, {}, AnyAction> {
    return async function addLeaderboardEntryThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        try {
            await cvat.energizer.addScore(entry.userId, entry.energizer, entry.score);
            dispatch(addLeaderboardEntrySuccess(entry));
            dispatch(setLatestEntry(entry)); // TODO: Test
        } catch (error) {
            dispatch(addLeaderboardEntryFailed(error));
        }
    };
}
