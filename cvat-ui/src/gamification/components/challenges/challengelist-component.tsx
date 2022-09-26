// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import 'gamification/gamif-styles.scss';
import React, { useEffect } from 'react';
import { Button, Row } from 'antd';
import { Challenge } from 'gamification/gamif-interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { CombinedState } from 'reducers/interfaces';
import { addChallenge, getChallengesAsync, saveChallenges } from 'gamification/actions/challenge-actions';
import { UndoOutlined } from '@ant-design/icons';
import { AnnotationCoinIcon } from 'icons';
import ChallengePane from './challenge-component';

export default function ChallengeList(): JSX.Element {
    const challenges = useSelector((state: CombinedState) => state.challenges);
    const dispatch = useDispatch();

    useEffect(() => { dispatch(getChallengesAsync()); }, []);

    return (
        <>
            <div className='gamif-challenge-list'>
                <div className='gamif-challenge-list-header'>
                    Reroll: 20
                    <Button type='text' icon={<AnnotationCoinIcon />} />
                    <Button type='text' icon={<UndoOutlined />} />
                </div>
                <div>
                    {challenges.availableChallenges.map((_challenge: Challenge, index: number) => (
                        <Row>
                            <ChallengePane id={index} key={index} challenge={_challenge} />
                        </Row>
                    ))}
                </div>
            </div>
            <Button onClick={() => dispatch(getChallengesAsync())}> Get Challenges </Button>
            <Button onClick={() => dispatch(addChallenge())}> Add Challenge </Button>
            <Button onClick={() => dispatch(saveChallenges(challenges.availableChallenges))}> Save Challenges </Button>
        </>
    );
}
