// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React, { useEffect } from 'react';
import 'gamification/gamif-styles.scss';
// import { EnergizerType } from 'gamification/gamif-interfaces';
import { CombinedState } from 'reducers/interfaces';
import { EnergizerType, LeaderboardEntry } from 'gamification/gamif-interfaces';
import {
    Row,
    Col,
    Radio,
} from 'antd';
// import { AndroidFilled } from '@ant-design/icons';
import { getLeaderboardAsync } from 'gamification/actions/energizer-actions';
import { connect, useDispatch, useSelector } from 'react-redux';

interface EnergizerLeaderboardProps {
    // newScore: number;
    leaderboardEntries: LeaderboardEntry[];
    activeEnergizer: EnergizerType;
    currentUserId: number;
}

interface StateToProps {
    leaderboardEntries: LeaderboardEntry[];
    activeEnergizer: EnergizerType;
    currentUserId: number;
}

function mapStateToProps(state: CombinedState): StateToProps {
    const { energizer, badges } = state;

    return {
        leaderboardEntries: energizer.leaderboardEntries,
        activeEnergizer: energizer.activeEnergizer,
        currentUserId: badges.currentUserId,
    };
}

const leaderBoardRow = (entry: LeaderboardEntry, index: number): JSX.Element => (
    <Row
        className={entry.highlighted ? 'energizer-leaderboard-row highlight' : 'energizer-leaderboard-row'}
        wrap
        key={index}
    >
        <Col span={2}>
            <b>
                {index + 1 > 10 ? '#' : index + 1}
            </b>
        </Col>
        {/* <Col span={2}>
            <AndroidFilled />
        </Col> */}
        <Col span={18}>
            {entry.username}
        </Col>
        <Col span={4}>
            {entry.score}
        </Col>
    </Row>
);

export function EnergizerLeaderboard(props: EnergizerLeaderboardProps): JSX.Element {
    const {
        activeEnergizer, leaderboardEntries,
    } = props;

    const dispatch = useDispatch();
    const { latestEntry } = useSelector((state: CombinedState) => state.energizer);

    useEffect(() => {
        dispatch(getLeaderboardAsync(activeEnergizer, 'Daily'));
        console.log('leaderboard useEffect');
    }, [latestEntry]);

    // useEffect(() => {
    //     dispatch(getLeaderboardAsync(activeEnergizer, 'Daily'));
    // }, []);

    return (
        <>
            <div className='energizer-leaderboard-header'>
                <div className='energizer-leaderboard-headline'>
                    <h2> Leaderboard </h2>
                </div>
                {/* <div>
                    <div className='energizer-leaderboard-header-text'>
                        {`Score: ${latestEntry.score}`}
                    </div>
                </div> */}
            </div>
            <div className='energizer-leaderboard-content'>
                <div className='energizer-leaderboard-content-header'>
                    <Radio.Group
                        defaultValue='Daily'
                        buttonStyle='solid'
                    >
                        <Radio.Button
                            className='leaderboard-timeframe-button'
                            value='Daily'
                            onClick={() => dispatch(getLeaderboardAsync(activeEnergizer, 'Daily'))}
                            defaultChecked
                        >
                            Daily
                        </Radio.Button>
                        <Radio.Button
                            className='leaderboard-timeframe-button'
                            value='Weekly'
                            onClick={() => dispatch(getLeaderboardAsync(activeEnergizer, 'Weekly'))}
                        >
                            Weekly
                        </Radio.Button>
                        <Radio.Button
                            className='leaderboard-timeframe-button'
                            value='All Time'
                            onClick={() => dispatch(getLeaderboardAsync(activeEnergizer))}
                        >
                            All Time
                        </Radio.Button>
                    </Radio.Group>
                </div>
                {
                    leaderboardEntries.map((entry: LeaderboardEntry, index: number) => leaderBoardRow(entry, index))
                }
            </div>
        </>
    );
}

export default connect(mapStateToProps)(EnergizerLeaderboard);
