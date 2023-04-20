// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useEffect, useState } from 'react';
import 'gamification/gamif-styles.scss';
import {
    Button,
    Modal,
} from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
// eslint-disable-next-line import/no-named-as-default
import { useDispatch, useSelector } from 'react-redux';
import { CombinedState } from 'reducers/interfaces';
import { setActiveEnergizer, toggleEnergyGain } from 'gamification/actions/energizer-actions';
import { EnergizerType } from 'gamification/gamif-interfaces';
import Snake from './energizer-snake';
import QuizDuel from './energizer-quiz-duel';
import TetrisApp from './tetris/src/TetrisApp';
import Leaderboard from './energizer-leaderboard';
import { EnergizerCard } from './energizer-card';

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
    const inputRef = React.useRef<HTMLInputElement>(null);
    const modalContent = (activeEnergizer: EnergizerType): JSX.Element => {
        // setIndex(index + 1);
        switch (activeEnergizer) {
            case EnergizerType.QUIZ:
                return (
                    <QuizDuel
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
                    startTime={100}
                    showLeaderboard={(show: boolean) => setLeaderboardShown(show)}
                />
            );
        }
    };

    const infoScreen = (): JSX.Element => (
        <div>
            <div className='gamif-energizer-info-screen-top'>
                <EnergizerCard energizer={EnergizerType.QUIZ} position={1} />
                <EnergizerCard energizer={EnergizerType.TETRIS} position={2} />
                <EnergizerCard energizer={EnergizerType.SNAKE} position={3} />
                <EnergizerCard energizer={EnergizerType.RANDOM} position={4} />
            </div>
            <div className='gamif-energizer-info-screen-bottom'>
                <span className='gamif-energizer-info-screen-text'>
                    Pick the Energizer you would like to play!
                </span>
            </div>
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

    const { confirm } = Modal;

    const showConfirm = (): void => {
        confirm({
            title: 'Are you sure you want to cancel this energizer?',
            icon: <ExclamationCircleFilled />,
            content: 'Your energy will not be refunded.',
            onOk() {
                onClose();
                setLeaderboardShown(false);
                dispatch(setActiveEnergizer(EnergizerType.NONE));
                dispatch(toggleEnergyGain(true));
            },
            onCancel() {
            },
        });
    };

    // // TODO: Test, check how to "catch" relevant events -- or shfit focus
    // const stopKeyInputs = useCallback((event: KeyboardEvent) => {
    //     console.log(`got event: ${event.key}`);
    //     event.stopPropagation();
    //     // event.preventDefault();
    // }, [])

    const focusInput = (): void => {
        console.log('focus input called');
        if (inputRef.current) {
            console.log('Focusing input on modal (maybe)');
            inputRef.current.focus();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>): void => {
        event.preventDefault();
    };

    useEffect(() => {
        dispatch(toggleEnergyGain(true));
        focusInput();
    }, []);

    return (
        <>
            <Modal
                className='gamif-energizer-modal'
                // title='Energizer'
                title={modalTitleMessage(active)}
                visible={visible}
                onCancel={active !== EnergizerType.NONE ? showConfirm : onClose}
                width={1000}
                footer={null}
                maskClosable={false}
                destroyOnClose={destroyonClose}
                zIndex={1000}
                keyboard={false}
            >
                <input
                    style={{
                        position: 'absolute',
                        width: 0,
                        height: 0,
                        outline: '0 !important',
                        border: 'none',
                        zIndex: -999,
                    }}
                    ref={inputRef}
                    type='text'
                    onKeyDown={handleKeyDown}
                />
                {active === EnergizerType.NONE ? infoScreen() : modalContent(energizer.activeEnergizer)}
                <Button onClick={() => focusInput()}>
                    Focus input
                </Button>
                {/* <Button
                    className='gamif-energizer-continue-button'
                    type='text'
                    onClick={(): void => setLeaderboardShown(true)}
                >
                    Show Leaderboard
                </Button> */}
                {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                </div> */}
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
                destroyOnClose
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
                            dispatch(toggleEnergyGain(true));
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
