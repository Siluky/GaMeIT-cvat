// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { StatisticsActionTypes } from '../actions/statistics-actions';
import { StatisticsState } from '../gamif-interfaces';

const defaultState: StatisticsState = {
    statistics: [],
    selectedStatistics: [],
};

export default (state = defaultState, action: AnyAction): StatisticsState => {
    switch (action.type) {
        case StatisticsActionTypes.SET_QUICK_STATISTIC: {
            return {
                ...state,
                // TODO:
            };
        }

        default: {
            return state;
        }
    }
};
