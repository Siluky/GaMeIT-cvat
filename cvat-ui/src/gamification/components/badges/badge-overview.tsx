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
    notification,
} from 'antd';
import { connect, useDispatch, useSelector } from 'react-redux';
import { CombinedState } from 'reducers/interfaces';

import { BadgeIcon, BadgeGreyIcon } from '../../../icons';
import { Badge } from '../../gamif-interfaces';
import { setCurrentBadge } from '../../actions/badge-actions';

// TODO: add if necessary
interface BadgeOverviewProps {
    currentBadge: Badge;
    setCurrentBadge: (badge: Badge) => void;
}

interface StateToProps {
    currentBadge: Badge;
}

interface DispatchToProps {
    setCurrentBadge: (badge: Badge) => void;
}

function mapStateToProps(state: CombinedState): StateToProps {
    const { badges } = state;

    return {
        currentBadge: badges.selectedBadge,
    };
}

function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        setCurrentBadge: (badge: Badge): void => dispatch(setCurrentBadge(badge)),
    };
}

const showSelectedBadge = (badge: Badge): JSX.Element => (
    // TODO: Show a tooltip when no badge is selected
    <>
        <div className='gamif-badge-icon'>
            {badge.got ? <BadgeIcon /> : <BadgeGreyIcon />}
        </div>
        <div className='gamif-badge-details'>
            <p><strong>{badge.title}</strong></p>
            <p>{badge.instruction}</p>
            <Progress percent={(badge.progress / badge.goal) * 100} />
            {`Current Progress: ${badge.progress} / ${badge.goal} ${badge.goalunit}`}
        </div>
    </>
);

export function BadgeOverview(props: BadgeOverviewProps): JSX.Element {
    const badges = useSelector((state: CombinedState) => state.badges); // TODO:
    const dispatch = useDispatch();

    const { currentBadge } = props;

    // Load in badges from database on open of profile.
    useEffect(() => {
        try {
            // const loadedBadges: any = {}; // TODO: Check if this typing is okay
            // TODO: Load in badges from database //  update badge data
            // for-loop

            // dispatch(loadBadges(loadedBadges));
        } catch {
            notification.error({
                message: 'Failed to load badges.',
                className: 'gamif-badge-load-fail',
            });
        }
    }, []);
    // TODO: Add that only visible badges get shown
    return (
        <Tabs type='card' defaultActiveKey='1' className='badge-overview-tabs'>
            <Tabs.TabPane tab='Permanent Badges' key='1'>
                <div className='gamif-badge-overview-container'>
                    <div className='gamif-badge-overview-header' />
                    <div className='gamif-badge-overview-content'>
                        <Row>
                            {Object.values(badges.availableBadges).map((badge: Badge) => (
                                <Col span={4}>
                                    <Button
                                        type='text'
                                        icon={badge.got ? <BadgeIcon /> : <BadgeGreyIcon />}
                                        onClick={(): void => { dispatch(setCurrentBadge(badge)); }}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </div>
                    <div className='gamif-badge-detail-view'>
                        {showSelectedBadge(currentBadge)}
                    </div>
                </div>
            </Tabs.TabPane>
            { /* TODO: Refactor */}
            <Tabs.TabPane tab='Seasonal Badges' key='2'>
                TODO: Seasonal Badges
            </Tabs.TabPane>
        </Tabs>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(BadgeOverview);
