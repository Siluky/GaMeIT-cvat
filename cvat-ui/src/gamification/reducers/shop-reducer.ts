// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { ShopActionTypes } from '../actions/shop-actions';
import { ShopState } from '../gamif-interfaces';

const defaultState: ShopState = {
    id: 0,
};

export default (state = defaultState, action: AnyAction): ShopState => {
    switch (action.type) {
        case ShopActionTypes.GET_SHOP_ITEMS: {
            return {
                ...state,
                // TODO:
            };
        }

        default: {
            return state;
        }
    }
};
