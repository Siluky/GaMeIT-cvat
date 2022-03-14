// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import Modal from 'antd/lib/modal/Modal';

export default function EnergizerModal(): JSX.Element {
    return (
        <>
            {/* <EnergizerContent /> + <EnergizerLeaderboard /> */}
            <Modal
                title='EnergizerModal'
                width={1000}
                className='gamif-energizer-modal'
                footer={(
                    <>
                        Insert the back button here. Can take inspiration from the settings-modal
                    </>
                )}
            >
                Energizer Modal
            </Modal>
        </>
    );
}
