// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import 'gamification/gamif-styles.scss';
import React from 'react';
import {
    Row,
    Col,
    Progress,
    Button,
    Tabs,
} from 'antd';
import { connect, useDispatch, useSelector } from 'react-redux';
import { CombinedState } from 'reducers/interfaces';
import { CloseOutlined, UpOutlined } from '@ant-design/icons';
import { getBadgeIcon } from 'gamification/gamif-items';
import { Badge, BadgeTier } from '../../gamif-interfaces';
import {
    setCurrentBadge,
    loadBadgesAsync,
    incrementBadge,
    toggleBadgeInProfile,
    updateBadges,
    upgradeBadgeTier,
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
    const relevantGoal = (): number => {
        if (badge.tier === BadgeTier.NOT_OBTAINED && badge.goal_bronze) {
            return badge.goal_bronze;
        } if (badge.tier === BadgeTier.BRONZE && badge.goal_silver) { return badge.goal_silver; }
        return badge.goal;
    };
    const goal = relevantGoal();
    console.log('🚀 ~ file: badge-overview.tsx ~ line 76 ~ showSelectedBadge ~ goal', goal);
    const progress = `Current Progress: ${Math.min(badge.progress, goal)} / ${goal} ${badge.goalunit}`;
    // const receivedOn = `Achieved on ${badge.receivedOn}`;
    const receivedOn = `Achieved on ${Date.now()}`;
    const dispatch = useDispatch();

    const formattedInstruction = badge.instruction.replace('GOAL', goal.toString());

    return (
        <>
            <div
                className='gamif-badge-icon'
                style={{ opacity: badge.tier === BadgeTier.NOT_OBTAINED ? 0.5 : 1 }}
            >
                {getBadgeIcon(badge.id, badge.tier)}
            </div>
            <div className='gamif-badge-details'>
                <p><strong>{badge.title}</strong></p>
                <p className='gamif-badges-instruction'>{formattedInstruction}</p>
                <Progress percent={Math.floor((badge.progress / goal) * 100)} />
                {/* {badge.tier !== BadgeTier.GOLD && progress} */}
                <span>{progress}</span>
                {badge.tier !== BadgeTier.NOT_OBTAINED && (
                    <>
                        <span>{receivedOn}</span>
                        <div>
                            <Button
                                icon={<CloseOutlined />}
                                onClick={() => dispatch(toggleBadgeInProfile(badge.id))}
                                size='small'
                            >
                                Add to Profile
                            </Button>
                        </div>
                    </>
                )}
                <Button
                    className='gamif-debug-button'
                    icon={<UpOutlined />}
                    onClick={() => dispatch(upgradeBadgeTier(badge.id))}
                    size='small'
                />
            </div>
        </>
    );
}

export function BadgeOverview(props: BadgeOverviewProps): JSX.Element {
    const {
        currentBadgeId, availableBadges, loadBadges,
    } = props;
    const badges = useSelector((state: CombinedState) => state.badges);
    const defaultBadge: Badge = {
        id: 0,
        title: '',
        instruction: 'Select a Badge to see details about it!',
        progress: 0,
        goal: 10,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: '',
        receivedOn: null,
        visible: true,
    };
    // Select a badge by id, or if none is available, go for a default
    const currentBadge = availableBadges.find((badge) => badge.id === currentBadgeId) || defaultBadge;
    const dispatch = useDispatch();

    // Load in badges from database on open of profile.
    // useEffect(() => {
    //     loadBadges();
    // }, []);

    return (
        <Tabs type='card' defaultActiveKey='1' className='badge-overview-tabs'>
            <Tabs.TabPane tab='Permanent Badges' key='1'>
                <div className='gamif-badge-overview-container'>
                    <div className='gamif-badge-overview-content'>
                        <Row>
                            {Object.values(badges.availableBadges).map((badge: Badge, index: number) => {
                                if (badge.visible) {
                                    return (
                                        <Col
                                            span={4}
                                            style={{ opacity: badge.tier === BadgeTier.NOT_OBTAINED ? 0.4 : 1 }}
                                            key={index}
                                        >
                                            <Button
                                                key={index}
                                                className='gamif-badge-overview-individual-badge'
                                                type='text'
                                                icon={getBadgeIcon(badge.id, badge.tier)}
                                                onClick={(): void => { dispatch(setCurrentBadge(badge.id)); }}
                                            />
                                        </Col>
                                    );
                                }
                                return null;
                            })}

                            <Button
                                type='text'
                                className='gamif-debug-button'
                                onClick={(): void => {
                                    dispatch(updateBadges(availableBadges, true));
                                }}
                            >
                                Update
                            </Button>
                            <Button
                                type='text'
                                className='gamif-debug-button'
                                onClick={(): void => {
                                    dispatch(loadBadges());
                                }}
                            >
                                Load
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
                                        icon={getBadgeIcon(badge.id, badge.tier)}
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
