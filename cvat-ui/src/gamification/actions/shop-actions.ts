// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
/* eslint-disable import/no-cycle */

import { ActionCreator, AnyAction, Dispatch } from 'redux';
import getCore from 'cvat-core-wrapper';
import { ThunkAction } from 'redux-thunk';
import { ShopItem } from 'gamification/gamif-interfaces';
import { getCVATStore } from 'cvat-store';
import { incrementEnergy } from './energizer-actions';
import { addChallenge } from './challenge-actions';
import { upgradeBadgeTier } from './badge-actions';
import { updateUserData } from './user-data-actions';

const cvat = getCore();

export enum ShopActionTypes {
    GET_SHOP_DATA_ASYNC = 'GET_SHOP_DATA_ASYNC',
    GET_SHOP_DATA_FAILED = 'GET_SHOP_DATA_FAILED',
    GET_SHOP_DATA_SUCCESS = 'GET_SHOP_DATA_SUCCESS',

    INIT_SHOP = 'INIT_SHOP',

    UPDATE_BALANCE = 'UPDATE_BALANCE',

    SET_SELECTED_ITEM = 'SET_SELECTED_ITEM',
    USE_ITEM_FAILED = 'USE_ITEM_FAILED',
    USE_ITEM_SUCCESS = 'USE_ITEM_SUCCESS',

    PURCHASE_ITEM_SUCCESS = 'PURCHASE_ITEM_SUCCESS',
    PURCHASE_ITEM_FAILED = 'PURCHASE_ITEM_FAILED',
}

export function getShopDataFailed(error: any): AnyAction {
    return {
        type: ShopActionTypes.GET_SHOP_DATA_FAILED,
        payload: { error },
    };
}

export function initShop(ids: number[]): AnyAction {
    return {
        type: ShopActionTypes.INIT_SHOP,
        payload: ids,
    };
}

export function getShopDataSuccess(items: ShopItem[]): AnyAction {
    return {
        type: ShopActionTypes.GET_SHOP_DATA_SUCCESS,
        payload: items,
    };
}

export function getShopDataAsync(): ThunkAction<void, {}, {}, AnyAction> {
    return async function getShopDataThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        try {
            const shopData = await cvat.shop.getData(); // TODO:

            dispatch(getShopDataSuccess(shopData));
        } catch (error) {
            dispatch(getShopDataFailed(error));
        }
    };
}

function updateBalanceSuccess(newBalance: number): AnyAction {
    return {
        type: ShopActionTypes.UPDATE_BALANCE,
        payload: newBalance,
    };
}

export function updateBalance(increment: number): ThunkAction<void, {}, {}, AnyAction> {
    return (dispatch) => {
        const state = getCVATStore().getState();

        const maxCoins = state.gamifuserdata.userdata_total.annotation_coins_max;
        const newBalance = state.shop.currentBalance + increment;

        if (newBalance > maxCoins) { dispatch(updateUserData('annotation_coins_max', newBalance)); }
        dispatch(updateBalanceSuccess(newBalance));
    };
}

export function setSelectedItem(itemId: number): AnyAction {
    return {
        type: ShopActionTypes.SET_SELECTED_ITEM,
        payload: itemId,
    };
}

export function useItemSuccess(itemId: number): AnyAction {
    return {
        type: ShopActionTypes.USE_ITEM_SUCCESS,
        payload: itemId,
    };
}

export function useItemFailed(itemId: number): AnyAction {
    return {
        type: ShopActionTypes.USE_ITEM_FAILED,
        payload: itemId,
    };
}

export function useRepeatableItem(itemId: number): ThunkAction<void, {}, {}, AnyAction> {
    return (dispatch) => {
        const state = getCVATStore().getState();
        switch (itemId) {
            case 1: dispatch(incrementEnergy(10)); break;
            case 2: {
                const random = Math.random() * 100;
                console.log('🚀 ~ file: shop-window.tsx ~ line 50 ~ mysteryGift ~ random', random);

                if (random > 95) {
                    // buy secret item
                } else if (random > 90) {
                    // buy secret item
                } else if (random > 50) {
                    dispatch(incrementEnergy(10));
                } else if (random > 35 && state.challenges.availableChallenges.length < 3) {
                    dispatch(addChallenge());
                } else if (random > 20) {
                    // TODO: add streak saver
                } else {
                    // get nothing
                }
            } break;
            case 3: dispatch(addChallenge()); break;
            case 4: // TODO: Streak saver; break;
            case 5: dispatch(upgradeBadgeTier(12)); break; // TODO: Money Badge
            default: break;
        }
    };
}

export function purchaseItemFailed(): AnyAction {
    return {
        type: ShopActionTypes.PURCHASE_ITEM_FAILED,
    };
}

export function purchaseItemSuccess(itemId: number): AnyAction {
    return {
        type: ShopActionTypes.PURCHASE_ITEM_SUCCESS,
        payload: itemId,
    };
}

export function purchaseItem(itemId: number): ThunkAction<void, {}, {}, AnyAction> {
    const shopState = getCVATStore().getState().shop;
    const item = shopState.availableItems.find((_item: ShopItem) => _item.id === itemId);
    return (dispatch) => {
        if (shopState.currentBalance <= item.price || item.bought) {
            dispatch(purchaseItemFailed());
        } else {
            dispatch(updateBalance(-item.price));
            dispatch(purchaseItemSuccess(itemId));
            dispatch(updateUserData('items_bought', 1));
            if (item.repeatable) { dispatch(useRepeatableItem(itemId)); }
        }
    };
}
