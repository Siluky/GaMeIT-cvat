// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useEffect } from 'react';
import '../../gamif-styles.scss';
import { Challenge } from 'gamification/gamif-interfaces';
import { Button, Progress } from 'antd';
import { AnnotationCoinNoBorderIcon } from 'icons';

import { blue, geekblue } from '@ant-design/colors';
import { useDispatch } from 'react-redux';
import { completeChallenge } from 'gamification/actions/challenge-actions';
import { updateUserData } from 'gamification/actions/user-data-actions';

interface Props {
    id: number;
    challenge: Challenge;
    initProgress: number;
}

export function ChallengePane(props: Props): JSX.Element {
    const { challenge } = props;
    const dispatch = useDispatch();
    // const userdata = useSelector((state: CombinedState) => state.gamifuserdata);
    // const [startVal, setStart] = useState(0);

    // check for challenge completion
    useEffect(() => {
        if (challenge.progress >= challenge.goal) {
            dispatch(completeChallenge(challenge));
            dispatch(updateUserData('challenges_completed', 1));
        }
    }, [challenge.progress]);

    // useEffect(() => {
    //     // Snapshot state!
    //     const udata = getCVATStore().getState().gamifuserdata;
    //     setStart(udata.userdata_session[mapChallengeIdtoFieldName(challenge.id)]);
    // }, []);

    // useEffect(() => {
    //     // eslint-disable-next-line max-len
    //     const diff = userdata.userdata_session[mapChallengeIdtoFieldName(challenge.id)] as number - startVal;
    //     challenge.progress = challenge.initProgress + diff;
    // }, [userdata.userdata_session[mapChallengeIdtoFieldName(challenge.id)]]);

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

// export default connect(mapStateToProps)(ChallengePane);
