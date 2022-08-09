// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import 'gamification/gamif-styles.scss';
import React from 'react';

interface StatisticProps {
    id: number;
    name?: string;
    value?: number;
    unit?: string;
    hoverOverText?: string;
    icon?: any;
}

export default function QuickStatistic(props: StatisticProps): JSX.Element {
    const { icon, value, unit } = props;
    // TODO: Tooltips
    return (
        <div className='single-quick-statistic-component'>
            <div>
                {icon}
            </div>
            <div>
                &nbsp;
                {value}
            </div>
            <div>
                &nbsp;
                {unit}
            </div>
        </div>
    );
}
