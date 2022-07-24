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
import EnergizerLeaderboard from './energizer-leaderboard';
import QuizDuel from './energizer-quiz-duel';

// import { useDispatch, useSelector } from 'react-redux';
// import { CombinedState } from 'reducers/interfaces';

interface EnergizerModalProps {
    visible: boolean;
    onClose(): void;
}

function EnergizerModal(props: EnergizerModalProps): JSX.Element {
    const { visible, onClose } = props;
    const [leaderboardShown, setLeaderboardShown] = useState(false);
    const [newLeaderboardScore, setNewLeaderboardScore] = useState(0);

    const generateLeaderboard = (show: boolean, score: number): void => {
        setLeaderboardShown(show);
        setNewLeaderboardScore(score);
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
                <QuizDuel showLeaderboard={(show: boolean, score: number) => generateLeaderboard(show, score)} />
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
                <EnergizerLeaderboard newScore={newLeaderboardScore} />

                <div className='energizer-leaderboard-footer'>
                    <Button
                        className='gamif-energizer-continue-button'
                        type='text'
                        onClick={() => {
                            onClose();
                            setLeaderboardShown(false);
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
