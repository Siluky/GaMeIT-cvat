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

    SET_OVERLAY_MESSAGE = 'SET_OVERLAY_MESSAGE',

    UPGRADE_MONEY_BADGE_TIER = 'UPGRADE_MONEY_BADGE_TIER',
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
            const shopData = await cvat.shop.getData();

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

export function setOverlayMessage(msg: string): AnyAction {
    return {
        type: ShopActionTypes.SET_OVERLAY_MESSAGE,
        payload: msg,
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

export function upgradeMoneyBadgeTier(): AnyAction {
    return {
        type: ShopActionTypes.UPGRADE_MONEY_BADGE_TIER,
    };
}

export function useRepeatableItem(itemId: number): ThunkAction<void, {}, {}, AnyAction> {
    return (dispatch) => {
        const state = getCVATStore().getState();
        let overlayMessage = '';
        switch (itemId) {
            case 1: dispatch(incrementEnergy(10)); break;
            case 2: {
                const random = Math.random() * 100;
                if (random > 95) {
                    dispatch(purchaseItemSuccess(15));
                    overlayMessage = 'You received: Mystery Background.';
                } else if (random > 90) {
                    // buy secret item
                    dispatch(purchaseItemSuccess(25));
                    overlayMessage = 'You received: Mystery Profile Border.';
                } else if (random > 50) {
                    const energyGained = 5 + (Math.floor(Math.random()) * 5);
                    dispatch(incrementEnergy(energyGained));
                    overlayMessage = `You received: ${energyGained} Energy.`;
                } else if (random > 35) {
                    if (state.challenges.availableChallenges.length < 3) {
                        dispatch(addChallenge());
                    }
                    overlayMessage = 'You received: Additional Challenge.';
                } else if (random > 20) {
                    dispatch(updateUserData('streak_saver_active', 1));
                    overlayMessage = 'You received: Streak Saver.';
                } else {
                    overlayMessage = 'The gift was empty! Better luck next time.';
                }
                dispatch(updateUserData('mystery_gifts_bought', 1));
                break;
            }
            case 3: dispatch(addChallenge()); break;
            case 4: dispatch(updateUserData('streak_saver_active', 1)); break;
            case 5: dispatch(upgradeBadgeTier(12)); break;
            default: break;
        }
        dispatch(setOverlayMessage(overlayMessage));
    };
}

export function purchaseItem(itemId: number): ThunkAction<void, {}, {}, AnyAction> {
    const {
        shop, challenges, gamifuserdata, energizer,
    } = getCVATStore().getState();
    const item = shop.availableItems.find((_item: ShopItem) => _item.id === itemId);
    return (dispatch) => {
        if (shop.currentBalance < item.price || item.bought) {
            dispatch(purchaseItemFailed());
            // dispatch(setOverlayMessage('Insufficient Money.'));
        } else {
            // if at maximum energy, make user unable to buy charge pack
            if (item.id === 1 && energizer.energyLevel >= 20) {
                dispatch(setOverlayMessage('You already are at maximum energy.'));
                return;
            }
            // if no challenge slots are free, make user unable to buy challenges
            if (item.id === 3 && challenges.availableChallenges.length >= 3) {
                dispatch(setOverlayMessage('You already have 3 challenges.'));
                return;
            }
            // if user has a streak saver active, make him unable to buy another one
            if (item.id === 4 && gamifuserdata.userdata_session.streak_saver_active) {
                dispatch(setOverlayMessage('You already have a streak saver active.'));
                return;
            }

            dispatch(updateBalance(-item.price));
            dispatch(updateUserData('items_bought', 1));
            if (item.repeatable) {
                dispatch(useRepeatableItem(itemId));
            }
            // handle Money Badge differently -- allow buying exactly 3 times.
            if (item.id === 5) {
                dispatch(updateUserData('money_badge_tier', 1));
                if (gamifuserdata.userdata_total.money_badge_tier === 3) {
                    dispatch(purchaseItemSuccess(5));
                }
            } else {
                dispatch(purchaseItemSuccess(itemId));
            }
        }
    };
}
