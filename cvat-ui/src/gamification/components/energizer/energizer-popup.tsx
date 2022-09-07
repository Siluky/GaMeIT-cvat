// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import gamifconsts from 'gamification/gamifconsts';
import 'gamification/gamif-styles.scss';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {
    incrementEnergy, setActiveEnergizer, switchEnergizerModal, switchEnergizerPopUp,
} from 'gamification/actions/energizer-actions';
import { EnergizerIcon } from 'icons';
import { EnergizerType } from 'gamification/gamif-interfaces';

interface EnergizerPopUpProps {
    currentEnergy: number;
}

export default function EnergizerPopUp(props: EnergizerPopUpProps): JSX.Element {
    const { currentEnergy } = props;

    const dispatch = useDispatch();

    // TODO: refactor the hard-coded 10 --> make a const
    const energizerReady = currentEnergy < 10;
    const buttonDisabled = { disabled: energizerReady };

    const messageReady = (
        <>
            <h1> Energy is Full! </h1>
            <h2>
                Ready to do
                <br />
                an Energizer?
            </h2>
        </>
    );

    const messageNotReady = (
        <>
            <h1> Energy is still recharging </h1>
            <h2>
                Collect 10 Energy
                <br />
                to do an Energizer.
            </h2>
        </>
    );

    return (
        <div className='gamif-energizer-popup'>
            <div className='gamif-energizer-popup-header'>
                <div className='gamif-energizer-popup-header-left'>
                    <Button
                        className='gamif-energizer-popup-color-button'
                        shape='round'
                        size='small'
                    >
                        {' '}
                    </Button>
                    <Button
                        className='gamif-energizer-popup-color-button'
                        shape='round'
                        size='small'
                    >
                        {' '}
                    </Button>
                </div>
                <div className='gamif-energizer-popup-header-right'>
                    <Button onClick={(): void => { dispatch(switchEnergizerPopUp(false)); }}>
                        <PlusOutlined rotate={45} />
                    </Button>
                </div>
            </div>

            <div className='gamif-energizer-popup-top-wrapper'>
                <div className='gamif-energizer-popup-top-content'>
                    <EnergizerIcon />
                </div>
            </div>
            <div className='gamif-energizer-popup-bottom'>
                {buttonDisabled ? messageReady : messageNotReady }
                <Button
                    {...buttonDisabled}
                    className='gamif-energizer-popup-start-energizer-button'
                    type='text'
                    onClick={(): void => {
                        if (currentEnergy >= gamifconsts.ENERGIZER_COST) {
                            dispatch(incrementEnergy(-gamifconsts.ENERGIZER_COST));
                            dispatch(switchEnergizerPopUp(false));
                            dispatch(switchEnergizerModal(true));
                            // TODO: Give choice or start random energizer!
                            dispatch(setActiveEnergizer(EnergizerType.QUIZ));
                        }
                    }}
                >
                    Start Energizer
                </Button>
            </div>
        </div>
    );
}
