// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import '../gamif-styles.scss';
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
    const { minigame } = props;
    return (
        <>{showMinigame(minigame)}</>
    );
}
