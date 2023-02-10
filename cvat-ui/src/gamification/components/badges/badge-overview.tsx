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
    // Tabs,
} from 'antd';
import { connect, useDispatch, useSelector } from 'react-redux';
import { CombinedState } from 'reducers/interfaces';
import {
    CheckSquareOutlined, CloseSquareOutlined,
} from '@ant-design/icons';
import { getBadgeIcon } from 'gamification/gamif-items';
import { Badge, BadgeTier } from '../../gamif-interfaces';
import {
    setCurrentBadge,
    loadBadgesAsync,
    incrementBadge,
    toggleBadgeInProfile,
    // upgradeBadgeTier,
    saveSelectedBadges,
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
    let progress = `Progress: ${Math.min(badge.progress, goal)} / ${goal} ${badge.goalunit}`;
    // const receivedOn = `Achieved on ${badge.receivedOn}`;
    const receivedOn = `Achieved on ${badge.receivedOn}`;
    const dispatch = useDispatch();
    const badges = useSelector((state: CombinedState) => state.badges);

    let formattedInstruction = '';

    // special formatting for "Time Flies When" Badge
    if (badge.id === 4) {
        // eslint-disable-next-line max-len
        progress = `Progress: ${Math.min(Math.round((badge.progress / 3600) * 10) / 10, goal / 3600)} / ${goal / 3600} ${badge.goalunit}`;
        formattedInstruction = badge.instruction.replace('GOAL', (goal / 3600).toString());
    } else { formattedInstruction = badge.instruction.replace('GOAL', goal.toString()); }

    const isBadgeSelected = badges.badgesinProfile.includes(badge.id);
    const profileText = !isBadgeSelected ? 'Add to Profile' : 'Remove from profile';

    return (
        <>
            <div
                className='gamif-badge-icon'
                style={{ opacity: badge.tier === BadgeTier.NOT_OBTAINED ? 0.5 : 1 }}
            >
                {getBadgeIcon(badge.id, badge.tier)}
            </div>
            <div className='gamif-badge-details'>
                <p className='gamif-badge-detail-title'><strong>{badge.title}</strong></p>
                <p className='gamif-badges-instruction'>{formattedInstruction}</p>
                <Progress percent={Math.floor((badge.progress / goal) * 100)} />
                {/* {badge.tier !== BadgeTier.GOLD && progress} */}
                <span>{progress}</span>
                {badge.tier !== BadgeTier.NOT_OBTAINED && (
                    <>
                        <div>
                            <div>
                                {receivedOn}
                            </div>
                            <Button
                                className='gamif-badge-detail-profile-button-wrapper'
                                onClick={() => {
                                    dispatch(toggleBadgeInProfile(badge.id));
                                    dispatch(saveSelectedBadges(badges.badgesinProfile));
                                }}
                            >
                                <Button
                                    className='gamif-badges-profile-button'
                                    icon={
                                        isBadgeSelected ? <CheckSquareOutlined /> : <CloseSquareOutlined />
                                    }
                                    // onClick={() => {
                                    //     dispatch(toggleBadgeInProfile(badge.id));
                                    //     dispatch(saveSelectedBadges(badges.badgesinProfile));
                                    // }}
                                    size='small'
                                />
                                {profileText}
                                {/* <Button
                                    className='gamif-debug-button'
                                    icon={<UpOutlined />}
                                    onClick={() => dispatch(upgradeBadgeTier(badge.id))}
                                    size='small'
                                >
                                    Upgrade
                                </Button> */}
                            </Button>
                        </div>
                    </>
                )}
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
    useEffect(() => {
        loadBadges();
    }, []);

    return (
        <div className='gamif-badge-overview-container'>
            <div className='gamif-badge-overview-header'> Badge Overview </div>
            <div className='gamif-badge-overview-content'>
                <Row>
                    {Object.values(badges.availableBadges).map((badge: Badge, index: number) => {
                        if (badge.visible) {
                            const isBadgeSelected = badges.badgesinProfile.includes(badge.id);
                            const classes = isBadgeSelected ? 'selected' : '';

                            return (
                                <Col
                                    span={4}
                                    style={{ opacity: badge.tier === BadgeTier.NOT_OBTAINED ? 0.4 : 1 }}
                                    key={index}
                                >
                                    <Button
                                        key={index}
                                        className={`gamif-badge-overview-individual-badge ${classes}`}
                                        type='text'
                                        icon={getBadgeIcon(badge.id, badge.tier)}
                                        onClick={(): void => {
                                            dispatch(setCurrentBadge(badge.id));
                                        }}
                                    />
                                </Col>
                            );
                        }
                        return null;
                    })}
                </Row>
            </div>
            <div className='gamif-badge-detail-view'>
                {showSelectedBadge(currentBadge)}
            </div>
        </div>
    );
    // return (
    //     <Tabs type='card' defaultActiveKey='1' className='badge-overview-tabs'>
    //         <Tabs.TabPane tab='Permanent Badges' key='1'>
    //             <div className='gamif-badge-overview-container'>
    //                 <div className='gamif-badge-overview-content'>
    //                     <Row>
    //                         {Object.values(badges.availableBadges).map((badge: Badge, index: number) => {
    //                             if (badge.visible) {
    //                                 return (
    //                                     <Col
    //                                         span={4}
    //                                         style={{ opacity: badge.tier === BadgeTier.NOT_OBTAINED ? 0.4 : 1 }}
    //                                         key={index}
    //                                     >
    //                                         <Button
    //                                             key={index}
    //                                             className='gamif-badge-overview-individual-badge'
    //                                             type='text'
    //                                             icon={getBadgeIcon(badge.id, badge.tier)}
    //                                             onClick={(): void => { dispatch(setCurrentBadge(badge.id)); }}
    //                                         />
    //                                     </Col>
    //                                 );
    //                             }
    //                             return null;
    //                         })}

    //                         <Button
    //                             type='text'
    //                             className='gamif-debug-button'
    //                             onClick={(): void => {
    //                                 dispatch(updateBadges(availableBadges, true));
    //                             }}
    //                         >
    //                             Update
    //                         </Button>
    //                         <Button
    //                             type='text'
    //                             className='gamif-debug-button'
    //                             onClick={(): void => {
    //                                 dispatch(loadBadges());
    //                             }}
    //                         >
    //                             Load
    //                         </Button>
    //                     </Row>
    //                 </div>
    //                 <div className='gamif-badge-detail-view'>
    //                     {showSelectedBadge(currentBadge)}
    //                 </div>
    //             </div>
    //         </Tabs.TabPane>
    //         <Tabs.TabPane tab='Seasonal Badges' key='2'>
    //             <Row>
    //                 {badges.badgesinProfile.map((id: number) => {
    //                     const badge = badges.availableBadges.find((b: Badge) => b.id === id);
    //                     if (badge) {
    //                         return (
    //                             <Col span={4}>
    //                                 <Button
    //                                     type='text'
    //                                     icon={getBadgeIcon(badge.id, badge.tier)}
    //                                     onClick={(): void => { dispatch(setCurrentBadge(badge.id)); }}
    //                                 />
    //                                 {badge.id}
    //                             </Col>
    //                         );
    //                     }
    //                     return 'No badge found';
    //                 })}
    //             </Row>
    //         </Tabs.TabPane>
    //     </Tabs>
    // );
}

export default connect(mapStateToProps, mapDispatchToProps)(BadgeOverview);
