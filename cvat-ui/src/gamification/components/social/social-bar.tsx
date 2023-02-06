// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React, { useEffect } from 'react';
import '../../gamif-styles.scss';
import { Menu, Popover, Button } from 'antd';
import { CloseOutlined, InfoCircleFilled } from '@ant-design/icons';
import { getFriendsListAsync, saveProfileDataAsync, toggleChat } from 'gamification/actions/social-actions';
import { Profile } from 'gamification/gamif-interfaces';
import { connect, useDispatch } from 'react-redux';
import { CombinedState } from 'reducers/interfaces';
import StatusMenu from './status-menu';
import { FriendsList } from './friends-list';
import Chat from './chat-box';

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
            // icon={<RadarChartOutlined />}
            key={friend.userId}
        >
            <Popover
                placement='top'
                trigger='click'
                content={<Chat userId={friend.userId} messages={[]} />}
                mouseLeaveDelay={10}
                defaultVisible
                overlayClassName='gamif-popover'
            >
                {friend.username}
            </Popover>
            <Button
                icon={<CloseOutlined />}
                onClick={() => dispatch(toggleChat(friend.userId, false))}
                type='text'
                size='small'
            />
        </Menu.Item>
    );
};

export function SocialBar(props: SocialBarProps): JSX.Element {
    const dispatch = useDispatch();
    const { friends } = props;

    useEffect(() => {
        dispatch(getFriendsListAsync());
    }, []);

    return (
        <Menu
            className='gamif-social-bar'
            mode='horizontal'
            style={{ padding: '0', borderBottom: '0' }}
        >
            <Menu.Item
                className='gamif-friends-list-menu'
                style={{ display: 'flex' }}
                icon={(
                    <Popover
                        placement='left'
                        trigger='click'
                        content={<StatusMenu />}
                        mouseLeaveDelay={10}
                        onVisibleChange={(visible: boolean) => { if (!visible) { dispatch(saveProfileDataAsync()); } }}
                        overlayClassName='gamif-popover'
                    >
                        <div className='gamif-status-menu-trigger'>
                            <InfoCircleFilled />
                        </div>
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
                    <Button
                        className='friends-list-popover-trigger-button'
                        onClick={() => dispatch(getFriendsListAsync())}
                        ghost
                    >
                        {`Online (${friends.length ?? 0})`}
                    </Button>
                </Popover>
            </Menu.Item>
            {/* {social.chats.map((chat: ChatRoom) => {
                const user = social.chats.find((e) => e.otherUserId === chat.otherUserId);
                if (user) {
                    return chatBar(user);
                }
                return <></>;
            })} */}
            {friends.map((user: Profile) => {
                if (user.chatActive) { return chatBar(user); }
                return null;
            })}
        </Menu>
    );
}

export default connect(mapStateToProps, null)(SocialBar);
