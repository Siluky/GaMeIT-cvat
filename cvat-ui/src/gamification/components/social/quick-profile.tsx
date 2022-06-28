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

export default function QuickProfile(): JSX.Element {
    return (
        <div className='gamif-quick-profile-container'>
            <div className='gamif-quick-profile'>
                <div className='gamif-quick-profile status'>
                    <SmileFilled />
                    <span>Online</span>
                </div>
                <div className='gamif-quick-profile avatar-name-container'>
                    <QuestionCircleOutlined className='gamif-quick-profile avatar' />
                    <span className='gamif-quick-profile name'>Annotator 1</span>
                </div>
                <div className='gamif-quick-profile badges'>
                    <BadgeIcon />
                    <BadgeIcon />
                    <BadgeIcon />
                </div>
                { /* TODO: onClick method for button to open Chat Tab */ }
                <Button className='gamif-quick-profile message-button'>
                    Message
                    <MailFilled />
                </Button>
            </div>
        </div>
    );
}
