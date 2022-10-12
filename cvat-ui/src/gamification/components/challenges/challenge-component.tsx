// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useEffect, useState } from 'react';
import '../../gamif-styles.scss';
import { Challenge } from 'gamification/gamif-interfaces';
import { Button, Progress } from 'antd';
import { AnnotationCoinIcon } from 'icons';

import { blue, geekblue } from '@ant-design/colors';
import { connect, useDispatch, useSelector } from 'react-redux';
import { completeChallenge, updateChallengeProgress } from 'gamification/actions/challenge-actions';
import { CombinedState } from 'reducers/interfaces';
import { mapChallengeIdtoFieldName } from 'gamification/gamif-items';
import { getCVATStore } from 'cvat-store';
import { updateUserData } from 'gamification/actions/user-data-actions';

interface Props {
    id: number;
    challenge: Challenge;
    initProgress: number;
}

interface StateToProps {
    challenge: Challenge;
}

function mapStateToProps(state: CombinedState, ownProps: Props): StateToProps {
    const { gamifuserdata } = state;

    const { challenge } = ownProps;

    return {
        challenge: {
            ...challenge,
            progress: challenge.initProgress + gamifuserdata.userdata_session[mapChallengeIdtoFieldName(challenge.id)],
        },
    };
}

export function ChallengePane(props: Props): JSX.Element {
    const { challenge } = props;
    const dispatch = useDispatch();
    const userdata = useSelector((state: CombinedState) => state.gamifuserdata);
    const [startVal, setStart] = useState(0);

    useEffect(() => {
        console.log('checking whether challenge is completed');
        if (challenge.progress >= challenge.goal) {
            dispatch(completeChallenge(challenge));
            dispatch(updateUserData('challenges_completed', 1));
        }
    }, [challenge.progress]);

    useEffect(() => {
        // Snapshot state!
        const udata = getCVATStore().getState().gamifuserdata;
        setStart(udata.userdata_session[mapChallengeIdtoFieldName(challenge.id)]);
        console.log(`First render of challenge: Setting startVal: ${startVal}`);
    }, []);

    useEffect(() => {
        console.log('User Data field associated to challenge changed: Updating Challenge');
        // eslint-disable-next-line max-len
        const diff = userdata.userdata_session[mapChallengeIdtoFieldName(challenge.id)] - startVal;
        console.log('🚀 ~ file: challenge-component.tsx ~ line 63 ~ useEffect ~ diff', diff);
        challenge.progress = challenge.initProgress + diff;
    }, [userdata.userdata_session[mapChallengeIdtoFieldName(challenge.id)]]);

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
                    { `${challenge.progress}` }
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
        </div>
    );
}

ChallengePane.initProgress = 0;

export default connect(mapStateToProps)(ChallengePane);
