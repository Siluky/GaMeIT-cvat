// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { getCVATStore } from 'cvat-store';
import { Statistic } from 'gamification/gamif-interfaces';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
// import getCore from 'cvat-core-wrapper';

// const cvat = getCore();

export enum StatisticsActionTypes {
    SET_QUICK_STATISTIC = 'SET_QUICK_STATISTIC',
    GET_QUICK_STATISTIC = 'GET_QUICK_STATISTIC',
    TOGGLE_SELECTING = 'TOGGLE_SELECTING',
    SELECT_STATISTIC_FAILED = 'SELECT_STATISTIC_FAILED',
    ADD_STATISTIC = 'ADD_STATISTIC',
    REMOVE_STATISTIC = 'REMOVE_STATISTIC',
    // maybe use REMOVE / ADD

}

export function getStatistics(): AnyAction {
    return {
        type: StatisticsActionTypes.GET_QUICK_STATISTIC,
    };
}

export function setStatistics(statistic: Statistic[]): AnyAction {
    return {
        type: StatisticsActionTypes.SET_QUICK_STATISTIC,
        payload: statistic,
    };
}

export function toggleSelecting(): AnyAction {
    return {
        type: StatisticsActionTypes.TOGGLE_SELECTING,
    };
}

export function addStatistic(id: number): AnyAction {
    return {
        type: StatisticsActionTypes.ADD_STATISTIC,
        payload: id,
    };
}

export function removeStatistic(id: number): AnyAction {
    return {
        type: StatisticsActionTypes.REMOVE_STATISTIC,
        payload: id,
    };
}

export function selectStatisticFailed(id: number): AnyAction {
    return {
        type: StatisticsActionTypes.SELECT_STATISTIC_FAILED,
        payload: id,
    };
}

export function selectStatistic(id: number): ThunkAction<void, {}, {}, AnyAction> {
    const statisticsState = getCVATStore().getState().statistics;
    const found = statisticsState.selectedStatistics.find((element: number) => element === id);

    return (dispatch) => {
        if (statisticsState.selecting) {
            if (found) {
                dispatch(removeStatistic(id));
                console.log('remove quick statistics');
            } else if (statisticsState.selectedStatistics.length === 3) {
                dispatch(selectStatisticFailed(id));
                console.log('quick statistics full');
            } else {
                dispatch(addStatistic(id));
                console.log('add quick statistics');
            }
        } else {
            dispatch(selectStatisticFailed(id));
            console.log('selecting not active');
        }
    };
}
