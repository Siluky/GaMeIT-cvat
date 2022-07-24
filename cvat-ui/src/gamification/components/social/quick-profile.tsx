// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import 'gamification/gamif-styles.scss';
import { Button } from 'antd';
import {
    MailFilled,
    QuestionCircleOutlined,
    SmileFilled,
} from '@ant-design/icons';
import { BadgeIcon } from 'icons';
import { Profile } from 'gamification/gamif-interfaces';
import { useDispatch } from 'react-redux';
import { toggleChat } from 'gamification/actions/social-actions';

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
                    <QuestionCircleOutlined className='gamif-quick-profile avatar' />
                    <span className='gamif-quick-profile name'>{profile.username}</span>
                </div>
                <div className='gamif-quick-profile badges'>
                    <BadgeIcon />
                    <BadgeIcon />
                    <BadgeIcon />
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
