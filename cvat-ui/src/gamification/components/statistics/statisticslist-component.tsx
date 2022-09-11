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
import { useDispatch, useSelector, connect } from 'react-redux';

import { toggleSelecting } from 'gamification/actions/statistics-actions';
import { CombinedState } from 'reducers/interfaces';
import { Statistic, UserData } from 'gamification/gamif-interfaces';
import { updateUserData } from 'gamification/actions/user-data-actions';
import { mapStatisticIdtoIcon } from 'components/annotation-page/top-bar/quick-statistics';
import StatisticComponent from './statistics-component';

const { Panel } = Collapse;

interface StateToProps {
    userdata: UserData;
}

function mapStateToProps(state: CombinedState): StateToProps {
    const { gamifuserdata } = state;

    return {
        userdata: gamifuserdata.userdata_total,
    };
}

interface StatisticsListProps {
    userdata: UserData;
}

export function mapIdtoFieldName(id: number): keyof UserData {
    switch (id) {
        case 1: return 'images_annotated';
        case 2: return 'tags_set';
        case 3: return 'images_annotated_night';
        case 4: return 'annotation_time';
        case 5: return 'annotation_streak_current';
        default: return 'images_annotated';
    }
}

export function StatisticsList(props: StatisticsListProps): JSX.Element {
    const dispatch = useDispatch();

    const { userdata } = props;

    // const icon = <QuestionOutlined style={{ fontSize: '40px' }} />;
    const iconSmall = <QuestionOutlined style={{ fontSize: '25px' }} />;

    const stats = useSelector((state: CombinedState) => state.statistics);
    const userdatatest = useSelector((state: CombinedState) => state.gamifuserdata);

    return (
        <>
            <div className='statistics-panel'>
                <Row>
                    {stats.statistics.map((_stat: Statistic) => (
                        <Col span={12}>
                            <StatisticComponent
                                id={_stat.id}
                                value={userdata[mapIdtoFieldName(_stat.id)]}
                                unit={_stat.unit}
                                icon={mapStatisticIdtoIcon(_stat.id)}
                            />
                        </Col>
                    ))}
                </Row>

                <Button onClick={() => { dispatch(updateUserData('images_annotated', 1)); }}>
                    images_annotated:
                    {userdatatest.userdata_total.images_annotated}
                </Button>
                <Button onClick={() => { dispatch(updateUserData('tags_set', 1)); }}>
                    tags_set:
                    {userdatatest.userdata_total.tags_set}
                </Button>
                <Button onClick={() => { dispatch(updateUserData('images_annotated_night', 1)); }}>
                    images_annotated_night:
                    {userdatatest.userdata_total.images_annotated_night}
                </Button>

                <Collapse className='collapse' bordered={false} defaultActiveKey={['1']}>
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

export default connect(mapStateToProps)(StatisticsList);
