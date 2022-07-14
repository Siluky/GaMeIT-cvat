// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import 'gamification/gamif-styles.scss';
// import { EnergizerType } from 'gamification/gamif-interfaces';
import {
    Row,
    Col,
    Radio,
} from 'antd';
import { AndroidFilled } from '@ant-design/icons';

interface LeaderboardEntry {
    username: string;
    score: number;
    avatar: any;
}

/**
 *
 * @param energizerName
 * @returns All relevant leaderboard entries for the energizer in question
 * TODO: Add database call + energizerType as a parameter
 */
function getLeaderboardEntries(): LeaderboardEntry[] {
    const dummyEntries = [{
        username: 'Annotator 1',
        score: 23,
        avatar: 1,
    },
    {
        username: 'Annotator 2',
        score: 74,
        avatar: 1,
    },
    ];

    return dummyEntries;
}

interface EnergizerLeaderboardProps {
    newScore: number;
}

export default function EnergizerLeaderboard(props: EnergizerLeaderboardProps): JSX.Element {
    const { newScore } = props;
    const entries = getLeaderboardEntries();
    // TODO: Add the actual user entry (+ save to database!)
    const updatedEntries = entries.push({
        username: 'test',
        score: newScore,
        avatar: 1,
    });
    console.log('🚀 ~ file: energizer-leaderboard.tsx ~ line 55 ~ EnergizerLeaderboard ~ updatedEntries', updatedEntries);
    entries.sort((a, b) => ((a.score > b.score) ? 1 : -1));

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
                    entries.map((entry: LeaderboardEntry, index: number) => (
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
