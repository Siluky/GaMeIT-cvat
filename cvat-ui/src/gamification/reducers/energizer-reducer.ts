// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { EnergizerActionTypes } from '../actions/energizer-actions';
import { EnergizerState, EnergizerType } from '../gamif-interfaces';

const defaultState: EnergizerState = {
    energyLevel: 0,
    active: false,
    activeEnergizer: EnergizerType.NONE,
};

// TODO: avoid overcapping energy

export default (state = defaultState, action: AnyAction): EnergizerState => {
    switch (action.type) {
        case EnergizerActionTypes.SWITCH_ENERGIZER: {
            return {
                ...state,
                active: action.payload,
            };
        }

        case EnergizerActionTypes.INCREMENT_ENERGY: {
            return {
                ...state,
                energyLevel: state.energyLevel + action.payload,
            };
        }

        default: {
            return state;
        }
    }
};
