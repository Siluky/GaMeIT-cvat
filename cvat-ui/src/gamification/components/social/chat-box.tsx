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

const chatMessage = (sender: boolean, message: string, index: number): JSX.Element => {
    const style = sender ? 'gamif-chat-box-message-right' : 'gamif-chat-box-message-left';
    return (
        <div className={style} key={index}>
            {message}
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
                    {messages.map((m, index) => chatMessage(m.sender, m.content, index))}
                </div>
                <Button type='text' onClick={() => dispatch(getChatHistoryAsync(userId))}> Load </Button>
                <div>
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
            </div>
        </>
    );
}

export default connect(mapStateToProps)(ChatBox);
