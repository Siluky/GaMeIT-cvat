// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import '../../gamif-styles.scss';
import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { List, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Popover from 'antd/lib/popover';
import { OnlineStatus, Profile } from 'gamification/gamif-interfaces';
import { CombinedState } from 'reducers/interfaces';
import { saveProfileDataAsync, setStatus } from 'gamification/actions/social-actions';
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

const valuetoStatus = (value: string): OnlineStatus => {
    switch (value) {
        case 'Online': return OnlineStatus.ONLINE;
        case 'Do not Disturb': return OnlineStatus.DO_NOT_DISTURB;
        case 'Offline': return OnlineStatus.OFFLINE;
        default: return OnlineStatus.ONLINE;
    }
};

export function FriendsList(props: FriendsListProps): JSX.Element {
    const { profiles } = props;
    const dispatch = useDispatch();
    // const social = useSelector((state: CombinedState) => state.social);
    // const badges = useSelector((state: CombinedState) => state.badges);
    const { userId, username } = useSelector((state: CombinedState) => state.gamifuserdata);
    const [activeProfile, setActiveProfile] = useState(0);

    const listHeader = (): JSX.Element => (
        <div className='gamif-friends-list-header'>
            <Popover
                placement='left'
                trigger='click'
                mouseLeaveDelay={5}
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                content={<QuickProfile profile={profiles.find((p) => p.userId === userId)!} /> ?? <></>}
                overlayClassName='gamif-popover'
            >
                <div
                    className='gamif-friends-list-header-name-wrapper'
                >
                    <span className='gamif-friends-list-header-name'>
                        {username}
                    </span>
                </div>
            </Popover>
            <Select
                className='gamif-friends-list-status-select'
                onChange={(value) => {
                    dispatch(setStatus(valuetoStatus(value)));
                    dispatch(saveProfileDataAsync());
                }}
                defaultValue='Offline'
                showArrow={false}
            >
                <Select.Option value='Online'>
                    Online
                    &nbsp;
                    <div
                        className='gamif-quick-profile-status-icon'
                        style={{ background: 'green' }}
                    >
                        &nbsp;
                    </div>
                </Select.Option>
                <Select.Option value='Do not Disturb'>
                    Do not Disturb
                    &nbsp;
                    <div
                        className='gamif-quick-profile-status-icon'
                        style={{ background: 'red' }}
                    >
                        &nbsp;
                    </div>
                </Select.Option>
                <Select.Option value='Offline'>
                    Offline
                    &nbsp;
                    <div
                        className='gamif-quick-profile-status-icon'
                        style={{ background: 'grey' }}
                    >
                        &nbsp;
                    </div>
                </Select.Option>
            </Select>
        </div>
    );

    return (
        <>
            <List
                className='gamif-friends-list-content'
                itemLayout='horizontal'
                dataSource={profiles}
                header={listHeader()}
                renderItem={(_profile) => (_profile.userId === userId ? <></> :
                    (
                        <Popover
                            placement='left'
                            trigger='click'
                            mouseLeaveDelay={5}
                            content={<QuickProfile profile={_profile} />}
                            overlayClassName='gamif-popover'
                            visible={activeProfile === _profile.userId}
                            onVisibleChange={(visible: boolean) => {
                                if (visible) {
                                    setActiveProfile(_profile.userId);
                                } else {
                                    setActiveProfile(0);
                                }
                            }}
                        >
                            <List.Item
                                className='gamif-friends-list-entry'
                                style={_profile.status === OnlineStatus.OFFLINE ? { background: 'lightgray' } : {}}
                            >
                                <List.Item.Meta
                                    avatar={<UserOutlined />}
                                    title={_profile.userId === userId ? 'You' : _profile.username}
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
                    ))}
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
