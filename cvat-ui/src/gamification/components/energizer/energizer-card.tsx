// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import 'gamification/gamif-styles.scss';
import { EnergizerType } from 'gamification/gamif-interfaces';
import {
    Button,
} from 'antd';
import { QuizIconPlain, TetrisIconPlain, SnakeIconPlain } from 'icons';
import { useDispatch } from 'react-redux';
import { incrementEnergy, setActiveEnergizer, toggleEnergyGain } from 'gamification/actions/energizer-actions';
import { addGamifLog, updateUserData } from 'gamification/actions/user-data-actions';
import gamifconsts from 'gamification/gamifconsts';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface EnergizerCardProps {
    energizer: EnergizerType;
    position: number;
}

const getMetadata = (energizer: EnergizerType): [JSX.Element, string] => {
    switch (energizer) {
        case EnergizerType.QUIZ:
            return [
                <QuizIconPlain />,
                'Answer 5 Trivia Questions as fast as possible!',
            ];
            break;

        case EnergizerType.SNAKE:
            return [
                <SnakeIconPlain />,
                'Collect as many Apples as possible in 60 seconds!',
            ];
            break;

        case EnergizerType.TETRIS:
            return [
                <TetrisIconPlain />,
                'Clear as many Lines as possible in 60 seconds!',
            ];
            break;

        case EnergizerType.RANDOM:
            return [
                <QuestionCircleOutlined style={{ fontSize: '48px' }} />,
                'Get a random Energizer!',
            ];
            break;

        default: return [<></>, ''];
    }
};

const getAngle = (pos: number): string => {
    switch (pos) {
        case 1: return '-20deg';
        case 2: return '-5deg';
        case 3: return '5deg';
        case 4: return '20deg';
        default: return '0';
    }
};

export function EnergizerCard(props: EnergizerCardProps): JSX.Element {
    const { energizer, position } = props;
    const [icon, descriptionText] = getMetadata(energizer);
    const dispatch = useDispatch();

    return (
        <div
            className='gamif-energizer-card'
            style={{
                transform: `rotate(${getAngle(position)})`,
                marginTop: (position === 1 || position === 4) ? '80px' : '',
            }}
        >
            <div className='gamif-energizer-card-top'>
                <div className='gamif-energizer-card-icon'>
                    {icon}
                </div>
            </div>
            <div className='gamif-energizer-card-bottom'>
                <div className='gamif-energizer-card-bottom-headline'>
                    {energizer}
                </div>
                <div className='gamif-energizer-card-bottom-text-wrapper'>
                    {descriptionText}
                </div>
                <Button
                    className='gamif-energizer-card-play-button'
                    onClick={() => {
                        let relevantEnergizer = energizer;
                        if (relevantEnergizer === EnergizerType.RANDOM) {
                            const randomIndex = Math.floor(Math.random() * 3);
                            switch (randomIndex) {
                                case 0: relevantEnergizer = EnergizerType.TETRIS; break;
                                case 1: relevantEnergizer = EnergizerType.SNAKE; break;
                                case 2: relevantEnergizer = EnergizerType.QUIZ; break;
                                default: relevantEnergizer = EnergizerType.QUIZ; break;
                            }
                        }
                        switch (relevantEnergizer) {
                            case EnergizerType.QUIZ:
                                dispatch(updateUserData('quiz_played', 1));
                                dispatch(addGamifLog('Quiz started'));
                                break;
                            case EnergizerType.TETRIS:
                                dispatch(updateUserData('tetris_played', 1));
                                dispatch(addGamifLog('Tetris started'));
                                break;
                            case EnergizerType.SNAKE:
                                dispatch(updateUserData('snake_played', 1));
                                dispatch(addGamifLog('Snake started'));
                                break;
                            default: break;
                        }
                        dispatch(setActiveEnergizer(relevantEnergizer));
                        dispatch(incrementEnergy(-gamifconsts.ENERGIZER_COST));
                        dispatch(toggleEnergyGain(false));
                    }}
                >
                    Play!
                </Button>
            </div>
        </div>

    );
}
