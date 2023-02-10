// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import 'gamification/gamif-styles.scss';
import React, { useEffect } from 'react';
import { Button, Row } from 'antd';
import { Challenge } from 'gamification/gamif-interfaces';
import { connect, useDispatch } from 'react-redux';
import { CombinedState } from 'reducers/interfaces';
import {
    addChallenge, updateChallenges,
} from 'gamification/actions/challenge-actions';
// import { UndoOutlined } from '@ant-design/icons';
// import { AnnotationCoinIcon } from 'icons';
import { ChallengePane } from './challenge-component';

interface ChallengeListProps {
    challenges: Challenge[],
}

interface StateToProps {
    challenges: Challenge[],
}

function mapStateToProps(state: CombinedState): StateToProps {
    return { challenges: state.challenges.availableChallenges };
}

function ChallengeList(props: ChallengeListProps): JSX.Element {
    const { challenges } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateChallenges());
    }, []);

    return (
        <>
            <div className='gamif-challenge-list'>
                <div>
                    {challenges.map((_challenge: Challenge, index: number) => (
                        <Row key={index}>
                            <ChallengePane
                                id={index}
                                key={index}
                                challenge={_challenge}
                                initProgress={_challenge.progress}
                            />
                        </Row>
                    ))}
                </div>
            </div>
            {/* <Button className='gamif-debug-button'
            onClick={() => dispatch(getChallengesAsync())}> Get Challenges </Button> */}
            <Button className='gamif-debug-button' onClick={() => dispatch(addChallenge())}> Add Challenge </Button>
            {/* <Button className='gamif-debug-button'
            onClick={() => dispatch(saveChallenges())}> Save Challenges </Button>
            <Button
                className='gamif-debug-button'
                onClick={() => dispatch(updateChallenges())}
            >
                Update Challenges
            </Button> */}
        </>
    );
}

export default connect(mapStateToProps)(ChallengeList);
