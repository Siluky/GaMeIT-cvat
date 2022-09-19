// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import {
    AndroidFilled, AndroidOutlined, DownCircleFilled, DownCircleTwoTone, LeftCircleFilled,
    LeftCircleOutlined, LeftCircleTwoTone, QuestionOutlined, RightCircleFilled,
    RightCircleOutlined, UpCircleFilled, UpCircleOutlined, UpCircleTwoTone,
} from '@ant-design/icons';

export const mapStatisticIdtoIcon = (id: number): JSX.Element => {
    switch (id) {
        case 1: return <AndroidFilled />;
        case 2: return <AndroidOutlined />;
        case 3: return <QuestionOutlined />;
        case 4: return <UpCircleFilled />;
        case 5: return <DownCircleFilled />;
        case 6: return <UpCircleOutlined />;
        case 7: return <DownCircleTwoTone />;
        case 8: return <DownCircleTwoTone />;
        case 9: return <UpCircleTwoTone />;
        case 10: return <LeftCircleFilled />;
        case 11: return <LeftCircleOutlined />;
        case 12: return <LeftCircleTwoTone />;
        case 13: return <RightCircleFilled />;
        default: return <RightCircleOutlined />;
    }
};
