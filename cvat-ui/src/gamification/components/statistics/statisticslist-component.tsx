// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useEffect, useState } from 'react';
import 'gamification/gamif-styles.scss';
import {
    Row,
    Col,
    Button,
    Radio,
}
    from 'antd';
import { SettingFilled } from '@ant-design/icons';
// import { TimeIcon } from 'icons';
import { useDispatch, useSelector, connect } from 'react-redux';
import CvatTooltip from 'components/common/cvat-tooltip';
import { toggleSelecting } from 'gamification/actions/statistics-actions';
import { CombinedState } from 'reducers/interfaces';
import { Statistic } from 'gamification/gamif-interfaces';
import StatisticsComponent from './statistics-component';

interface StateToProps {
    selecting: boolean;
}

function mapStateToProps(state: CombinedState): StateToProps {
    const { statistics } = state;

    return {
        selecting: statistics.selecting,
    };
}

interface StatisticsListProps {
    selecting: boolean;
}

export function StatisticsList(props: StatisticsListProps): JSX.Element {
    const dispatch = useDispatch();

    const { selecting } = props;
    const [allTime, showAllTimeStats] = useState(true);
    // const [inc, setInc] = useState(false);
    const stats = useSelector((state: CombinedState) => state.statistics);
    // const udata = useSelector((state: CombinedState) => state.gamifuserdata);

    useEffect(() => {
        //
    }, []);

    const btnClass = selecting ? 'statistics-selecting-button-active' : 'statistics-selecting-button-inactive';
    return (
        <>
            <div className='statistics-panel'>
                <div className='statistics-panel-top'>
                    <Radio.Group>
                        <Radio.Button value='a' onClick={() => showAllTimeStats(true)}>All Time</Radio.Button>
                        <Radio.Button value='b' onClick={() => showAllTimeStats(false)}>Session</Radio.Button>
                    </Radio.Group>
                    <CvatTooltip overlay='Click here to select quick statistics'>
                        <Button
                            className={btnClass}
                            size='large'
                            type='ghost'
                            icon={<SettingFilled />}
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(toggleSelecting());
                            }}
                        />
                    </CvatTooltip>
                </div>
                <div className='statistics-panel-bottom'>
                    <Row>
                        {stats.statistics.map((_stat: Statistic, index: number) => (
                            <Col span={12} key={index}>
                                <StatisticsComponent statistic={_stat} inc={false} allTime={allTime} />
                                {/* <CvatTooltip
                                    overlay={allTime ? _stat.tooltip_total : _stat.tooltip_session}
                                >
                                    <Button
                                        className='statistic-button'
                                        type='default'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(selectStatistic(allTime ? _stat.id : _stat.id + 100));
                                            if (inc) {
                                                dispatch(updateUserData(mapStatisticIdtoFieldName(_stat.id), 1));
                                            }
                                        }}
                                    >
                                        <div className='statistic-button-left'>
                                            {mapStatisticIdtoIcon(_stat.id)}
                                        </div>
                                        <div className='statistic-button-right'>
                                            {allTime ? userdataAllTime[mapStatisticIdtoFieldName(_stat.id)] :
                                                userdataSession[mapStatisticIdtoFieldName(_stat.id)]}
                                            &nbsp;
                                            {_stat.unit}
                                        </div>
                                    </Button>
                                </CvatTooltip> */}
                            </Col>
                        ))}
                    </Row>
                </div>
                {/* <Button
                    className='gamif-debug-button'
                    onClick={() => dispatch(saveUserData(false))}
                >
                    Save User Data
                </Button>
                <Button
                    className='gamif-debug-button'
                    onClick={() => dispatch(saveUserData(true))}
                >
                    Backup User Data
                </Button> */}
                {/* <CvatTooltip
                    overlay='DEBUG: Press this and then a statistic to increment it by one.'
                >
                    <Button
                        className='statistics-selecting-button-inactive gamif-debug-button'
                        size='large'
                        // icon={<EditFilled />}
                        onClick={(e) => {
                            e.preventDefault();
                            setInc(!inc);
                        }}
                    >
                        <EditFilled />
                    </Button>
                </CvatTooltip> */}
            </div>
        </>
    );
}

export default connect(mapStateToProps)(StatisticsList);
