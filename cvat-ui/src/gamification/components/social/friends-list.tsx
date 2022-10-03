// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import '../../gamif-styles.scss';
import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, List } from 'antd';
import Popover from 'antd/lib/Popover';
import { Profile } from 'gamification/gamif-interfaces';
import { CombinedState } from 'reducers/interfaces';
import { getFriendsListAsync } from 'gamification/actions/social-actions';
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
    const dispatch = useDispatch();
    const social = useSelector((state: CombinedState) => state.social);
    const badges = useSelector((state: CombinedState) => state.badges);
    return (
        <>
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
                                // description='This is an annotator that is online'
                            />
                            <span>
                                { _profile.status }
                                &nbsp;
                            </span>
                            <div className='gamif-quick-profile-status-icon'> &nbsp; </div>
                        </List.Item>
                    </Popover>
                )}
            />
            <Popover
                placement='left'
                trigger='hover'
                mouseLeaveDelay={60}
                content={<QuickProfile profile={{ ...social.ownProfile, selectedBadges: badges.badgesinProfile }} />}
            >
                Own Profile
            </Popover>
            <Button type='text' onClick={() => dispatch(getFriendsListAsync())}>Load</Button>
        </>
    );
}

export default connect(mapStateToProps, null)(FriendsList);
