// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import { Button } from 'antd';
import CvatTooltip from 'components/common/cvat-tooltip';
import 'gamification/gamif-styles.scss';
import React from 'react';

interface QuickStatisticProps {
    value: number;
    icon: any;
    tooltip: string;
}

export default function QuickStatistic(props: QuickStatisticProps): JSX.Element {
    const { icon, value, tooltip } = props;
    return (
        <CvatTooltip overlay={tooltip}>
            <Button
                className='single-quick-statistic-component'
                type='text'
                icon={icon}
            >
                &nbsp;
                {value}
            </Button>
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
