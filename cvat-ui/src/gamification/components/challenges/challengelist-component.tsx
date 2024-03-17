// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import 'gamification/gamif-styles.scss';
import React from 'react';
import { Button, Row } from 'antd';
import { Challenge, ChallengeType } from 'gamification/gamif-interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { CombinedState } from 'reducers/interfaces';
// import { initializeUserData } from 'gamification/actions/user-data-actions';
import {
    addChallenge,
} from 'gamification/actions/challenge-actions';
// import { UndoOutlined } from '@ant-design/icons';
// import { AnnotationCoinIcon } from 'icons';
import ChallengePane from './challenge-component';

// interface ChallengeListProps {
//     challenges: Challenge[],
// }
// interface StateToProps {
//     challenges: Challenge[],
// }

// function mapStateToProps(state: CombinedState): StateToProps {
//     return { challenges: state.challenges.availableChallenges };
// }

export default function ChallengeList(): JSX.Element {
    const dispatch = useDispatch();
    const { availableChallenges } = useSelector((state: CombinedState) => state.challenges);

    return (
        <>
            <div className='gamif-challenge-list'>
                <div>
                    {/* FIXME: async import. Below is just a placeholder */}
                    {/*                     {availableChallenges
                        .filter((_challenge: Challenge) => _challenge.challengeType === ChallengeType.WEEKLY)
                        .map((_challenge: Challenge, index: number) => (
                            <Row key={index}>
                                <ChallengePane
                                    id={index}
                                    key={index}
                                    challenge={_challenge}
                                    initProgress={_challenge.progress}
                                />
                            </Row>
                        ))} */}
                    <Row key={0}>
                        <ChallengePane
                            id={0}
                            key={0}
                            challenge={{
                                id: 10,
                                instruction: 'WEEKLY DEBUG Goal',
                                importedProgress: 0,
                                baselineValue: 0,
                                progress: 0,
                                goal: 20,
                                goal_variance: 10,
                                reward: 60,
                                reward_variance: 30,
                                challengeType: ChallengeType.WEEKLY,
                            }}
                            initProgress={0}
                        />
                    </Row>
                </div>
                <div>
                    {availableChallenges.map((_challenge: Challenge, index: number) => (
                        <Row key={index}>
                            <ChallengePane
                                id={index}
                                key={index}
                                challenge={_challenge}
                                initProgress={_challenge.progress}
                            />
                        </Row>
                    ))}
                </div>
            </div>
            {/* <Button className='gamif-debug-button'
            onClick={() => dispatch(getChallengesAsync())}> Get Challenges </Button> */}
            <Button className='gamif-debug-button' onClick={() => dispatch(addChallenge())}> Add Challenge </Button>
            {/* <Button className='gamif-de
            bug-button' onClick={() => dispatch(getChallengesAsync(true))}> New Day Chal </Button> */}
            {/* <Button className='gamif-de
            bug-button' onClick={() => dispatch(initializeUserData(true))}> Init New Day </Button> */}
            {/* <Button className='gamif-debug-button'
            onClick={() => dispatch(saveChallenges())}> Save Challenges </Button>
            <Button
                className='gamif-debug-button'
                onClick={() => dispatch(updateChallenges())}
            >
                Update Challenges
            </Button> */}
        </>
    );
}

// export default connect(mapStateToProps)(ChallengeList);
