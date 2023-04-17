// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
// import { Button } from 'antd';
import CvatTooltip from 'components/common/cvat-tooltip';
import 'gamification/gamif-styles.scss';
import React from 'react';

interface QuickStatisticProps {
    id: number;
    value: number;
    icon: any;
    tooltip: string;
}

const formatValue = (id: number, value: number): string => {
    if (id === 5 || id === 3) {
        if (value > 3600) {
            const seconds = Math.floor((Math.floor(value % 3600)) / 60);
            const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${Math.floor((value / 3600))}:${secondsString}`;
            // return `${Math.floor(value / 3600)}:${value % 60} min`;
        }

        if (value > 60) {
            const seconds = Math.floor(value % 60);
            const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${Math.floor((value / 60))}:${secondsString}`;
            // return `${Math.floor(value / 60)}:${value % 60} min`;
        }
    }

    return `${value}`;
};

export default function QuickStatistic(props: QuickStatisticProps): JSX.Element {
    const {
        id, icon, value, tooltip,
    } = props;
    return (
        <CvatTooltip overlay={tooltip}>
            <div className='single-quick-statistic-component'>
                <div className='quick-stats-icon'>
                    {icon}
                </div>
                <span className='quick-stats-text'>
                    &nbsp;
                    {formatValue(id, value)}
                </span>
            </div>
        </CvatTooltip>
    );
    // return (
    //     <div className='single-quick-statistic-component'>
    //         <CvatTooltip overlay={tooltip}>
    //             <div>
    //                 {icon}
    //             </div>
    //         </CvatTooltip>
    //         <div>
    //             &nbsp;
    //             {value}
    //         </div>
    //     </div>
    // );
}
