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
    overlayMessage: '',
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
            return {
                ...state,
                availableItems: itemsInit,
            };
        }

        case ShopActionTypes.UPDATE_BALANCE: {
            return {
                ...state,
                currentBalance: action.payload,
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
                    if (_item.id === action.payload && !_item.repeatable) {
                        return { ..._item, bought: true };
                    }
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

        case ShopActionTypes.SET_SHOP_OVERLAY_MESSAGE: {
            return {
                ...state,
                overlayMessage: action.payload,
            };
        }

        // case ShopActionTypes.UPGRADE_MONEY_BADGE_TIER: {
        //     let newTier = BadgeTier.NOT_OBTAINED;
        //     switch (state.moneyBadgeTier) {
        //         case BadgeTier.NOT_OBTAINED: newTier = BadgeTier.BRONZE; break;
        //         case BadgeTier.BRONZE: newTier = BadgeTier.SILVER; break;
        //         case BadgeTier.SILVER: newTier = BadgeTier.GOLD; break;
        //         case BadgeTier.GOLD: newTier = BadgeTier.GOLD; break;
        //         default: break;
        //     }
        //     return {
        //         ...state,
        //         moneyBadgeTier: newTier,
        //     };
        // }

        default: {
            return state;
        }
    }
};
