// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import '../gamif-styles.scss';
import React from 'react';

interface Props {
    id: number;
}

export default function Statistic(props: Props): JSX.Element {
    const { id } = props;
    return (
        <>{`Statistic ${id}`}</>
    );
}
