// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import { Row, Col } from 'antd/lib/grid';
import QuickStatistic from 'gamification/components/statistics/quick-statistics-component';
import ProgressBar from 'gamification/components/progressbar-component';

function QuickStatisticsPanel(): JSX.Element {
    return (
        <div className='cvat-annotation-header-quick-statistics'>
            <Row>
                <Col>
                    <QuickStatistic id={1} />
                </Col>
                <Col>
                    <QuickStatistic id={2} />
                </Col>
                <Col>
                    <QuickStatistic id={3} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <ProgressBar />
                </Col>
            </Row>
        </div>
    );
}
// TODO: include React.memo where appropriate
export default React.memo(QuickStatisticsPanel);
