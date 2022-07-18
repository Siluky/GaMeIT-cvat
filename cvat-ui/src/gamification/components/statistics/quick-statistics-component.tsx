// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import 'gamification/gamif-styles.scss';
import React from 'react';

interface Props {
    id: number;
    name?: string;
    value?: number;
    unit?: string;
    hoverOverText?: string;
    icon?: any;
}

export default function QuickStatistic(props: Props): JSX.Element {
    const { icon, value, unit } = props;

    return (
        <div className='single-quick-statistic-component'>
            {/* <Button icon='' type='text'> button </Button> */}
            {icon}
            {value}
            {unit}
        </div>
    );
}
