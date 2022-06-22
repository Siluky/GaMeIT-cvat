// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import '../gamif-styles.scss';
import React from 'react';
import 'gamification/gamif-styles.scss';

interface Props {
    id: number;
}

export default function ShopItem(props: Props): JSX.Element {
    // TODO: Individual shop items
    const { id } = props;
    return (
        <>{`Cool Shop item ${id}`}</>
    );
}
