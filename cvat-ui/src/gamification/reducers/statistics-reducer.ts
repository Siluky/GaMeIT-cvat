// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { StatisticsActionTypes } from '../actions/statistics-actions';
import { StatisticsState, Statistic } from '../gamif-interfaces';

const dummyStats: Statistic[] = [
    {
        id: 1,
        value: 0,
        unit: 'Images',
        hoverOverText: 'Images annotated total',
    },
    {
        id: 2,
        value: 0,
        unit: 'Tags',
        hoverOverText: 'Tags set in total',

    },
    {
        id: 3,
        value: 0,
        unit: 'Images',
        hoverOverText: 'Images annotated at night',

    },
    {
        id: 4,
        value: 0,
        unit: 'hrs',
        hoverOverText: 'Time spent annotating',

    },
    {
        id: 5,
        value: 0,
        unit: '',
        hoverOverText: 'Current Annotation Streak',

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
