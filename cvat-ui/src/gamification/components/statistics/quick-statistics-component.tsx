// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import 'gamification/gamif-styles.scss';
import React from 'react';

interface Props {
    id: number;
}

export default function QuickStatistic(props: Props): JSX.Element {
    const { id } = props;

    return (
        <div>
            {`Statistic ${id}`}
        </div>
    );
}
