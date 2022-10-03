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
import { EditFilled, SettingFilled } from '@ant-design/icons';
// import { TimeIcon } from 'icons';
import { useDispatch, useSelector, connect } from 'react-redux';

import { selectStatistic, toggleSelecting } from 'gamification/actions/statistics-actions';
import { CombinedState } from 'reducers/interfaces';
import CvatTooltip from 'components/common/cvat-tooltip';
import { Statistic, UserData } from 'gamification/gamif-interfaces';
import { saveUserData, updateUserData } from 'gamification/actions/user-data-actions';
import { mapStatisticIdtoFieldName, mapStatisticIdtoIcon } from 'gamification/gamif-items';

interface StateToProps {
    userdataAllTime: UserData;
    userdataSession: UserData;
    selecting: boolean;
}

function mapStateToProps(state: CombinedState): StateToProps {
    const { gamifuserdata, statistics } = state;

    return {
        userdataAllTime: gamifuserdata.userdata_total,
        userdataSession: gamifuserdata.userdata_session,
        selecting: statistics.selecting,
    };
}

interface StatisticsListProps {
    userdataAllTime: UserData;
    userdataSession: UserData;
    selecting: boolean;
}

export function StatisticsList(props: StatisticsListProps): JSX.Element {
    const dispatch = useDispatch();

    const { userdataAllTime, userdataSession, selecting } = props;
    const [allTime, showAllTimeStats] = useState(true);
    const [inc, setInc] = useState(false);
    const stats = useSelector((state: CombinedState) => state.statistics);

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
                    <Button
                        className={btnClass}
                        size='large'
                        type='text'
                        icon={<SettingFilled />}
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(toggleSelecting());
                        }}
                    />
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
                </div>
                <div className='statistics-panel-bottom'>
                    <Row>
                        {stats.statistics.map((_stat: Statistic, index: number) => (
                            <Col span={12} key={index}>
                                <CvatTooltip
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
                                </CvatTooltip>
                            </Col>
                        ))}
                    </Row>
                </div>
                <Button
                    className='gamif-debug-button'
                    onClick={() => dispatch(saveUserData())}
                >
                    Save User Data
                </Button>
            </div>
        </>
    );
}

export default connect(mapStateToProps)(StatisticsList);
