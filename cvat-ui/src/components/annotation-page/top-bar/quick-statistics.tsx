// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import { Row, Col } from 'antd/lib/grid';
import QuickStatistic from 'gamification/components/statistics/quick-statistics-component';
import ProgressBar from 'gamification/components/progressbar-component';
import { QuestionOutlined } from '@ant-design/icons';

function QuickStatisticsPanel(): JSX.Element {
    const iconSmall = <QuestionOutlined style={{ fontSize: '25px' }} />;

    return (
        <div className='cvat-annotation-header-quick-statistics'>
            <Row>
                <Col>
                    <QuickStatistic id={1} value={22} icon={iconSmall} unit='hrs' />
                </Col>
                <Col>
                    <QuickStatistic id={2} value={24} icon={iconSmall} />
                </Col>
                <Col>
                    <QuickStatistic id={3} value={14} icon={iconSmall} unit='min' />
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
