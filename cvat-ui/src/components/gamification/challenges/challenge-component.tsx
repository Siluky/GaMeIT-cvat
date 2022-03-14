// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import '../gamif-styles.scss';
import React from 'react';

interface Props {
    id: number;
}

export default function Challenge(props: Props): JSX.Element {
    // TODO: Use antd.Progress! Probably make a challenge component
    const { id } = props;
    return (
        <div>
            {`Cool Challenge ${id}`}
        </div>
    );
}
