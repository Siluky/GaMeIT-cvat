// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import { Input, Form } from 'antd';
import { getChatHistoryAsync, sendMessageAsync } from 'gamification/actions/social-actions';
import { addGamifLog } from 'gamification/actions/user-data-actions';
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
    formattedMessage += '.';
    formattedMessage += msg.timestamp.substring(5, 7);
    formattedMessage += ', ';
    formattedMessage += msg.timestamp.substring(11, 16);

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

    const scrolltoTop = (): void => {
        const elem = document.getElementById(`chat-${userId}`);
        if (elem) { elem.scrollTop = elem.scrollHeight; }
    };

    useEffect(() => {
        dispatch(getChatHistoryAsync(userId));
        scrolltoTop();

        const interval = setInterval(() => {
            // console.log(`fetching chat history for ${userId}`);
            dispatch(getChatHistoryAsync(userId));
            // scrolltoTop();
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const elem = document.getElementById(`chat-${userId}`);
        if (elem) {
            if (elem?.scrollTop + elem?.clientHeight >= elem.scrollHeight) {
                elem.scrollTop = elem.scrollHeight;
            }
        }
    }, [messages]);

    return (
        <>
            <div className='gamif-chat-box-container'>
                <div id={`chat-${userId}`} className='gamif-chat-box-messages-container'>
                    {messages.map((m, index) => chatMessage(m, index)).reverse()}
                </div>
                {/* <Button
                    type='text'
                    className='gamif-debug-button'
                    onClick={() => dispatch(getChatHistoryAsync(userId))}
                >
                    Load
                </Button> */}
                <Form>
                    <Form.Item>
                        <Input
                            className='gamif-chat-box-input'
                            placeholder='Type a message...'
                            value={message}
                            onPressEnter={() => {
                                dispatch(sendMessageAsync(userId, message));
                                dispatch(addGamifLog('Sent a chat message'));
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
