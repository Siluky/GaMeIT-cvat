// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import 'gamification/gamif-styles.scss';

interface Props {
    id: number;
    name?: string;
    value?: number;
    hoverOverText?: string;
    icon?: any;
}

export default function Statistic(props: Props): JSX.Element {
    const { value } = props;

    return (
        <>{`Statistic ${value}`}</>
    );
}
