// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import CvatTooltip from 'components/common/cvat-tooltip';
import 'gamification/gamif-styles.scss';
import React from 'react';

interface QuickStatisticProps {
    value: number;
    icon: any;
    hoverOverText: string;
}

export default function QuickStatistic(props: QuickStatisticProps): JSX.Element {
    const { icon, value, hoverOverText } = props;
    return (
        <div className='single-quick-statistic-component'>
            <CvatTooltip overlay={hoverOverText}>
                <div>
                    {icon}
                </div>
            </CvatTooltip>
            <div>
                &nbsp;
                {value}
            </div>
        </div>
    );
}
