// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import 'gamification/gamif-styles.scss';
import {
    Tabs,
    Row,
    Col,
    Collapse,
}
    from 'antd';
import Statistic from './statistics-component';

const { Panel } = Collapse;
const { TabPane } = Tabs;

export default function StatisticsList(): JSX.Element {
    // TODO: Probably do a for-loop for all avaialble statistics -- not sure where to get size yet
    return (
        <>
            <Tabs type='card' defaultActiveKey='1' className='statistics-overview-tabs'>
                <TabPane tab='Statistics' key='1'>
                    <Row>
                        <Col span={4}>
                            <Statistic id={1} name='' value={2} hoverOverText='test' icon={2} />
                        </Col>
                        <Col span={4}>
                            <Statistic id={2} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <Statistic id={3} />
                        </Col>
                        <Col span={4}>
                            <Statistic id={4} />
                        </Col>
                    </Row>

                    { /* Extensive stats */ }
                    <Collapse bordered={false} defaultActiveKey={['1']}>
                        {/* expandIcon */}
                        <Panel header='This is panel header 1' key='1'>
                            <Row>
                                <Col span={4}>
                                    <Statistic id={5} />
                                    {/* create 3 * 4 grid with stats */}
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>
                </TabPane>
                <TabPane tab='Challenges' key='2'>
                    Content of Tab Pane 2
                </TabPane>
            </Tabs>
        </>
    );
}
