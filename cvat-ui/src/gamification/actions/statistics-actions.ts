// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
// import getCore from 'cvat-core-wrapper';

// const cvat = getCore();

export enum StatisticsActionTypes {
    SET_QUICK_STATISTIC = 'SET_QUICK_STATISTIC',
    // maybe use REMOVE / ADD

}

export function getStatistics(): AnyAction {
    return {
        type: StatisticsActionTypes.SET_QUICK_STATISTIC,
    };
}
