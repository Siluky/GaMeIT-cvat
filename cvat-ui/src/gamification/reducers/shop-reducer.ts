// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { ShopActionTypes } from '../actions/shop-actions';
import { ShopItem, ShopState } from '../gamif-interfaces';

const dummyItems: ShopItem[] = [{
    id: 1,
    title: 'Cool item 123',
    price: 100,
    bought: true,
    iconpath: '',
    onPurchase: () => {},
},
{
    id: 2,
    title: 'Red Avatar Border',
    price: 80,
    bought: false,
    iconpath: '',
    onPurchase: () => {},
},
{
    id: 3,
    title: 'Charge Pack',
    price: 500,
    bought: true,
    iconpath: '',
    onPurchase: () => {},
},
{
    id: 4,
    title: 'Cool item 123',
    price: 100,
    bought: true,
    iconpath: '',
    onPurchase: () => {},
},
];

const defaultState: ShopState = {
    currentBalance: 0,
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
                currentBalance: state.currentBalance - action.payload,
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
