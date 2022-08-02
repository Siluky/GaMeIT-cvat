// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import 'gamification/gamif-styles.scss';
import { Row, Col } from 'antd';
import { BorderOutlined } from '@ant-design/icons';

interface Props {
    id: number;
    name?: string;
    value?: number;
    unit?: string;
    hoverOverText?: string;
    icon?: any;
}

export default function Statistic(props: Props): JSX.Element {
    const { value, unit } = props;
    return (
        <Row>
            <div className='single-statistic-row'>
                <Col>
                    <div className='statistic-icon'>
                        {/* <Button icon='' type='text'> button </Button> */}
                        <BorderOutlined />
                    </div>
                </Col>
                <Col>
                    <div className='single-statistic-prop'>
                        {value}
                        &nbsp;
                        {unit}
                    </div>
                </Col>
                {/* <Col>
                    <div className='single-statistic-prop'>
                        {unit}
                    </div>
                </Col> */}
            </div>
        </Row>
    );
}
