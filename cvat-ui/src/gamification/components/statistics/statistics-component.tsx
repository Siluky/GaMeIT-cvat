// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import 'gamification/gamif-styles.scss';
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

export default function Statistic(props: Props): JSX.Element {
    const { value, unit, icon } = props;
    return (
        // <>{`Statistic ${x.id}`}</>
        <Row>
            <div className='single-statistic-row'>
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
