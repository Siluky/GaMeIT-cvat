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
import { incrementEnergy, setActiveEnergizer } from 'gamification/actions/energizer-actions';
import { addGamifLog, updateUserData } from 'gamification/actions/user-data-actions';
import { EnergizerType } from 'gamification/gamif-interfaces';
import gamifconsts from 'gamification/gamifconsts';
import Snake from './energizer-snake';
import QuizDuel from './energizer-quiz-duel';
import TetrisApp from './tetris/src/TetrisApp';
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
                return (
                    <QuizDuel
                        key={index}
                        startTime={100}
                        showLeaderboard={(show: boolean) => setLeaderboardShown(show)}
                    />
                );
            case EnergizerType.SNAKE:
                return <Snake showLeaderboard={(show: boolean) => setLeaderboardShown(show)} />;
            case EnergizerType.TETRIS:
                return <TetrisApp showLeaderboard={(show: boolean) => setLeaderboardShown(show)} />;
            default: return (
                <QuizDuel
                    key={index}
                    startTime={100}
                    showLeaderboard={(show: boolean) => setLeaderboardShown(show)}
                />
            );
        }
    };

    const infoScreen = (): JSX.Element => (
        <div className='gamif-energizer-info-screen'>
            <Button
                // className='gamif-shop-item-card'
                className='gamif-energizer-preview-card'
                type='text'
                onClick={() => {
                    setIndex(index + 1);
                    dispatch(setActiveEnergizer(EnergizerType.QUIZ));
                    dispatch(updateUserData('quiz_played', 1));
                    dispatch(addGamifLog('Quiz started'));
                    dispatch(incrementEnergy(-gamifconsts.ENERGIZER_COST));
                }}
            >
                Quiz
            </Button>
            <Button
                className='gamif-energizer-preview-card'
                type='text'
                onClick={() => {
                    setIndex(index + 1);
                    dispatch(setActiveEnergizer(EnergizerType.SNAKE));
                    dispatch(updateUserData('snake_played', 1));
                    dispatch(addGamifLog('Snake started'));
                    dispatch(incrementEnergy(-gamifconsts.ENERGIZER_COST));
                }}
            >
                Snake
            </Button>
            <Button
                className='gamif-energizer-preview-card'
                type='text'
                onClick={() => {
                    setIndex(index + 1);
                    dispatch(setActiveEnergizer(EnergizerType.TETRIS));
                    dispatch(updateUserData('tetris_played', 1));
                    dispatch(addGamifLog('Tetris started'));
                    dispatch(incrementEnergy(-gamifconsts.ENERGIZER_COST));
                }}
            >
                Tetris
            </Button>
            <Button
                className='gamif-energizer-preview-card'
                style={{ background: 'black' }}
                type='text'
                onClick={() => {
                    setIndex(index + 1);

                    function getRandomInt(min: number, max: number): number {
                        return Math.floor(Math.random() * (max - min + 1) + min);
                    }

                    const chosenEnergizer = getRandomInt(1, 3);
                    switch (chosenEnergizer) {
                        case 1: {
                            dispatch(setActiveEnergizer(EnergizerType.QUIZ));
                            dispatch(updateUserData('quiz_played', 1));
                            break;
                        }
                        case 2: {
                            dispatch(setActiveEnergizer(EnergizerType.SNAKE));
                            dispatch(updateUserData('snake_played', 1));
                            break;
                        }
                        case 3: {
                            dispatch(setActiveEnergizer(EnergizerType.TETRIS));
                            dispatch(updateUserData('tetris_played', 1));
                            break;
                        }
                        default: break;
                    }
                    dispatch(incrementEnergy(-gamifconsts.ENERGIZER_COST));
                }}
            >
                Random
            </Button>
        </div>
    );

    const modalTitleMessage = (activeEnergizer: EnergizerType): string => {
        switch (activeEnergizer) {
            case EnergizerType.NONE: return '';

            case EnergizerType.QUIZ:
                return 'Quiz: Answer 5 Questions as quickly as possible!';

            case EnergizerType.TETRIS:
                return 'Tetris: Clear as many lines as you can in 60 seconds!';

            case EnergizerType.SNAKE:
                return 'Snake: Collect as many apples as you can in 60 seconds!';

            default: return '';
        }
    };

    return (
        <>
            <Modal
                className='gamif-energizer-modal'
                // title='Energizer'
                title={modalTitleMessage(active)}
                visible={visible}
                onCancel={onClose /* safety switch currently */}
                width={1000}
                footer={null}
                maskClosable={false}
                destroyOnClose={destroyonClose}
                closable={false}
                zIndex={1000}
                keyboard={false}
            >
                {active === EnergizerType.NONE ? infoScreen() : modalContent(energizer.activeEnergizer)}
                {/* <Button
                    className='gamif-energizer-continue-button'
                    type='text'
                    onClick={(): void => setLeaderboardShown(true)}
                >
                    Show Leaderboard
                </Button> */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        // className='gamif-energizer-continue-button'
                        className='quiz-duel-answer-button'
                        type='text'
                        onClick={() => {
                            onClose();
                            setLeaderboardShown(false);
                            // dispatch(addLeaderboardEntry(energizer.latestEntry));
                            dispatch(setActiveEnergizer(EnergizerType.NONE));
                        }}
                    >
                        Return
                    </Button>
                </div>
            </Modal>

            <Modal
                className='gamif-energizer-leaderboard'
                title=''
                visible={leaderboardShown}
                onCancel={(): void => setLeaderboardShown(false)}
                width={320}
                footer={null}
                maskClosable={false}
                closable={false}
                keyboard={false}
                zIndex={1001}
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
