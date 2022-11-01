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
import { setActiveEnergizer } from 'gamification/actions/energizer-actions';
import { updateUserData } from 'gamification/actions/user-data-actions';
import { EnergizerType } from 'gamification/gamif-interfaces';
import QuizDuel from './energizer-quiz-duel';
import Leaderboard from './energizer-leaderboard';

// import { useDispatch, useSelector } from 'react-redux';
// import { CombinedState } from 'reducers/interfaces';

interface EnergizerModalProps {
    visible: boolean;
    onClose(): void;
    destroyonClose: boolean;
}

function EnergizerModal(props: EnergizerModalProps): JSX.Element {
    const { visible, onClose, destroyonClose } = props;
    const [leaderboardShown, setLeaderboardShown] = useState(false);
    const energizer = useSelector((state: CombinedState) => state.energizer);
    const dispatch = useDispatch();
    const active = energizer.activeEnergizer;
    const [index, setIndex] = useState(1);

    const modalContent = (activeEnergizer: EnergizerType): JSX.Element => {
        // setIndex(index + 1);
        switch (activeEnergizer) {
            case EnergizerType.QUIZ:
                return <QuizDuel key={index} showLeaderboard={(show: boolean) => setLeaderboardShown(show)} />;
            case EnergizerType.SNAKE:
                return <> </>;
            case EnergizerType.TETRIS:
                return <> </>;
            default: return <QuizDuel key={index} showLeaderboard={(show: boolean) => setLeaderboardShown(show)} />;
        }
    };

    const infoScreen = (): JSX.Element => (
        <div className='gamif-energizer-info-screen'>
            <Button
                className='gamif-shop-item-card'
                type='text'
                onClick={() => {
                    setIndex(index + 1);
                    dispatch(setActiveEnergizer(EnergizerType.QUIZ));
                    dispatch(updateUserData('quiz_played', 1));
                }}
            >
                Quiz
            </Button>
            <Button
                className='gamif-shop-item-card'
                type='text'
                onClick={() => {
                    setIndex(index + 1);
                    dispatch(setActiveEnergizer(EnergizerType.SNAKE));
                    dispatch(updateUserData('snake_played', 1));
                }}
            >
                Snake
            </Button>
            <Button
                className='gamif-shop-item-card'
                type='text'
                onClick={() => {
                    setIndex(index + 1);
                    dispatch(setActiveEnergizer(EnergizerType.TETRIS));
                    dispatch(updateUserData('tetris_played', 1));
                }}
            >
                Tetris
            </Button>
        </div>
    );

    return (
        <>
            <Modal
                className='gamif-energizer-modal'
                title='Energizer'
                visible={visible}
                onCancel={onClose /* safety switch currently */}
                width={1000}
                footer={null}
                maskClosable={false}
                destroyOnClose={destroyonClose}
            >
                {active === EnergizerType.NONE ? infoScreen() : modalContent(energizer.activeEnergizer)}
                {/* <Button
                    className='gamif-energizer-continue-button'
                    type='text'
                    onClick={(): void => setLeaderboardShown(true)}
                >
                    Show Leaderboard
                </Button> */}
            </Modal>

            <Modal
                className='gamif-energizer-leaderboard'
                title=''
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
                            // dispatch(addLeaderboardEntry(energizer.latestEntry));
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
