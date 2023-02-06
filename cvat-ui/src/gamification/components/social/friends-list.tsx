// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import '../../gamif-styles.scss';
import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { List } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Popover from 'antd/lib/popover';
import { OnlineStatus, Profile } from 'gamification/gamif-interfaces';
import { CombinedState } from 'reducers/interfaces';
// import { getFriendsListAsync, saveProfileDataAsync } from 'gamification/actions/social-actions';
import { getstatusStyle } from 'gamification/gamif-items';
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

const formatStatus = (status: OnlineStatus): string => {
    switch (status) {
        case OnlineStatus.ONLINE: return 'Online';
        case OnlineStatus.DO_NOT_DISTURB: return 'Do not Disturb';
        case OnlineStatus.OFFLINE: return 'Offline';
        default: return '';
    }
};

export function FriendsList(props: FriendsListProps): JSX.Element {
    const { profiles } = props;
    // const dispatch = useDispatch();
    // const social = useSelector((state: CombinedState) => state.social);
    // const badges = useSelector((state: CombinedState) => state.badges);
    const { userId } = useSelector((state: CombinedState) => state.gamifuserdata);
    const [zIndex, setZIndex] = useState(1);

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
                        mouseLeaveDelay={10}
                        content={<QuickProfile profile={_profile} />}
                        overlayClassName='gamif-popover'
                        onVisibleChange={(visible: boolean) => {
                            if (visible) {
                                console.log('chat is now visible');
                                setZIndex(zIndex + 1);
                            } else {
                                console.log('chat is now not visible');
                                setZIndex(Math.max(zIndex - 1, 1));
                            }
                        }}
                        zIndex={zIndex}
                    >
                        <List.Item
                            style={_profile.userId === userId ? { background: '#fddeef' } : {}}
                        >
                            <List.Item.Meta
                                // avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
                                avatar={<UserOutlined />}
                                title={_profile.userId === userId ? 'You' : _profile.username}
                                // description='This is an annotator that is online'
                                // style={_profile.userId === userId ? { background: 'cyan' } : {}}
                            />
                            <span>
                                { formatStatus(_profile.status) }
                                &nbsp;
                            </span>
                            <div
                                className='gamif-quick-profile-status-icon'
                                style={getstatusStyle(_profile.status)}
                            >
                                &nbsp;
                            </div>
                        </List.Item>
                    </Popover>
                )}
            />
            {/* <Popover
                placement='left'
                trigger='hover'
                mouseLeaveDelay={60}
                className='gamif-debug-button'
                content={<QuickProfile profile={{ ...social.ownProfile, selectedBadges: badges.badgesinProfile }} />}
            >
                Own Profile
            </Popover> */}

            {/* <Button type='text' className='gamif-debug-button'
            onClick={() => dispatch(getFriendsListAsync())}>Load</Button> */}
            {/* <Button type='text' className='gamif-debug-button'
            onClick={() => dispatch(saveProfileDataAsync())}>Save</Button> */}
        </>
    );
}

export default connect(mapStateToProps, null)(FriendsList);
