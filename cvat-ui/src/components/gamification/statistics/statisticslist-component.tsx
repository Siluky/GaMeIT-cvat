// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Row, Col } from 'antd';
import Statistic from './statistics-component';

export default function StatisticsList(): JSX.Element {
    // TODO: Probably do a for-loop for all avaialble statistics -- not sure where to get size yet
    return (
        <>
            <Row>
                <Col>
                    <Statistic id={1} />
                </Col>
                <Col>
                    <Statistic id={2} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Statistic id={3} />
                </Col>
                <Col>
                    <Statistic id={4} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Statistic id={5} />
                </Col>
                <Col>
                    <Statistic id={6} />
                </Col>
            </Row>
        </>
    );
}
