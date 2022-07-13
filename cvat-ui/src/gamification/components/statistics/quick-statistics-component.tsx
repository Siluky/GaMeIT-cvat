// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import 'gamification/gamif-styles.scss';
import React from 'react';
import {
    Row,
    Col,
}
    from 'antd';

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
        <Row>
            <div className='single-quick-statistic-component'>
                <Col>
                    <div className='statistic-icon'>
                        {/* <Button icon='' type='text'> button </Button> */}
                        {icon}
                    </div>
                </Col>
                <Col>
                    <div className='single-statistic-prop'>
                        {value}
                    </div>
                </Col>
                <Col>
                    <div className='single-statistic-prop'>
                        {unit}
                    </div>
                </Col>
            </div>
        </Row>
    );
}
