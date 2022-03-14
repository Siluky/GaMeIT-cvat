// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';

interface Props {
    id: number;
}

export default function QuickStatistic(props: Props): JSX.Element {
    const x = props;

    return (
        <div>
            {`Statistic ${x.id}`}
        </div>
    );
}
