// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import 'gamification/gamif-styles.scss';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { selectStatistic } from 'gamification/actions/statistics-actions';
import { mapStatisticIdtoIcon } from 'components/annotation-page/top-bar/quick-statistics';

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
    const dispatch = useDispatch();

    return (
        <Button
            className='statistic-button'
            type='default'
            onClick={() => { dispatch(selectStatistic(id)); }}
        >
            <div className='statistic-button-left'>
                {mapStatisticIdtoIcon(id)}
            </div>
            <div className='statistic-button-right'>
                {value}
                &nbsp;
                {unit}
            </div>
        </Button>
    );
}
