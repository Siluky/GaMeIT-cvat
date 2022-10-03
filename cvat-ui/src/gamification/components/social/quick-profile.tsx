// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import 'gamification/gamif-styles.scss';
import 'gamification/gamif-profile-styles.scss';
import {
    Button,
    // Avatar,
    Row,
    Col,
} from 'antd';
import {
    MailFilled,
} from '@ant-design/icons';
import { OnlineStatus, Profile } from 'gamification/gamif-interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { toggleChat } from 'gamification/actions/social-actions';
import CvatTooltip from 'components/common/cvat-tooltip';
import { CombinedState } from 'reducers/interfaces';
import { getBadgeIcon } from 'gamification/gamif-items';
// import { BadgeTooltipTest } from 'icons';

interface QuickProfileProps {
    profile: Profile,
}

const quickProfileBadges = (badgeids: number[]): JSX.Element => {
    const badges = useSelector((state: CombinedState) => state.badges);

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const todayFormatted = `${mm}/${dd}/${yyyy}`;

    const selectedBadges = badgeids.map((id, index) => {
        const badge = badges.availableBadges.find((_badge) => _badge.id === id);
        if (badge) {
            return (
                <Col key={index}>
                    <CvatTooltip overlay={`${badge.title}: Achieved on ${todayFormatted}` ?? 'Unknown Badge'}>
                        <Button
                            key={index}
                            className='gamif-quick-profile-single-badge'
                            type='text'
                            icon={getBadgeIcon(badge.id, badge.tier)}
                        />
                    </CvatTooltip>
                </Col>
            );
        }
        return <></>;
    });

    return (
        <>
            {selectedBadges}
        </>
    );
};

const showBackGroundElements = (id: number): JSX.Element => {
    switch (id) {
        case 1: return (
            <>
                <div className='night'>
                    <div className='shooting_star'> </div>
                    <div className='shooting_star'> </div>
                    <div className='shooting_star'> </div>
                    <div className='shooting_star'> </div>
                    <div className='shooting_star'> </div>
                    <div className='shooting_star'> </div>
                    <div className='shooting_star'> </div>
                    <div className='shooting_star'> </div>
                    <div className='shooting_star'> </div>
                    <div className='shooting_star'> </div>
                    <div className='shooting_star'> </div>
                    <div className='shooting_star'> </div>
                </div>
            </>
        );
        default: return <></>;
    }
};

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

    const pstyle = profile.profileStyle;
    // const avatar = getAvatar(pstyle.avatar);

    return (
        <div
            className={`gamif-quick-profile-container ${pstyle.additionalClassNames}`}
            style={{ background: pstyle.background, border: pstyle.border, color: pstyle.color }}
        >
            <div className='gamif-quick-profile-background-effects-wrapper'>
                {showBackGroundElements(pstyle.backgroundElements)}
            </div>
            <div className='gamif-quick-profile-content'>
                <div className='gamif-quick-profile status'>
                    <div className='gamif-quick-profile-status-icon' style={statusStyle}> &nbsp; </div>
                    &nbsp;
                    <span className='gamif-quick-profile-status-text'>{profile.status}</span>
                </div>
                <div className='gamif-quick-profile-avatar-name-container'>
                    {/* <Avatar
                        className='gamif-quick-profile-avatar'
                        style={{ border: pstyle.avatarBorder }}
                        size={40}
                        icon={avatar}
                    /> */}
                    <span className='gamif-quick-profile-name'>{profile.username}</span>
                </div>
                <div className='gamif-quick-profile badges'>
                    <Row>
                        {quickProfileBadges(profile.selectedBadges)}
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
