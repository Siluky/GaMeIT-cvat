// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import '../gamif-styles.scss';
import React from 'react';
import 'gamification/gamif-styles.scss';
import { Menu, Popover } from 'antd';
import { RadarChartOutlined } from '@ant-design/icons';
import FriendsList from './friends-list';
import ChatBox from './chat-box';

export default function SocialBar(): JSX.Element {
    // TODO: Can probably take inspiration from the cvat-header (esp. the 'flex' align thing)
    return (
        <Menu className='gamif-social-bar' mode='horizontal'>
            <Menu.Item
                className='gamif-friends-list-button'
                icon={<RadarChartOutlined />}
                key='friends_list'
            >
                <Popover
                    placement='top'
                    trigger='click'
                    content={<FriendsList />}
                    mouseLeaveDelay={10}
                >
                    Online
                </Popover>
            </Menu.Item>
            <Menu.Item
                icon={<RadarChartOutlined />}
                key='chat_window'
            >
                <Popover
                    placement='top'
                    trigger='click'
                    content={<ChatBox />}
                    mouseLeaveDelay={10}
                >
                    ChatBox 1
                </Popover>
            </Menu.Item>
            <Menu.Item
                icon={<RadarChartOutlined />}
                key='chat_window'
            >
                <Popover
                    placement='top'
                    trigger='click'
                    content={<ChatBox />}
                    mouseLeaveDelay={10}
                >
                    ChatBox 2
                </Popover>
            </Menu.Item>

        </Menu>
    );
}
