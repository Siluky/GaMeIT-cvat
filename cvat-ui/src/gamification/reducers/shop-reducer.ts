// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';

import { items } from 'gamification/gamif-items';
import { ShopActionTypes } from '../actions/shop-actions';
import { ShopItem, ShopState } from '../gamif-interfaces';

const defaultState: ShopState = {
    currentBalance: 0,
    availableItems: items,
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

        case ShopActionTypes.INIT_SHOP: {
            // eslint-disable-next-line max-len
            const itemsInit = state.availableItems.map((item) => (action.payload.find((id: number) => id === item.id) ? { ...item, bought: true } : item));
            console.log('🚀 ~ file: shop-reducer.ts ~ line 40 ~ action.payload', action.payload);
            console.log('🚀 ~ file: shop-reducer.ts ~ line 41 ~ itemsInit', itemsInit);
            return {
                ...state,
                availableItems: itemsInit,
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

        case ShopActionTypes.USE_ITEM_SUCCESS: {
            return {
                ...state,
            };
        }

        case ShopActionTypes.USE_ITEM_FAILED: {
            return {
                ...state,
            };
        }

        case ShopActionTypes.PURCHASE_ITEM_SUCCESS: {
            const updatedItems = state.availableItems.map(
                (_item: ShopItem) => {
                    if (_item.id === action.payload && !_item.repeatable) { return { ..._item, bought: true }; }
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
