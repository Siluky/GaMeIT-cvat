// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import 'gamification/gamif-styles.scss';
import React from 'react';
import { Row } from 'antd';
import { Challenge } from 'gamification/gamif-interfaces';
import { useSelector } from 'react-redux';
import { CombinedState } from 'reducers/interfaces';
import ChallengePane from './challenge-component';

export default function ChallengeList(): JSX.Element {
    const challenges = useSelector((state: CombinedState) => state.challenges);

    return (
        <div className='gamif-challenge-list'>
            {challenges.availableChallenges.map((_challenge: Challenge, index: number) => (
                <Row>
                    <ChallengePane id={index + 1} challenge={_challenge} />
                </Row>
            ))}
        </div>
    );
}
