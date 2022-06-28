// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import 'gamification/gamif-styles.scss';
import {
    Row,
    Col,
    Collapse,
}
    from 'antd';
import { QuestionOutlined } from '@ant-design/icons';
import Statistic from './statistics-component';

const { Panel } = Collapse;

export default function StatisticsList(): JSX.Element {
    // TODO: Probably do a for-loop for all avaialble statistics -- not sure where to get size yet
    const icon = <QuestionOutlined style={{ fontSize: '40px' }} />;
    const iconSmall = <QuestionOutlined style={{ fontSize: '25px' }} />;

    return (
        <>
            <div className='statistics-panel'>
                <Row>
                    <Col span={12}>
                        <div className='statistics-col'>
                            <Statistic id={1} value={156} icon={icon} unit='Images' />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='selected-prop'>
                            <Statistic id={2} value={14.33} icon={icon} unit='min' />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className='statistics-col'>
                            <Statistic id={3} value={8238} icon={icon} />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='statistics-col'>
                            <Statistic id={4} value={82} icon={icon} unit='hours' />
                        </div>
                    </Col>
                </Row>
                <Collapse className='collapse' bordered={false} defaultActiveKey={['1']}>
                    {/* expandIcon */}
                    <Panel header='Show more stats' key='1'>
                        <div className='collapse-panel'>
                            <Row>
                                <Col span={6}>
                                    <Statistic id={5} icon={iconSmall} value={24} />
                                </Col>
                                <Col span={6}>
                                    <Statistic id={6} icon={iconSmall} value={24} />
                                </Col>
                                <Col span={6}>
                                    <Statistic id={7} icon={iconSmall} value={24} />
                                </Col>
                                <Col span={6}>
                                    <Statistic id={8} icon={iconSmall} value={24} />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <Statistic id={9} icon={iconSmall} value={24} />
                                </Col>
                                <Col span={6}>
                                    <Statistic id={10} icon={iconSmall} value={24} />
                                </Col>
                                <Col span={6}>
                                    <Statistic id={11} icon={iconSmall} value={24} />
                                </Col>
                                <Col span={6}>
                                    <Statistic id={12} icon={iconSmall} value={24} />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <Statistic id={13} icon={iconSmall} value={24} />
                                </Col>
                                <Col span={6}>
                                    <Statistic id={14} icon={iconSmall} value={24} />
                                </Col>
                                <Col span={6}>
                                    <Statistic id={15} icon={iconSmall} value={24} />
                                </Col>
                                <Col span={6}>
                                    <Statistic id={16} icon={iconSmall} value={24} />
                                </Col>
                            </Row>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </>
    );
}
