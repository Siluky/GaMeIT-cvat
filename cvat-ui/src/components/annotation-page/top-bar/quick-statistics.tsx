// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import { Row, Col } from 'antd/lib/grid';
import QuickStatistic from 'gamification/components/statistics/quick-statistics-component';
import ProgressBar from 'gamification/components/progressbar-component';
import { CheckCircleOutlined, FieldTimeOutlined, TagOutlined } from '@ant-design/icons';
// import { ImageIcon } from 'icons';

function QuickStatisticsPanel(): JSX.Element {
    // const iconSmall = <QuestionOutlined style={{ fontSize: '25px' }} />;

    return (
        <Col className='cvat-annotation-header-quick-statistics-group'>
            <Row className='cvat-annotation-header-quick-statistics'>
                <QuickStatistic id={1} value={24} icon={<CheckCircleOutlined />} />
                <QuickStatistic id={2} value={22} icon={<FieldTimeOutlined />} unit='hrs' />
                <QuickStatistic id={3} value={222} icon={<TagOutlined />} unit='tags' />
            </Row>
            <Row justify='center'>
                <ProgressBar />
            </Row>
        </Col>
    );
}
// TODO: include React.memo where appropriate
export default React.memo(QuickStatisticsPanel);
