// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import {
    GreenAvatarBorderIcon,
    RedAvatarBorderIcon,
    LoadingItemIcon,
} from 'icons';
import { ShopActionTypes } from '../actions/shop-actions';
import { ShopItem, ShopState } from '../gamif-interfaces';

const dummyItems: ShopItem[] = [{
    id: 1,
    title: 'Charge Pack',
    price: 100,
    bought: false,
    icon: GreenAvatarBorderIcon,
    onPurchase: () => {},
},
{
    id: 2,
    title: 'Mystery Gift',
    price: 80,
    bought: false,
    icon: RedAvatarBorderIcon,
    onPurchase: () => {},
},
{
    id: 4,
    title: 'Locked',
    price: 100,
    bought: false,
    icon: LoadingItemIcon,
    onPurchase: () => {},
},
{
    id: 4,
    title: 'Locked',
    price: 100,
    bought: false,
    icon: LoadingItemIcon,
    onPurchase: () => {},
},
{
    id: 4,
    title: 'Locked',
    price: 100,
    bought: false,
    icon: LoadingItemIcon,
    onPurchase: () => {},
},
{
    id: 4,
    title: 'Locked',
    price: 100,
    bought: false,
    icon: LoadingItemIcon,
    onPurchase: () => {},
},
{
    id: 4,
    title: 'Locked',
    price: 100,
    bought: false,
    icon: LoadingItemIcon,
    onPurchase: () => {},
},
{
    id: 4,
    title: 'Locked',
    price: 100,
    bought: false,
    icon: LoadingItemIcon,
    onPurchase: () => {},
},
{
    id: 4,
    title: 'Locked',
    price: 100,
    bought: false,
    icon: LoadingItemIcon,
    onPurchase: () => {},
},
];

const defaultState: ShopState = {
    currentBalance: 100,
    availableItems: dummyItems,
    selectedItemId: 0,
};

export default (state = defaultState, action: AnyAction): ShopState => {
    switch (action.type) {
        case ShopActionTypes.GET_SHOP_DATA_ASYNC: {
            return {
                ...state,
            };
        }

        case ShopActionTypes.GET_SHOP_DATA_SUCCESS: {
            return {
                ...state,
            };
        }

        case ShopActionTypes.GET_SHOP_DATA_FAILED: {
            return {
                ...state,
            };
        }

        case ShopActionTypes.UPDATE_BALANCE: {
            return {
                ...state,
                currentBalance: state.currentBalance + action.payload,
            };
        }

        case ShopActionTypes.SET_SELECTED_ITEM: {
            return {
                ...state,
                selectedItemId: action.payload,
            };
        }

        case ShopActionTypes.PURCHASE_ITEM_SUCCESS: {
            const updatedItems = state.availableItems.map(
                (_item: ShopItem) => {
                    if (_item.id === action.payload) { return { ..._item, bought: true }; }
                    return _item;
                },
            );

            return {
                ...state,
                availableItems: updatedItems,
            };
        }

        case ShopActionTypes.PURCHASE_ITEM_FAILED: {
            return {
                ...state,
            };
        }

        default: {
            return state;
        }
    }
};
