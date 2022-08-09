// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import 'gamification/gamif-styles.scss';
import {
    Button,
    Avatar,
    Row,
    Col,
} from 'antd';
import Icon, {
    MailFilled,
    UserOutlined,
} from '@ant-design/icons';
import { OnlineStatus, Profile } from 'gamification/gamif-interfaces';
import { useDispatch } from 'react-redux';
import { toggleChat } from 'gamification/actions/social-actions';
import CvatTooltip from 'components/common/cvat-tooltip';

import SVGTimeIcon from 'assets/time-icon.svg';
import SVGBrain from 'assets/brain.svg';
import SVGLoadingItem from 'assets/loading-item.svg';

interface QuickProfileProps {
    profile: Profile,
}

const TestIcon1 = (props: any): JSX.Element => <Icon component={SVGTimeIcon} {...props} />;
const TestIcon2 = (props: any): JSX.Element => <Icon component={SVGBrain} {...props} />;
const TestIcon3 = (props: any): JSX.Element => <Icon component={SVGLoadingItem} {...props} />;

export default function QuickProfile(props: QuickProfileProps): JSX.Element {
    const { profile } = props;
    const dispatch = useDispatch();

    let statusStyle = {};
    switch (profile.status) {
        case OnlineStatus.ONLINE: statusStyle = { background: 'green' }; break;
        case OnlineStatus.DO_NOT_DISTURB: statusStyle = { background: 'red' }; break;
        case OnlineStatus.OFFLINE: statusStyle = { background: 'grey' }; break;
        default: statusStyle = { background: 'grey' };
    }

    return (
        <div className='gamif-quick-profile-container'>
            <div className='gamif-quick-profile'>
                <div className='gamif-quick-profile status'>
                    <div className='gamif-quick-profile-status-icon' style={statusStyle}> &nbsp; </div>
                    <span className='gamif-quick-profile-status-text'>{profile.status}</span>
                </div>
                <div className='gamif-quick-profile-avatar-name-container'>
                    <Avatar className='gamif-quick-profile-avatar' size={40} icon={<UserOutlined />} />
                    <span className='gamif-quick-profile-name'>{profile.username}</span>
                </div>
                <div className='gamif-quick-profile badges'>
                    <Row>

                        <Col>
                            <CvatTooltip overlay='Annotation Champion: 01-08-2022'>
                                <TestIcon3 />
                            </CvatTooltip>
                        </Col>
                        <Col>
                            <CvatTooltip overlay='Night Owl: 03-04-2022'>
                                <TestIcon1 />
                            </CvatTooltip>
                        </Col>
                        <Col>
                            <CvatTooltip overlay='Quiz Master: 21-06-2022' title='test'>
                                <TestIcon2 />
                            </CvatTooltip>
                        </Col>
                    </Row>

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
