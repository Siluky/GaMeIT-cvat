// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Row } from 'antd';
import Challenge from './challenge-component';
import 'gamification/gamif-styles.scss';

export default function ChallengeList(): JSX.Element {
    return (
        <>
            <Row>
                <Challenge id={1} />
            </Row>
            <Row>
                <Challenge id={2} />
            </Row>
            <Row>
                <Challenge id={3} />
            </Row>
        </>
    );
}
