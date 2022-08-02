// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import '../../gamif-styles.scss';
import React from 'react';
import { Avatar, List } from 'antd';
import Popover from 'antd/lib/Popover';
import { Profile } from 'gamification/gamif-interfaces';
import { CombinedState } from 'reducers/interfaces';
import { connect } from 'react-redux';
import QuickProfile from './quick-profile';

interface FriendsListProps {
    profiles: Profile[],
}

interface StateToProps {
    profiles: Profile[],
}

function mapStateToProps(state: CombinedState): StateToProps {
    const { social } = state;

    return {
        profiles: social.friendListEntries,
    };
}

export function FriendsList(props: FriendsListProps): JSX.Element {
    const { profiles } = props;

    return (
        <List
            className='gamif-friends-list-content'
            itemLayout='horizontal'
            dataSource={profiles}
            renderItem={(_profile) => (
                <Popover
                    placement='left'
                    trigger='hover'
                    mouseLeaveDelay={5}
                    content={<QuickProfile profile={_profile} />}
                >
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
                            title={_profile.username}
                            description='This is an annotator that is online'
                        />
                    </List.Item>
                </Popover>
            )}
        />
    );
}

export default connect(mapStateToProps, null)(FriendsList);
