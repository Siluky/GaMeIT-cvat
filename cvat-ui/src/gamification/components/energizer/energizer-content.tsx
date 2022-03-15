// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import 'gamification/gamif-styles.scss';

interface Props {
    minigame: string;
}

// TODO: Idea: Pass the string name of the minigame as props to the content
function showMinigame(minigame: string): JSX.Element {
    return (
        <>{minigame}</>
    );
}

export default function EnergizerContent(props: Props): JSX.Element {
    // TODO: Figure out how to fix this weird style
    const x = props;
    return (
        <>{showMinigame(x.minigame)}</>
    );
}
