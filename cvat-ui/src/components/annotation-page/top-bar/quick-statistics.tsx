// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import { Row, Col } from 'antd/lib/grid';
import { Progress } from 'antd';
import QuickStatistic from 'components/gamification/statistics/quick-statistics-component';

function QuickStatisticsPanel(): JSX.Element {
    return (
        <div className='cvat-annotation-header-quick-statistics'>
            <Row>
                <Col span={8}>
                    <QuickStatistic id={1} />
                </Col>
                <Col span={8}>
                    <QuickStatistic id={2} />
                </Col>
                <Col span={8}>
                    <QuickStatistic id={3} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Progress percent={30} />
                </Col>
            </Row>
        </div>
    );
}
// TODO: include React.memo where appropriate
export default React.memo(QuickStatisticsPanel);
