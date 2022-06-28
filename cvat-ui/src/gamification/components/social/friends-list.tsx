// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import '../../gamif-styles.scss';
import React from 'react';
import { Avatar, List } from 'antd';
import Popover from 'antd/lib/Popover';
import QuickProfile from './quick-profile';

const data = [
    {
        title: 'Annotator 1',
    },
    {
        title: 'Annotator 2',
    },
    {
        title: 'Annotator 3',
    },
];

export default function FriendsList(): JSX.Element {
    return (
        <List
            className='gamif-friends-list-content'
            itemLayout='horizontal'
            dataSource={data}
            renderItem={(item) => (
                <Popover
                    placement='left'
                    trigger='hover'
                    mouseLeaveDelay={5}
                    content={<QuickProfile />}
                >
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
                            title={item.title}
                            description='This is an annotator that is online'
                        />
                    </List.Item>
                </Popover>
            )}
        />
    );
}
