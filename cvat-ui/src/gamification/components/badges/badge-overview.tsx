// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import 'gamification/gamif-styles.scss';
import React, { useEffect } from 'react';
import {
    Row,
    Col,
    Progress,
    Button,
    Tabs,
} from 'antd';
import { connect, useDispatch, useSelector } from 'react-redux';
import { CombinedState } from 'reducers/interfaces';

import { BadgeIcon, BadgeGreyIcon } from 'icons';
import { CloseOutlined } from '@ant-design/icons';
import { Badge } from '../../gamif-interfaces';
import {
    setCurrentBadge,
    loadBadgesAsync,
    incrementBadge,
    toggleBadgeInProfile,
} from '../../actions/badge-actions';

interface BadgeOverviewProps {
    availableBadges: Badge[];
    currentUserId: number;
    currentBadgeId: number;
    currentBadge?: Badge;
    loadBadges: () => void;
    setCurrentBadge: (badgeId: number) => void;
    incrementBadge: (userId: number, badge: Badge, increment: number) => void;
}

interface StateToProps {
    currentUserId: number;
    currentBadgeId: number;
    availableBadges: Badge[];
}

interface DispatchToProps {
    loadBadges: () => void;
    setCurrentBadge: (badgeId: number) => void;
    incrementBadge: (userId: number, badge: Badge, increment: number) => void;
}

function mapStateToProps(state: CombinedState): StateToProps {
    const { badges } = state;

    return {
        currentUserId: badges.currentUserId,
        currentBadgeId: badges.selectedBadgeId,
        availableBadges: badges.availableBadges,
    };
}

function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        loadBadges: (): void => dispatch(loadBadgesAsync()),
        setCurrentBadge: (badgeId: number): void => dispatch(setCurrentBadge(badgeId)),
        // eslint-disable-next-line max-len
        incrementBadge: (userId: number, badge: Badge, increment: number): void => dispatch(incrementBadge(userId, badge, increment)),
    };
}

function showSelectedBadge(badge: Badge): JSX.Element {
    const progress = `Current Progress: ${badge.progress} / ${badge.goal} ${badge.goalunit}`;
    const receivedOn = `Achieved on ${badge.receivedOn}`;
    const dispatch = useDispatch();

    return (
        <>
            <div className='gamif-badge-icon'>
                {badge.got ? <BadgeIcon /> : <BadgeGreyIcon />}
            </div>
            <div className='gamif-badge-details'>
                <p><strong>{badge.title}</strong></p>
                <p>{badge.instruction}</p>
                <Progress percent={(badge.progress / badge.goal) * 100} />
                {badge.got ? receivedOn : progress}
                {badge.got && (
                    <div>
                        <Button
                            icon={<CloseOutlined />}
                            onClick={() => dispatch(toggleBadgeInProfile(badge.id))}
                            size='small'
                        />

                    </div>
                )}

            </div>
        </>
    );
}

export function BadgeOverview(props: BadgeOverviewProps): JSX.Element {
    const {
        currentUserId, currentBadgeId, availableBadges, loadBadges,
    } = props;
    const badges = useSelector((state: CombinedState) => state.badges);
    const defaultBadge = {
        id: 0,
        title: '',
        instruction: 'Select a Badge to see details about it!',
        progress: 0,
        goal: 10,
        goalunit: '',
        got: true,
        receivedOn: null,
        visible: true,
    };
    // Select a badge by id, or if none is available, go for a default
    const currentBadge = availableBadges.find((badge) => badge.id === currentBadgeId) || defaultBadge;
    const dispatch = useDispatch();

    // Load in badges from database on open of profile.
    useEffect(() => {
        console.log('Badge-Overview: useEffect Hook triggered');
        loadBadges();

        /* TODO: save badges to database when component unmounts (is this a good idea?)
        return () => {
            saveBadges();
        }; */
    }, []);

    // TODO: Add that only visible badges get shown
    return (
        <Tabs type='card' defaultActiveKey='1' className='badge-overview-tabs'>
            <Tabs.TabPane tab='Permanent Badges' key='1'>
                <div className='gamif-badge-overview-container'>
                    <div className='gamif-badge-overview-content'>
                        <Row>
                            {Object.values(badges.availableBadges).map((badge: Badge) => (
                                <Col span={4}>
                                    <Button
                                        className='gamif-badge-overview-individual-badge'
                                        type='text'
                                        icon={badge.got ? <BadgeIcon /> : <BadgeGreyIcon />}
                                        onClick={(): void => { dispatch(setCurrentBadge(badge.id)); }}
                                    />
                                </Col>
                            ))}
                            <Button
                                type='text'
                                onClick={(): void => {
                                    dispatch(incrementBadge(currentUserId, currentBadge, 1));
                                }}
                            >
                                +
                            </Button>
                            <Button
                                type='text'
                                onClick={(): void => {
                                    dispatch(incrementBadge(currentUserId, currentBadge, -1));
                                }}
                            >
                                -
                            </Button>
                        </Row>
                    </div>
                    <div className='gamif-badge-detail-view'>
                        {showSelectedBadge(currentBadge)}
                    </div>
                </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Seasonal Badges' key='2'>
                <Row>
                    {badges.badgesinProfile.map((id: number) => {
                        const badge = badges.availableBadges.find((b: Badge) => b.id === id);
                        if (badge) {
                            return (
                                <Col span={4}>
                                    <Button
                                        type='text'
                                        icon={badge.got ? <BadgeIcon /> : <BadgeGreyIcon />}
                                        onClick={(): void => { dispatch(setCurrentBadge(badge.id)); }}
                                    />
                                    {badge.id}
                                </Col>
                            );
                        }
                        return 'No badge found';
                    })}
                </Row>
            </Tabs.TabPane>
        </Tabs>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(BadgeOverview);
