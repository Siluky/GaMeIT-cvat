// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useEffect, useState } from 'react';
import 'gamification/gamif-styles.scss';
import {
    Row,
    Col,
    Button,
    Popover,
    Radio,
}
    from 'antd';
import { ArrowUpOutlined, CarryOutOutlined, LoadingOutlined } from '@ant-design/icons';
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

const selectionPopoverContent = (): JSX.Element => (
    <>
        <div className='selecting-overlay-arrow-up'>
            <ArrowUpOutlined />
        </div>
        <div className='gamif-statistics-selecting-overlay'>
            <h2 className='selecting-overlay-header'>
                Selection mode active
                <br />
                <LoadingOutlined />
            </h2>
            <p className='selecting-overlay-text'>
                Select up to
                {' '}
                <b>3</b>
                {' '}
                statistics you would like to display in the quick statistics panel above
            </p>
        </div>
    </>
);

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
                    <Popover
                        overlayClassName='gamif-popover'
                        placement='left'
                        content={selectionPopoverContent}
                        destroyTooltipOnHide
                        visible={selecting}
                    >
                        <CvatTooltip overlay='Click here to select quick statistics'>
                            <Button
                                className={btnClass}
                                ghost
                                icon={selecting ? <LoadingOutlined /> : <CarryOutOutlined />}
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(toggleSelecting());
                                }}
                            />
                        </CvatTooltip>
                    </Popover>
                    <Radio.Group defaultValue='All Time'>
                        <Radio.Button
                            className='statistics-timeframe-button'
                            value='All Time'
                            onClick={() => showAllTimeStats(true)}
                        >
                            All Time
                        </Radio.Button>
                        <Radio.Button
                            className='statistics-timeframe-button'
                            value='Session'
                            onClick={() => showAllTimeStats(false)}
                        >
                            Session
                        </Radio.Button>
                    </Radio.Group>
                </div>
                <div className='statistics-panel-bottom-wrapper'>
                    <div className={`statistics-panel-bottom-content ${stats.selecting ? 'selecting' : ''}`}>
                        <Row>
                            {stats.statistics.map((_stat: Statistic, index: number) => (
                                <Col span={12} key={index}>
                                    <StatisticsComponent
                                        statistic={_stat}
                                        inc={false}
                                        allTime={allTime}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </div>
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
