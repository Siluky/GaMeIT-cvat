// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import 'gamification/gamif-styles.scss';
import { Challenge } from 'gamification/gamif-interfaces';
import { Button, Progress } from 'antd';
import { AnnotationCoinIcon } from 'icons';

interface Props {
    id: number;
    challenge: Challenge;
}

export default function ChallengePane(props: Props): JSX.Element {
    const { challenge } = props;
    return (
        <div className='gamif-challenge-pane-wrapper'>
            <div className='gamif-challenge-pane-left'>
                {challenge.instruction}
                <Progress
                    percent={(challenge.progress / challenge.goal) * 100}
                    steps={challenge.goal}
                />
            </div>
            <div className='gamif-challenge-pane-right'>
                <Button icon={<AnnotationCoinIcon />} type='text' />
                {challenge.reward}
                <p style={{ float: 'right' }}>{challenge.challengeType}</p>
            </div>
        </div>
    );
}
