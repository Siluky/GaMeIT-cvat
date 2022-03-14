// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import BadgeOverview from './badge-overview';
import BadgeDetails from './badge-details';

export default function BadgeProfile(): JSX.Element {
    return (
        <div style={{ width: 300, height: 300 }}>
            {/* TODO: Seasonal/Permanent Badge Tabs */}
            <BadgeOverview />
            <BadgeDetails />
        </div>
    );
}
