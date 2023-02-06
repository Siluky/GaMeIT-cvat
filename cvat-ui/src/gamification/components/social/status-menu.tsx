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
        case 2: return OnlineStatus.DO_NOT_DISTURB;
        case 3: return OnlineStatus.OFFLINE;
        default: return OnlineStatus.ONLINE;
    }
};

export default function StatusMenu(): JSX.Element {
    const dispatch = useDispatch();
    const social = useSelector((state: CombinedState) => state.social);

    return (
        <Radio.Group
            className='gamif-status-menu'
            buttonStyle='solid'
            onChange={(event) => dispatch(setStatus(valuetoStatus(event.target.value)))}
        >
            <Space direction='vertical'>
                <Radio
                    className='gamif-status-menu-row'
                    value={1}
                    checked={social.status === OnlineStatus.ONLINE}
                >
                    Online
                </Radio>
                <Radio
                    className='gamif-status-menu-row'
                    value={2}
                    checked={social.status === OnlineStatus.DO_NOT_DISTURB}
                >
                    Do not Disturb
                </Radio>
                <Radio
                    className='gamif-status-menu-row'
                    value={3}
                    checked={social.status === OnlineStatus.OFFLINE}
                >
                    Offline
                </Radio>
            </Space>
        </Radio.Group>
    );
}
