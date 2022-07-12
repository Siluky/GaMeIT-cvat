// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import Modal from 'antd/lib/modal/Modal';
import 'gamification/gamif-styles.scss';

// import { useDispatch, useSelector } from 'react-redux';
// import { CombinedState } from 'reducers/interfaces';

interface EnergizerProps {
    visible: boolean;
    onClose(): void;
}

function EnergizerModal(props: EnergizerProps): JSX.Element {
    const { visible, onClose } = props;

    // const energizer = useSelector((state: CombinedState) => state.energizer);
    // const dispatch = useDispatch();
    /*
    useEffect(() =>
        //TODO: update current energy based on time
    ); */

    return (
        <>
            {/* <EnergizerContent /> + <EnergizerLeaderboard /> */}
            <Modal
                className='gamif-energizer-modal'
                title='EnergizerModal'
                width={1000}
                visible={visible}
                onCancel={onClose}
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

export default React.memo(EnergizerModal);
// export default connect(mapStateToProps, mapDispatchToProps)(BadgeOverview);
