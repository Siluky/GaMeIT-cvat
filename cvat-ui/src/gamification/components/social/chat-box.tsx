// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import { Input, Form, Button } from 'antd';
import { getChatHistoryAsync, sendMessageAsync } from 'gamification/actions/social-actions';
import { Message } from 'gamification/gamif-interfaces';
import 'gamification/gamif-styles.scss';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { CombinedState } from 'reducers/interfaces';

interface ChatBoxProps {
    userId: number;
    messages: Message[];
}

const chatMessage = (msg: Message, index: number): JSX.Element => {
    const style = msg.sender ? 'gamif-chat-box-message-right' : 'gamif-chat-box-message-left';
    // TODO: Refactor to just properly export the Datetime and not do this cheap variant
    let formattedMessage = '';
    formattedMessage += msg.timestamp.substring(8, 10);
    formattedMessage += msg.timestamp.substring('.');
    formattedMessage += msg.timestamp.substring(5, 7);
    formattedMessage += msg.timestamp.substring(', ');
    formattedMessage += msg.timestamp.substring(12, 18);

    return (
        <div className={style} key={index}>
            <span>{msg.content}</span>
            {/* <span className='time'>{msg.timestamp}</span> */}
            <span className='time'>{formattedMessage}</span>
        </div>
    );
};

interface StateToProps {
    messages: Message[];
}

function mapStateToProps(state: CombinedState, ownProps: ChatBoxProps): StateToProps {
    const { social } = state;
    let messages = social.chats.find((room) => room.otherUserId === ownProps.userId)?.messages;
    if (!messages) { messages = []; }

    return {
        messages,
    };
}
export function ChatBox(props: ChatBoxProps): JSX.Element {
    const { userId, messages } = props;

    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    // TODO: on loadup, get messages from DB
    useEffect(() => {
        // dispatch(getChatHistoryAsync(userId));
    }, []);
    return (
        <>
            <div className='gamif-chat-box-container'>
                <div className='gamif-chat-box-messages-container'>
                    {messages.map((m, index) => chatMessage(m, index))}
                </div>
                <Button
                    type='text'
                    className='gamif-debug-button'
                    onClick={() => dispatch(getChatHistoryAsync(userId))}
                >
                    Load
                </Button>
                <Form>
                    <Form.Item>
                        <Input
                            className='gamif-chat-box-input'
                            placeholder='Type a message...'
                            value={message}
                            onPressEnter={() => {
                                dispatch(sendMessageAsync(userId, message));
                                setMessage('');
                            }}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default connect(mapStateToProps)(ChatBox);
