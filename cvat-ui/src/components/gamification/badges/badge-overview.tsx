// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import '../gamif-styles.scss';
import React from 'react';
import { BadgeIcon, BadgeGreyIcon } from 'icons';
import {
    Row,
    Col,
    Progress,
    Button,
    Tabs,
} from 'antd';

type Badge = {
    title: string;
    instruction: string;
    progress: number;
    goal: number;
    goalunit: string;
    got: boolean;
};

interface Props {
    // visible: boolean;
    allBadges: Badge[];
    currentBadge?: Badge;
}

const showBadges = (badges: Badge[]): JSX.Element => (
    <Row>
        {badges.map((badge: Badge) => (
            <Col span={4}>
                <Button
                    icon={badge.got ? <BadgeIcon /> : <BadgeGreyIcon />}
                    onClick={(): void => {
                        // TODO: Change selectedBadge through reducer
                    }}
                />
            </Col>
        ))}
    </Row>
);

const showSelectedBadge = (badge: Badge): JSX.Element => (
    <>
        <div className='gamif-badge-icon'>
            {badge.got ? <BadgeIcon /> : <BadgeGreyIcon />}
        </div>
        <div className='gamif-badge-details'>
            <strong>{badge.title}</strong>
            {badge.instruction}
            <Progress percent={badge.progress / badge.goal} />
            {`Current Progress: ${badge.progress} / ${badge.goal} ${badge.goalunit}`}
        </div>
    </>
);

export default function BadgeOverview(props: Props): JSX.Element {
    let { allBadges, currentBadge } = props;
    const badge1: Badge = {
        title: 'Badge 1',
        instruction: 'Annotate 5 livers',
        progress: 5,
        goal: 5,
        goalunit: 'Livers',
        got: true,
    };
    const badge2: Badge = {
        title: 'Badge 2',
        instruction: 'Annotate ten images',
        progress: 1,
        goal: 10,
        goalunit: 'Images',
        got: false,
    };

    allBadges = [badge1, badge2];
    currentBadge = badge1;

    return (
        <Tabs type='card' defaultActiveKey='1' className='badge-overview-tabs'>
            <Tabs.TabPane tab='Permanent Badges' key='1'>
                <div className='gamif-badge-overview-container'>
                    <div className='gamif-badge-overview-header' />
                    <div className='gamif-badge-overview-content'>
                        {showBadges(allBadges)}
                    </div>
                    <div className='gamif-badge-detail-view'>
                        {showSelectedBadge(currentBadge)}
                    </div>
                </div>
            </Tabs.TabPane>
            { /* TODO: Refactor */}
            <Tabs.TabPane tab='Seasonal Badges' key='2'>
                <div className='gamif-badge-overview-container'>
                    <div className='gamif-badge-overview-header' />
                    <div className='gamif-badge-overview-content'>
                        {showBadges(allBadges)}
                    </div>
                    <div className='gamif-badge-detail-view'>
                        {showSelectedBadge(currentBadge)}
                    </div>
                </div>
            </Tabs.TabPane>
        </Tabs>
    );
}
