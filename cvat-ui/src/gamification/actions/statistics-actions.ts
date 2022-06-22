// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
// import getCore from 'cvat-core-wrapper';

// const cvat = getCore();

export enum StatisticsActionTypes {
    GET_STATISTICS = 'GET_STATISTICS',
}

export function getStatistics(): AnyAction {
    return {
        type: StatisticsActionTypes.GET_STATISTICS,
    };
}
