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
import { BadgeStatus, Profile } from 'gamification/gamif-interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { toggleChat } from 'gamification/actions/social-actions';
import CvatTooltip from 'components/common/cvat-tooltip';
import { CombinedState } from 'reducers/interfaces';
import {
    getBadgeIcon, getProfileBackground, getProfileBackgroundElements,
    getProfileBorder, getProfileClassNames, getstatusStyle,
} from 'gamification/gamif-items';
// import { BadgeTooltipTest } from 'icons';

interface QuickProfileProps {
    profile: Profile,
}

const quickProfileBadges = (statuses: BadgeStatus[]): JSX.Element => {
    const badges = useSelector((state: CombinedState) => state.badges);

    // const today = new Date();
    // const dd = String(today.getDate()).padStart(2, '0');
    // const mm = String(today.getMonth() + 1).padStart(2, '0');
    // const yyyy = today.getFullYear();

    // const todayFormatted = `${mm}/${dd}/${yyyy}`;

    if (!statuses) return <></>;

    const selectedBadges = statuses.map((badgeStatus, index) => {
        const badge = badges.availableBadges.find((_badge) => _badge.id === badgeStatus.id);
        if (badge) {
            return (
                <Col key={index}>
                    <CvatTooltip
                        overlay={(
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div>
                                    {badge.title}
                                </div>
                                <div>
                                    Achieved on
                                    &nbsp;
                                    {badgeStatus.receivedOn}
                                </div>
                            </div>
                        )}
                    >
                        <Button
                            key={index}
                            className='gamif-quick-profile-single-badge'
                            type='text'
                            icon={getBadgeIcon(badgeStatus.id, badgeStatus.tier)}
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

export default function QuickProfile(props: QuickProfileProps): JSX.Element {
    const { profile } = props;
    const dispatch = useDispatch();
    const pstyle = profile.profileStyle;

    return (
        <div
            className={`gamif-quick-profile-container ${getProfileClassNames(pstyle.additionalClassNames)}`}
            style={{
                background: getProfileBackground(pstyle.background),
                border: getProfileBorder(pstyle.border),
                // color: pstyle.color,
            }}
        >
            <div className='gamif-quick-profile-background-effects-wrapper'>
                {getProfileBackgroundElements(pstyle.backgroundElements)}
            </div>
            <div className='gamif-quick-profile-content'>
                <div className='gamif-quick-profile status'>
                    <div className='gamif-quick-profile-status-icon' style={getstatusStyle(profile.status)}> &nbsp; </div>
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
                        {quickProfileBadges(profile.selectedBadgeStatuses)}
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
