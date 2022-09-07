// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import 'gamification/gamif-styles.scss';
import { Button } from 'antd';
import { BorderOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { selectStatistic } from 'gamification/actions/statistics-actions';

interface Props {
    id: number;
    name?: string;
    value?: number;
    unit?: string;
    hoverOverText?: string;
    icon?: any;
}

export default function StatisticComponent(props: Props): JSX.Element {
    const { value, unit, id } = props;
    const icon = <BorderOutlined />;
    const dispatch = useDispatch();

    return (
        <Button icon={icon} className='statistic-button' type='default' onClick={() => { dispatch(selectStatistic(id)); }}>
            {value}
            {unit}
        </Button>
    );
}

// <div className='single-statistic-row'>
//             <Col>
//                 <div className='statistic-icon'>
//                     <BorderOutlined />
//                 </div>
//             </Col>
//             <Col>
//                 <div className='single-statistic-prop'>
//                     {value}
//                     &nbsp;
//                     {unit}
//                 </div>
//             </Col>
//         </div>
