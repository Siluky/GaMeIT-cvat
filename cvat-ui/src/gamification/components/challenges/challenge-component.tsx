// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useEffect } from 'react';
import '../../gamif-styles.scss';
import { Challenge } from 'gamification/gamif-interfaces';
import { Button, Progress } from 'antd';
import { AnnotationCoinNoBorderIcon } from 'icons';

import { blue, geekblue } from '@ant-design/colors';
import { connect, useDispatch } from 'react-redux';
import { completeChallenge } from 'gamification/actions/challenge-actions';
import { updateUserData } from 'gamification/actions/user-data-actions';
import { CombinedState } from 'reducers/interfaces';
import { getChallengeValue } from 'gamification/gamif-items';

interface Props {
    id: number;
    challenge: Challenge;
    initProgress: number;
}

interface StateToProps {
    challenge: Challenge;
}

function mapStateToProps(state: CombinedState, ownProps: Props): StateToProps {
    const { challenge } = ownProps;
    const updatedProgress = challenge.importedProgress + (
        getChallengeValue(challenge.id) - challenge.baselineValue);
    return {
        challenge: {
            ...challenge,
            progress: updatedProgress,
        },
    };
}

function ChallengePane(props: Props): JSX.Element {
    const { challenge } = props;
    const dispatch = useDispatch();
    useEffect(() => {
        if (challenge.progress >= challenge.goal) {
            dispatch(completeChallenge(challenge));
            dispatch(updateUserData('challenges_completed', 1));
        }
    }, [challenge.progress]);

    return (
        <div className='gamif-challenge-pane-wrapper'>
            <div className='gamif-challenge-pane-top'>
                <div className='gamif-challenge-pane-top-left'>
                    {challenge.instruction}
                    <div className='gamif-challenge-progress-container'>
                        <Progress
                            className='gamif-challenge-pane-progress'
                            percent={Math.floor((challenge.progress / challenge.goal) * 100)}
                            strokeWidth={8}
                            // steps={Math.min(challenge.goal, 10)}
                            size='small'
                            trailColor={geekblue[1]}
                            strokeColor={blue[4]}
                        />
                    </div>
                </div>
                <div className='gamif-challenge-pane-top-right'>
                    <Button
                        // icon={<AnnotationCoinIcon />}
                        icon={<AnnotationCoinNoBorderIcon />}
                        type='text'
                        onClick={() => {
                            // if (challenge.goal === challenge.progress) {
                            //     dispatch(completeChallenge(challenge));
                            // } else {
                            //     dispatch(updateChallengeProgress(challenge.id, 1));
                            // }
                        }}
                    />
                    {challenge.reward}
                </div>
            </div>
            <div className='gamif-challenge-pane-bottom-text'>
                {challenge.challengeType}
            </div>
        </div>
    );
}

ChallengePane.initProgress = 0;

export default connect(mapStateToProps)(ChallengePane);
