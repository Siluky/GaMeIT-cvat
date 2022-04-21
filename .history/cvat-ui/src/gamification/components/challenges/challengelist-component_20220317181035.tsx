// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import 'gamification/gamif-styles.scss';
import React from 'react';
import { Row } from 'antd';
import { Challenge, ChallengeType } from 'gamification/gamif-interfaces';
import ChallengePane from './challenge-component';

const testChallenge1: Challenge = {
    instruction: 'Annotate 5 images in a row',
    progress: 1,
    goal: 5,
    reward: 1000,
    challengeType: ChallengeType.DAILY,
};

const testChallenge2: Challenge = {
    instruction: 'Do something fun',
    progress: 0,
    goal: 100,
    reward: 222,
    challengeType: ChallengeType.DAILY,
};

const testChallenge3: Challenge = {
    instruction: 'Annotate 10 images in a row',
    progress: 7,
    goal: 10,
    reward: 10000,
    challengeType: ChallengeType.WEEKLY,
};

export default function ChallengeList(): JSX.Element {
    return (
        <div className='gamif-challenge-list'>
            <Row>
                <ChallengePane id={1} challenge={testChallenge1} />
            </Row>
            <Row>
                <ChallengePane id={2} challenge={testChallenge2} />
            </Row>
            <Row>
                <ChallengePane id={3} challenge={testChallenge3} />
            </Row>
        </div>
    );
}
