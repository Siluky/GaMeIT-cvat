// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import 'gamification/gamif-styles.scss';

interface Props {
    id: number;
}

export default function Challenge(props: Props): JSX.Element {
    const x = props;
    return (
        <div>
            {`Cool Challenge ${x.id}`}
        </div>
    );
}
