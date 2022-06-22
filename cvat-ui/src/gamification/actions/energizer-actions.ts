// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
// import getCore from 'cvat-core-wrapper';

// const cvat = getCore();

export enum EnergizerActionTypes {
    SWITCH_ENERGIZER = 'SWITCH_ENERGIZER',
    INCREMENT_ENERGY = 'INCREMENT_ENERGY',
    // TODO:
    SET_CURRENT_ENERGIZER = 'SET_CURRENT_ENERGIZER',
}

export function switchEnergizerModal(show: boolean): AnyAction {
    return {
        type: EnergizerActionTypes.SWITCH_ENERGIZER,
        payload: show,
    };
}

export function incrementEnergy(increment: number): AnyAction {
    return {
        type: EnergizerActionTypes.INCREMENT_ENERGY,
        payload: increment,

    };
}

export function setCurrentEnergizer(energizerName: string): AnyAction {
    return {
        type: EnergizerActionTypes.SET_CURRENT_ENERGIZER,
        payload: energizerName,

    };
}
