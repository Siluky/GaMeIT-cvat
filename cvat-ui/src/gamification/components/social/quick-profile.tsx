// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import 'gamification/gamif-styles.scss';
import { Button, Avatar } from 'antd';
import {
    MailFilled,
    SmileFilled,
    UserOutlined,
} from '@ant-design/icons';
import { BadgeIcon } from 'icons';
import { Profile } from 'gamification/gamif-interfaces';
import { useDispatch } from 'react-redux';
import { toggleChat } from 'gamification/actions/social-actions';
import CvatTooltip from 'components/common/cvat-tooltip';

interface QuickProfileProps {
    profile: Profile,
}

export default function QuickProfile(props: QuickProfileProps): JSX.Element {
    const { profile } = props;
    const dispatch = useDispatch();

    return (
        <div className='gamif-quick-profile-container'>
            <div className='gamif-quick-profile'>
                <div className='gamif-quick-profile status'>
                    <SmileFilled />
                    <span>{profile.status}</span>
                </div>
                <div className='gamif-quick-profile avatar-name-container'>
                    <Avatar size={32} icon={<UserOutlined />} className='gamif-quick-profile avatar' />
                    <span className='gamif-quick-profile name'>{profile.username}</span>
                </div>
                <div className='gamif-quick-profile badges'>
                    <CvatTooltip overlay='Annotation Champion: 01-08-2022'>
                        <BadgeIcon />
                    </CvatTooltip>
                    <CvatTooltip overlay='Night Owl: 03-04-2022'>
                        <BadgeIcon />
                    </CvatTooltip>
                    <CvatTooltip overlay='Quiz Master: 21-06-2022'>
                        <BadgeIcon />
                    </CvatTooltip>

                </div>
                <Button
                    className='gamif-quick-profile message-button'
                    onClick={() => dispatch(toggleChat(profile.userId, true))}
                >
                    Message
                    <MailFilled />
                </Button>
            </div>
        </div>
    );
}
