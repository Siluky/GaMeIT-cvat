// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
// import getCore from 'cvat-core-wrapper';

// const cvat = getCore();

export enum ShopActionTypes {
    GET_SHOP_ITEMS = 'GET_SHOP_ITEMS',
}

export function getItems(): AnyAction {
    return {
        type: ShopActionTypes.GET_SHOP_ITEMS,
    };
}
