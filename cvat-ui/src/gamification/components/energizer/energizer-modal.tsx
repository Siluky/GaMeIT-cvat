// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useState } from 'react';
import 'gamification/gamif-styles.scss';
import {
    Button,
    Modal,
} from 'antd';
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

    // const energizer = useSelector((state: CombinedState) => state.energizer);
    // const dispatch = useDispatch();

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
                <QuizDuel />
                <Button
                    className='gamif-energizer-continue-button'
                    type='text'
                    onClick={(): void => setLeaderboardShown(true)}
                >
                    Continue
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
                <EnergizerLeaderboard newScore={1} /* TODO: make newScore right --> return value from energizer? */ />
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
