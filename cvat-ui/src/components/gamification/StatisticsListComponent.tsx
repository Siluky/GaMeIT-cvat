// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Row, Col } from 'antd';

export default function StatisticsListComponent(): JSX.Element {
    return (
        <>
            <Row>
                <Col>
                    Statistic 1
                </Col>
                <Col>
                    Statistic 2
                </Col>
            </Row>
            <Row>
                <Col>
                    Statistic 3
                </Col>
                <Col>
                    Statistic 4
                </Col>
            </Row>
            <Row>
                <Col>
                    Statistic 5
                </Col>
                <Col>
                    Statistic 6
                </Col>
            </Row>
        </>
    );
}
