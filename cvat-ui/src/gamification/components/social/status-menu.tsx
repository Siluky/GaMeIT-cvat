// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import 'gamification/gamif-styles.scss';
import { Radio, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from 'gamification/actions/social-actions';
import { OnlineStatus } from 'gamification/gamif-interfaces';
import { CombinedState } from 'reducers/interfaces';

const valuetoStatus = (value: number): OnlineStatus => {
    switch (value) {
        case 1: return OnlineStatus.ONLINE;
        case 2: return OnlineStatus.AWAY;
        case 3: return OnlineStatus.DO_NOT_DISTURB;
        case 4: return OnlineStatus.OFFLINE;
        default: return OnlineStatus.ONLINE;
    }
};

// DEPRECATED: using friends-list.tsx instead
export default function StatusMenu(): JSX.Element {
    const dispatch = useDispatch();
    const social = useSelector((state: CombinedState) => state.social);

    // Function to handle status change
    const handleStatusChange = (event: any): void => {
        dispatch(setStatus(valuetoStatus(event.target.value)));
    };

    return (
        <Radio.Group
            className='gamif-status-menu'
            buttonStyle='solid'
            onChange={handleStatusChange}
            value={social.status} // Set the value of Radio.Group to the current status
        >
            <Space direction='vertical'>
                <Radio className='gamif-status-menu-row' value={1}>
                    Online
                </Radio>
                <Radio className='gamif-status-menu-row' value={2}>
                    Away
                </Radio>
                <Radio className='gamif-status-menu-row' value={3}>
                    Do not Disturb
                </Radio>
                <Radio className='gamif-status-menu-row' value={4}>
                    Offline
                </Radio>
            </Space>
        </Radio.Group>
    );
}
