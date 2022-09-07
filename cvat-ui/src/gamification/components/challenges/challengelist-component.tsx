// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import 'gamification/gamif-styles.scss';
import React from 'react';
import { Button, Row } from 'antd';
import { Challenge } from 'gamification/gamif-interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { CombinedState } from 'reducers/interfaces';
import { addChallenge, getChallengesAsync, saveChallenges } from 'gamification/actions/challenge-actions';
import ChallengePane from './challenge-component';

export default function ChallengeList(): JSX.Element {
    const challenges = useSelector((state: CombinedState) => state.challenges);
    const dispatch = useDispatch();

    return (
        <>
            <div className='gamif-challenge-list'>
                {challenges.availableChallenges.map((_challenge: Challenge, index: number) => (
                    <Row>
                        <ChallengePane id={index + 1} challenge={_challenge} />
                    </Row>
                ))}
            </div>
            <Button onClick={() => dispatch(getChallengesAsync())}> Get Challenges </Button>
            <Button onClick={() => dispatch(addChallenge())}> Add Challenge </Button>
            <Button onClick={() => dispatch(saveChallenges(challenges.availableChallenges))}> Save Challenges </Button>

        </>
    );
}
