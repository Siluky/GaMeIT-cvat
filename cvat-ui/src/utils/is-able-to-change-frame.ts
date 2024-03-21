// Copyright (C) 2021-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { getCVATStore } from 'cvat-store';
import { EnergizerType } from 'gamification/gamif-interfaces';
import { CombinedState } from 'reducers/interfaces';

export default function isAbleToChangeFrame(): boolean {
    const store = getCVATStore();

    const state: CombinedState = store.getState();
    const { instance } = state.annotation.canvas;
    const { activeEnergizer } = state.energizer; // To check energizer state

    // Debug Code
    // console.log(`State of the activeEnergizer: ${activeEnergizer}`);
    // console.log(`EnergizerType== None? : ${activeEnergizer === EnergizerType.NONE}`);

    return !!instance && instance.isAbleToChangeFrame() &&
        !state.annotation.player.navigationBlocked &&
        // From here on additional conditions to prevent Frame-Changes when playing an Energizer-Game
        !!activeEnergizer &&
        activeEnergizer === EnergizerType.NONE;
}
