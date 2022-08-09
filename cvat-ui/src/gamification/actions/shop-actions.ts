// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { ActionCreator, AnyAction, Dispatch } from 'redux';
import getCore from 'cvat-core-wrapper';
import { ThunkAction } from 'redux-thunk';
import { ShopItem } from 'gamification/gamif-interfaces';
import { getCVATStore } from 'cvat-store';

const cvat = getCore();

export enum ShopActionTypes {
    GET_SHOP_DATA_ASYNC = 'GET_SHOP_DATA_ASYNC',
    GET_SHOP_DATA_FAILED = 'GET_SHOP_DATA_FAILED',
    GET_SHOP_DATA_SUCCESS = 'GET_SHOP_DATA_SUCCESS',

    UPDATE_BALANCE = 'UPDATE_BALANCE',

    SET_SELECTED_ITEM = 'SET_SELECTED_ITEM',

    PURCHASE_ITEM_SUCCESS = 'PURCHASE_ITEM_SUCCESS',
    PURCHASE_ITEM_FAILED = 'PURCHASE_ITEM_FAILED',
}

export function getShopDataFailed(error: any): AnyAction {
    return {
        type: ShopActionTypes.GET_SHOP_DATA_FAILED,
        payload: { error },
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

export function updateBalance(increment: number): AnyAction {
    return {
        type: ShopActionTypes.UPDATE_BALANCE,
        payload: increment,
    };
}

export function setSelectedItem(itemId: number): AnyAction {
    return {
        type: ShopActionTypes.SET_SELECTED_ITEM,
        payload: itemId,
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
    // console.log('🚀 ~ file: shop-actions.ts ~ line 83 ~ purchaseItem ~ state.currentBalance',
    // shopState.currentBalance);
    // console.log('🚀 ~ file: shop-actions.ts ~ line 84 ~ purchaseItem ~ item.price', item.price);
    return (dispatch) => {
        if (shopState.currentBalance <= item.price || item.bought) {
            dispatch(purchaseItemFailed());
        } else {
            dispatch(purchaseItemSuccess(itemId));
            dispatch(updateBalance(-item.price));
        }
    };
}
