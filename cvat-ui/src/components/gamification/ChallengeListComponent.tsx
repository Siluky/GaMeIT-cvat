// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Row } from 'antd';
import ChallengeComponent from 'components/gamification/ChallengeComponent';

export default function ChallengeListComponent(): JSX.Element {
    return (
        <>
            <Row>
                <ChallengeComponent />
            </Row>
            <Row>
                <ChallengeComponent />
            </Row>
            <Row>
                <ChallengeComponent />
            </Row>
        </>
    );
}
