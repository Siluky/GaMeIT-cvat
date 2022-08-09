// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import { Input, Form } from 'antd';
import 'gamification/gamif-styles.scss';
import React, { useEffect, useState } from 'react';

interface ChatBoxProps {
    userId: number;
}

interface Message {
    sender: boolean;
    content: string;
}

const chatMessage = (sender: boolean, message: string): JSX.Element => {
    const style = sender ? 'gamif-chat-box-message-right' : 'gamif-chat-box-message-left';
    return (
        <div className={style}>
            {message}
        </div>
    );
};

const dummyMessages = [{
    sender: true,
    content: 'Hey! How are you doing?',
},
{
    sender: false,
    content: 'Great. How about you?',
},
{
    sender: true,
    content: 'Doing well, thanks!',
},
];

export default function ChatBox(props: ChatBoxProps): JSX.Element {
    const { userId } = props;
    console.log('🚀 ~ file: chat-box.tsx ~ line 42 ~ ChatBox ~ userId', userId);

    const [messages, setMessages] = useState<Message[]>(dummyMessages);
    const [message, setMessage] = useState('');

    const addMessage = (newMessage: string): void => {
        const newArray = messages.concat([{ sender: true, content: newMessage }]);
        setMessage('');
        setMessages(newArray);
    };

    // TODO: on loadup, get messages from DB
    useEffect(() => {

    }, []);

    return (
        <>
            <div className='gamif-chat-box-container'>
                <div className='gamif-chat-box-messages-container'>
                    {messages.map((m) => chatMessage(m.sender, m.content))}
                </div>
                <div>
                    <Form>
                        <Form.Item>
                            <Input
                                className='gamif-chat-box-input'
                                placeholder='Type a message...'
                                value={message}
                                onPressEnter={() => addMessage(message)}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
}
