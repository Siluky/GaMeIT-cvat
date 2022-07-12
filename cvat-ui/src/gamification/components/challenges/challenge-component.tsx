// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import '../../gamif-styles.scss';
import { Challenge } from 'gamification/gamif-interfaces';
import { Button, Progress } from 'antd';
import { AnnotationCoinIcon } from 'icons';

import { blue, geekblue } from '@ant-design/colors';

interface Props {
    id: number;
    challenge: Challenge;
}

export default function ChallengePane(props: Props): JSX.Element {
    const { challenge } = props;
    return (
        <div className='gamif-challenge-pane-wrapper'>
            <div className='gamif-challenge-pane-top'>
                <div className='gamif-challenge-pane-top-left'>
                    {challenge.instruction}
                    <Progress
                        percent={(challenge.progress / challenge.goal) * 100}
                        steps={challenge.goal}
                        trailColor={geekblue[1]}
                        strokeColor={blue[4]}
                    />
                </div>
                <div className='gamif-challenge-pane-top-right'>
                    <Button icon={<AnnotationCoinIcon />} type='text' />
                    {challenge.reward}
                </div>
            </div>
            <div className='gamif-challenge-pane-bottom-text'>
                {challenge.challengeType}
            </div>
        </div>
    );
}
