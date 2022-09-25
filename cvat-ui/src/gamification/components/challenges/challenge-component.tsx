// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import '../../gamif-styles.scss';
import { Challenge } from 'gamification/gamif-interfaces';
import { Button, Progress } from 'antd';
import { AnnotationCoinIcon } from 'icons';

import { blue, geekblue } from '@ant-design/colors';
import { useDispatch, useSelector } from 'react-redux';
import { completeChallenge, updateChallengeProgress } from 'gamification/actions/challenge-actions';
import { CombinedState } from 'reducers/interfaces';
import { mapChallengeIdtoFieldName } from 'gamification/gamif-items';

interface Props {
    id: number;
    challenge: Challenge;
}

export default function ChallengePane(props: Props): JSX.Element {
    const { challenge } = props;
    const dispatch = useDispatch();
    const userdata = useSelector((state: CombinedState) => state.gamifuserdata);

    const progress = userdata.userdata_total[mapChallengeIdtoFieldName(challenge.id)];

    return (
        <div className='gamif-challenge-pane-wrapper'>
            <div className='gamif-challenge-pane-top'>
                <div className='gamif-challenge-pane-top-left'>
                    {challenge.instruction}
                    <Progress
                        className='gamif-challenge-pane-progress'
                        percent={Math.floor((challenge.progress / challenge.goal) * 100)}
                        strokeWidth={8}
                        steps={Math.min(challenge.goal, 10)}
                        trailColor={geekblue[1]}
                        strokeColor={blue[4]}
                    />
                </div>
                <div className='gamif-challenge-pane-top-right'>
                    <Button
                        icon={<AnnotationCoinIcon />}
                        type='text'
                        onClick={() => {
                            if (challenge.goal === challenge.progress) {
                                dispatch(completeChallenge(challenge));
                            } else {
                                dispatch(updateChallengeProgress(challenge.id, 1));
                            }
                        }}
                    />
                    {challenge.reward}
                </div>
            </div>
            <div className='gamif-challenge-pane-bottom-text'>
                {challenge.challengeType}
            </div>
            <div>
                { progress }
            </div>
        </div>
    );
}
