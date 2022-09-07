// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { StatisticsActionTypes } from '../actions/statistics-actions';
import { StatisticsState, Statistic } from '../gamif-interfaces';

const dummyStats: Statistic[] = [
    {
        id: 1,
        value: 156,
        icon: null,
        unit: 'Images',
    },
    {
        id: 2,
        value: 2513,
        icon: null,
        unit: 'Images',
    },
    {
        id: 3,
        value: 3465346,
        icon: null,
        unit: 'Images',
    },
    {
        id: 4,
        value: 16,
        icon: null,
        unit: 'Images',
    },
    {
        id: 5,
        value: 1,
        icon: null,
        unit: 'Images',
    },
];

const defaultState: StatisticsState = {
    statistics: dummyStats,
    selectedStatistics: [1],
    selecting: false,
};

export default (state = defaultState, action: AnyAction): StatisticsState => {
    switch (action.type) {
        case StatisticsActionTypes.SET_QUICK_STATISTIC: {
            return {
                ...state,
                selectedStatistics: action.payload,
            };
        }

        case StatisticsActionTypes.GET_QUICK_STATISTIC: {
            return {
                ...state,
            };
        }

        case StatisticsActionTypes.TOGGLE_SELECTING: {
            return {
                ...state,
                selecting: !state.selecting,
            };
        }

        case StatisticsActionTypes.ADD_STATISTIC: {
            const newSelectedStatistics = state.selectedStatistics.concat(action.payload);

            return {
                ...state,
                selectedStatistics: newSelectedStatistics,
            };
        }

        case StatisticsActionTypes.REMOVE_STATISTIC: {
            const index = state.selectedStatistics.indexOf(action.payload);
            const newArray = state.selectedStatistics;
            newArray.splice(index, 1);

            return {
                ...state,
                selectedStatistics: newArray,
            };
        }

        case StatisticsActionTypes.SELECT_STATISTIC_FAILED: {
            return {
                ...state,
            };
        }

        default: {
            return state;
        }
    }
};
