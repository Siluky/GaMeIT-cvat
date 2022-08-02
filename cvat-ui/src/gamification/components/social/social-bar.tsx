// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React, { useEffect } from 'react';
import '../../gamif-styles.scss';
import { Menu, Popover, Button } from 'antd';
import { RadarChartOutlined, CloseOutlined } from '@ant-design/icons';
import { getFriendsListAsync, toggleChat } from 'gamification/actions/social-actions';
import { Profile } from 'gamification/gamif-interfaces';
import { connect, useDispatch } from 'react-redux';
import { CombinedState } from 'reducers/interfaces';
import StatusMenu from './status-menu';
import { FriendsList } from './friends-list';
import ChatBox from './chat-box';

interface StateToProps {
    friends: Profile[],
}

function mapStateToProps(state: CombinedState): StateToProps {
    const { social } = state;

    return {
        friends: social.friendListEntries,
    };
}

interface SocialBarProps {
    friends: Profile[];
}

const chatBar = (friend: Profile): JSX.Element => {
    const dispatch = useDispatch();
    return (
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
                {friend.username}
            </Popover>
            {/* TODO: TEST */}
            <Button icon={<CloseOutlined />} onClick={() => dispatch(toggleChat(friend.userId, false))} />
        </Menu.Item>
    );
};

export function SocialBar(props: SocialBarProps): JSX.Element {
    useEffect(() => {
        getFriendsListAsync();
    });

    const { friends } = props;

    return (
        <Menu className='gamif-social-bar' mode='horizontal'>
            <Menu.Item
                className='gamif-friends-list-button'
                icon={(
                    <Popover
                        placement='leftBottom'
                        trigger='click'
                        content={<StatusMenu />}
                        mouseLeaveDelay={10}
                    >
                        <RadarChartOutlined />
                    </Popover>
                )}
                key='friends_list'
            >
                <Popover
                    placement='top'
                    trigger='click'
                    content={<FriendsList profiles={friends} />}
                    mouseLeaveDelay={10}
                >
                    Online (3)
                </Popover>
            </Menu.Item>
            {friends.map((user: Profile) => {
                if (user.chatActive) { return chatBar(user); }
                return null;
            })}
        </Menu>
    );
}

export default connect(mapStateToProps, null)(SocialBar);
