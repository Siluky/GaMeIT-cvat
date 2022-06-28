// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import 'gamification/gamif-styles.scss';
import { Radio, Space } from 'antd';

export default function StatusMenu(): JSX.Element {
    // TODO: 2 onClick handlers for swinging out friends list / setting own status
    return (
        <Radio.Group className='gamif-status-menu' buttonStyle='solid'>
            <Space direction='vertical'>
                <Radio value={1}>Online</Radio>
                <Radio value={2}>Do not Disturb</Radio>
                <Radio value={3}>Offline</Radio>
            </Space>
        </Radio.Group>
    );
}
