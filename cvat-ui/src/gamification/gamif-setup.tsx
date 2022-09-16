// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import {
    AndroidFilled, AndroidOutlined, CheckCircleOutlined, QuestionOutlined,
} from '@ant-design/icons';

export const mapStatisticIdtoIcon = (id: number): JSX.Element => {
    switch (id) {
        case 1: return <AndroidFilled />;
        case 2: return <AndroidOutlined />;
        case 3: return <QuestionOutlined />;
        default: return <CheckCircleOutlined />;
    }
};
