// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useState } from 'react';
import 'gamification/gamif-styles.scss';
import {
    Button,
    Modal,
} from 'antd';
// eslint-disable-next-line import/no-named-as-default
import { useDispatch, useSelector } from 'react-redux';
import { CombinedState } from 'reducers/interfaces';
import { addLeaderboardEntry, setActiveEnergizer } from 'gamification/actions/energizer-actions';
import { EnergizerType } from 'gamification/gamif-interfaces';
import QuizDuel from './energizer-quiz-duel';
import Leaderboard from './energizer-leaderboard';

// import { useDispatch, useSelector } from 'react-redux';
// import { CombinedState } from 'reducers/interfaces';

interface EnergizerModalProps {
    visible: boolean;
    onClose(): void;
}

function EnergizerModal(props: EnergizerModalProps): JSX.Element {
    const { visible, onClose } = props;
    const [leaderboardShown, setLeaderboardShown] = useState(false);
    const energizer = useSelector((state: CombinedState) => state.energizer);
    const dispatch = useDispatch();

    const showEnergizer = (activeEnergizer: EnergizerType): JSX.Element => {
        switch (activeEnergizer) {
            case EnergizerType.QUIZ: return <QuizDuel showLeaderboard={(show: boolean) => setLeaderboardShown(show)} />;
            case EnergizerType.SNAKE: return <></>;
            case EnergizerType.TETRIS: return <></>;
            default: return <QuizDuel showLeaderboard={(show: boolean) => setLeaderboardShown(show)} />;
        }
    };

    return (
        <>
            <Modal
                className='gamif-energizer-modal'
                title='Energizer: Quiz Duel'
                visible={visible}
                onCancel={onClose /* safety switch currently */}
                width={1000}
                footer={null}
                maskClosable={false}
            >
                {showEnergizer(energizer.activeEnergizer)}
                <Button
                    className='gamif-energizer-continue-button'
                    type='text'
                    onClick={(): void => setLeaderboardShown(true)}
                >
                    Show Leaderboard
                </Button>
            </Modal>

            <Modal
                className='gamif-energizer-leaderboard'
                title='Energizer: Quiz Duel'
                visible={leaderboardShown}
                onCancel={(): void => setLeaderboardShown(false)}
                width={400}
                footer={null}
                maskClosable={false}
            >
                <Leaderboard />

                <div className='energizer-leaderboard-footer'>
                    <Button
                        className='gamif-energizer-continue-button'
                        type='text'
                        onClick={() => {
                            onClose();
                            setLeaderboardShown(false);
                            dispatch(addLeaderboardEntry(energizer.latestEntry));
                            dispatch(setActiveEnergizer(EnergizerType.NONE));
                        }}
                    >
                        Back to Annotation
                    </Button>
                </div>
            </Modal>
        </>
    );
}

export default React.memo(EnergizerModal);
// export default connect(mapStateToProps, mapDispatchToProps)(BadgeOverview);
