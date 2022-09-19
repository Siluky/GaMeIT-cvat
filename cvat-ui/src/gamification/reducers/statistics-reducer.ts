// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { stats } from 'gamification/gamif-items';
import { AnyAction } from 'redux';
import { StatisticsActionTypes } from '../actions/statistics-actions';
import { StatisticsState } from '../gamif-interfaces';

const defaultState: StatisticsState = {
    statistics: stats,
    selectedStatistics: [],
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

        case StatisticsActionTypes.ADD_QUICK_STATISTIC: {
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
