// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import 'gamification/gamif-styles.scss';
import {
    Row,
    Col,
    Collapse,
    Button,
}
    from 'antd';
import { QuestionOutlined } from '@ant-design/icons';
// import { TimeIcon } from 'icons';
import { useDispatch, useSelector } from 'react-redux';

import { toggleSelecting, selectStatistic } from 'gamification/actions/statistics-actions';
import { CombinedState } from 'reducers/interfaces';
import { Statistic } from 'gamification/gamif-interfaces';
import QuickStatisticsPanel from 'components/annotation-page/top-bar/quick-statistics';
import StatisticComponent from './statistics-component';

const { Panel } = Collapse;

export default function StatisticsList(): JSX.Element {
    // TODO: Probably do a for-loop for all avaialble statistics -- not sure where to get size yet
    const dispatch = useDispatch();

    const icon = <QuestionOutlined style={{ fontSize: '40px' }} />;
    const iconSmall = <QuestionOutlined style={{ fontSize: '25px' }} />;

    const stats = useSelector((state: CombinedState) => state.stats);

    return (
        <>
            <div className='statistics-panel'>
                <Row>
                    {stats.statistics.map((statistic: Statistic) => (
                        <Col span={12}>
                            <StatisticComponent
                                id={statistic.id}
                                value={statistic.value}
                                unit={statistic.unit}
                                icon={icon}
                            />
                        </Col>
                    ))}
                </Row>
                <QuickStatisticsPanel />
                {/* <Row>
                    <Col span={12}>
                        <div className='statistics-col'>
                            <Statistic id={1} value={156} icon={<TimeIcon />} unit='Images' />
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
                </Row> */}
                <Button onClick={() => { dispatch(selectStatistic(1)); }}>
                    1
                </Button>
                <Button onClick={() => { dispatch(selectStatistic(2)); }}>
                    2
                </Button>
                <Button onClick={() => { dispatch(selectStatistic(3)); }}>
                    3
                </Button>
                <Collapse className='collapse' bordered={false} defaultActiveKey={['1']}>
                    {/* TODO: ich bin ein Zahnrad */}
                    <Button
                        type='primary'
                        onClick={() => {
                            dispatch(toggleSelecting());
                        }}
                    >
                        Select Statistic
                    </Button>
                    {/* expandIcon */}
                    <Panel header='Show more stats' key='1'>
                        <div className='collapse-panel'>
                            <Row>
                                <Col span={6}>
                                    <StatisticComponent id={5} icon={iconSmall} value={5} />
                                </Col>
                                <Col span={6}>
                                    <StatisticComponent id={6} icon={iconSmall} value={6} />
                                </Col>
                                <Col span={6}>
                                    <StatisticComponent id={7} icon={iconSmall} value={7} />
                                </Col>
                                <Col span={6}>
                                    <StatisticComponent id={8} icon={iconSmall} value={8} />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <StatisticComponent id={9} icon={iconSmall} value={9} />
                                </Col>
                                <Col span={6}>
                                    <StatisticComponent id={10} icon={iconSmall} value={10} />
                                </Col>
                                <Col span={6}>
                                    <StatisticComponent id={11} icon={iconSmall} value={11} />
                                </Col>
                                <Col span={6}>
                                    <StatisticComponent id={12} icon={iconSmall} value={12} />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <StatisticComponent id={13} icon={iconSmall} value={13} />
                                </Col>
                                <Col span={6}>
                                    <StatisticComponent id={14} icon={iconSmall} value={14} />
                                </Col>
                                <Col span={6}>
                                    <StatisticComponent id={15} icon={iconSmall} value={15} />
                                </Col>
                                <Col span={6}>
                                    <StatisticComponent id={16} icon={iconSmall} value={16} />
                                </Col>
                            </Row>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </>
    );
}
