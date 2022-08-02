// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import { RightOutlined } from '@ant-design/icons';
import 'gamification/gamif-styles.scss';
import React from 'react';

export default function ChatBox(): JSX.Element {
    return (
        <>
            <div className='gamif-chat-box-wrapper'>
                <div className='gamif-chat-box-message-left'> Hey! How are you doing? </div>
                <div className='gamif-chat-box-message-right'> Doing well, thanks. How about you?</div>
                <div className='gamif-chat-box-input'>
                    Type a message...
                    <RightOutlined />
                </div>
            </div>
        </>
    );
}
