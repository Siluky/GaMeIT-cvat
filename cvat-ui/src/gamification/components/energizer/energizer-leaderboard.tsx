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
import { AndroidFilled } from '@ant-design/icons';
import { getLeaderboardAsync } from 'gamification/actions/energizer-actions';
import { connect, useDispatch } from 'react-redux';

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

export function EnergizerLeaderboard(props: EnergizerLeaderboardProps): JSX.Element {
    const {
        activeEnergizer, leaderboardEntries,
    } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLeaderboardAsync(activeEnergizer));
    }, []);

    return (
        <>
            <div className='energizer-leaderboard-header'>
                <div className='energizer-leaderboard-headline'>
                    <h2> Leaderboard </h2>
                </div>
                <div className='energizer-leaderboard-header-content'>
                    <div className='energizer-leaderboard-header-text'> 2nd </div>
                    <div className='energizer-leaderboard-header-text'>
                        <AndroidFilled />
                    </div>
                    <div className='energizer-leaderboard-header-text'>
                        1 correct answer
                    </div>
                </div>
            </div>
            <div className='energizer-leaderboard-content'>
                <div className='energizer-leaderboard-content-header'>
                    <Radio.Group>
                        <Radio.Button value='a'>Daily</Radio.Button>
                        <Radio.Button value='b'>Weekly</Radio.Button>
                        <Radio.Button value='c'>All Time</Radio.Button>
                    </Radio.Group>
                </div>
                {
                    leaderboardEntries.map((entry: LeaderboardEntry, index: number) => (
                        // TODO: Highlight the current user's row
                        // --> className='energizer-leaderboard-row energizer-leaderboard-row-highlight'
                        <Row className='energizer-leaderboard-row' wrap>
                            <Col span={2}>
                                <b>
                                    {index + 1}
                                </b>
                            </Col>
                            <Col span={2}>
                                <AndroidFilled />
                            </Col>
                            <Col span={16}>
                                {entry.username}
                            </Col>
                            <Col span={4}>
                                {entry.score}
                            </Col>
                        </Row>
                    ))
                }
            </div>

        </>
    );
}

export default connect(mapStateToProps)(EnergizerLeaderboard);
