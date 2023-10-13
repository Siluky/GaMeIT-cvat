// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';

import { ActionCreator, AnyAction, Dispatch } from 'redux';
import { notification } from 'antd';
import Popover from 'antd/lib/popover';
import getCore from 'cvat-core-wrapper';
import { getCVATStore } from 'cvat-store';
import { ThunkAction } from 'redux-thunk';
import { decodeBadgeTier, encodeBadgeTier } from 'gamification/gamif-items';
import { Provider } from 'react-redux';
import BadgeOverview from 'gamification/components/badges/badge-overview';
import { Badge, BadgeTier, EnergizerType } from '../gamif-interfaces';
// eslint-disable-next-line import/no-cycle
import { addGamifLog, updateUserData } from './user-data-actions';
import { getBadgeValue } from '../gamif-items';

const cvat = getCore();

export enum BadgeActionTypes {
    INIT_PROFILE_BADGES = 'INIT_BADGES',
    LOAD_BADGES = 'LOAD_BADGES',
    SET_USER_PROFILE = 'SET_USER_PROFILE',
    LOAD_BADGES_FAILED = 'LOAD_BADGES_FAILED',
    LOAD_BADGES_SUCCESS = 'LOAD_BADGES_SUCCESS',
    SET_CURRENT_BADGE = 'SET_CURRENT_BADGE',
    INCREMENT_BADGE_SUCCESS = 'INCREMENT_BADGE_SUCCESS',
    INCREMENT_BADGE_FAILED = 'INCREMENT_BADGE_FAILED',
    SAVE_BADGES = 'SAVE_BADGES',
    SAVE_BADGE_STATUS_SUCCESS = 'SAVE_BADGE_STATUS_SUCCESS',
    SAVE_BADGE_STATUS_FAILED = 'SAVE_BADGE_STATUS_FAILED',
    ADD_BADGE_TO_PROFILE_SUCCESS = 'ADD_BADGE_TO_PROFILE_SUCCESS',
    ADD_BADGE_TO_PROFILE_FAILED = 'ADD_BADGE_TO_PROFILE_FAILED',
    SAVE_SELECTED_BADGES_FAILED = 'SAVE_SELECTED_BADGES_FAILED',
    SAVE_SELECTED_BADGES_SUCCESS = 'SAVE_SELECTED_BADGES_SUCCESS',

    REMOVE_BADGE_FROM_PROFILE = 'REMOVE_BADGE_FROM_PROFILE',
    UPDATE_BADGE_TIERS_FAILED = 'UPDATE_BADGE_TIERS_FAILED',
    UPDATE_BADGE_TIERS_SUCCESS = 'UPDATE_BADGE_TIERS_SUCCESS',
    UPGRADE_BADGE_TIER = 'UPGRADE_BADGE_TIER',

    UPDATE_ENERGIZER_BADGE = 'UPDATE_ENERGIZER_BADGE',

    SET_BADGE_OVERLAY_MESSAGE = 'SET_BADGE_OVERLAY_MESSAGE',

    RESET_BADGES = 'RESET_BADGES',
    RESET_BADGES_ERROR = 'RESET_BADGES_ERROR',
    RESET_BADGES_SUCCESS = 'RESET_BADGES_SUCCESS',
}

export function setBadgeOverlayMesage(msg: string): AnyAction {
    return {
        type: BadgeActionTypes.SET_BADGE_OVERLAY_MESSAGE,
        payload: msg,
    };
}

export function initProfileBadges(badgeIds: number[]): AnyAction {
    return {
        type: BadgeActionTypes.INIT_PROFILE_BADGES,
        payload: badgeIds,
    };
}

/** Dispatched when loading of badges failed */
function loadBadgesFailed(error: any): AnyAction {
    const action = {
        type: BadgeActionTypes.LOAD_BADGES_FAILED,
        payload: error,
    };
    return action;
}

/** Dispatched when loading of badges succeeded */
function loadBadgesSuccess(badges: Badge[]): AnyAction {
    const action = {
        type: BadgeActionTypes.LOAD_BADGES_SUCCESS,
        payload: badges,
    };
    return action;
}

/** Try to load badges from database
 * @async
 * @returns a list of badges or an error
*/
export function loadBadgesAsync(): ThunkAction<void, {}, {}, AnyAction> {
    return async function loadBadgesThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        const { availableBadges } = getCVATStore().getState().badges;

        try {
            const badgeStatusImport = await cvat.badges.getStatus();
            const badgeswithtiers = availableBadges.map((badge: Badge) => {
                const entry = badgeStatusImport.find((el: any) => el.badgeId === badge.id);
                if (entry) {
                    return {
                        ...badge,
                        tier: decodeBadgeTier(entry.tier),
                        visible: true,
                        receivedOn: entry.receivedOn ?? null,
                    };
                }
                return badge;
            });
            const order = Object.values(BadgeTier);
            badgeswithtiers.sort((a: Badge, b: Badge) => order.indexOf(b.tier) - order.indexOf(a.tier));

            dispatch(loadBadgesSuccess(badgeswithtiers));
        } catch (error) {
            dispatch(loadBadgesFailed(error));
        }
    };
}

/** Dispatched when incrementing badge succeeded */
function incrementBadgeSuccess(badge: Badge): AnyAction {
    const action = {
        type: BadgeActionTypes.INCREMENT_BADGE_SUCCESS,
        payload: badge,
    };
    return action;
}

/** Dispatched when incrementing badge failed */
function incrementBadgeFailed(error: any): AnyAction {
    const action = {
        type: BadgeActionTypes.INCREMENT_BADGE_FAILED,
        payload: { error },
    };
    return action;
}

/** Increment the current value of a badge that belongs to the current user
 * @param userId: The id of the current user
 * @param badge: The badge to increment
 * @param increment: The amount by which to increment the badge
 */
export function incrementBadge(userId: number, badge: Badge, increment: number): ThunkAction<void, {}, {}, AnyAction> {
    return async function loadBadgesThunk(dispatch: ActionCreator<Dispatch>): Promise<void> {
        try {
            const updatedBadge = await cvat.badges.save(userId, badge.id, badge.progress + increment);
            dispatch(incrementBadgeSuccess(updatedBadge));
        } catch (error) {
            dispatch(incrementBadgeFailed(error));
        }
    };
}

/** Save badges to database */
export function saveBadges(): AnyAction {
    // TODO:

    return {
        type: BadgeActionTypes.SAVE_BADGES,
        payload: { },
    };
}

/** Set the currently selected badge to show in detail view */
export function setCurrentBadge(badgeId: number): AnyAction {
    return {
        type: BadgeActionTypes.SET_CURRENT_BADGE,
        payload: badgeId,

    };
}

export function addBadgetoProfileSuccess(badgeId: number): AnyAction {
    return {
        type: BadgeActionTypes.ADD_BADGE_TO_PROFILE_SUCCESS,
        payload: badgeId,
    };
}

export function addBadgetoProfileFailed(): AnyAction {
    return {
        type: BadgeActionTypes.ADD_BADGE_TO_PROFILE_FAILED,
        payload: { },

    };
}

export function removeBadgefromProfile(badgeId: number): AnyAction {
    return {
        type: BadgeActionTypes.REMOVE_BADGE_FROM_PROFILE,
        payload: badgeId,
    };
}

export function toggleBadgeInProfile(badgeId: number): ThunkAction<void, {}, {}, AnyAction> {
    const badgeState = getCVATStore().getState().badges;
    const found = badgeState.badgesinProfile.find((el: number) => el === badgeId);
    return (dispatch) => {
        if (found) {
            dispatch(removeBadgefromProfile(badgeId));
        } else if (badgeState.badgesinProfile.length >= 3) {
            dispatch(setBadgeOverlayMesage('You can only select 3 badges at a time.'));
            dispatch(addBadgetoProfileFailed());
        } else {
            dispatch(addBadgetoProfileSuccess(badgeId));
        }
    };
}

export function upgradeBadgeTier(id: number): AnyAction {
    return {
        type: BadgeActionTypes.UPGRADE_BADGE_TIER,
        payload: id,
    };
}

function saveBadgeStatusSuccess(): AnyAction {
    return {
        type: BadgeActionTypes.SAVE_BADGE_STATUS_SUCCESS,
    };
}

function saveBadgeStatusFailed(error: any): AnyAction {
    return {
        type: BadgeActionTypes.SAVE_BADGE_STATUS_FAILED,
        payload: error,
    };
}

export function saveBadgeStatus(uId: number, badgeId: number, tier: BadgeTier): ThunkAction<void, {}, {}, AnyAction> {
    return async (dispatch) => {
        try {
            await cvat.badges.save(uId, badgeId, encodeBadgeTier(tier));
            dispatch(saveBadgeStatusSuccess());
        } catch (error: any) {
            dispatch(saveBadgeStatusFailed(error));
        }
    };
}

function saveSelectedBadgesSuccess(): AnyAction {
    return {
        type: BadgeActionTypes.SAVE_SELECTED_BADGES_SUCCESS,
    };
}

function saveSelectedBadgesFailed(error: any): AnyAction {
    return {
        type: BadgeActionTypes.SAVE_SELECTED_BADGES_FAILED,
        payload: error,
    };
}

export function saveSelectedBadges(selectedBadgeIds: number[]): ThunkAction<void, {}, {}, AnyAction> {
    const { userId } = getCVATStore().getState().gamifuserdata;
    return async (dispatch) => {
        try {
            let badgeIds = '';
            for (const id of selectedBadgeIds) {
                badgeIds += id.toString();
                badgeIds += ',';
            }
            badgeIds = badgeIds.slice(0, -1); // remove trailing comma
            if (!badgeIds) { badgeIds = '0'; }
            await cvat.badges.saveSelected(userId, badgeIds);
            dispatch(saveSelectedBadgesSuccess());
        } catch (error: any) {
            dispatch(saveSelectedBadgesFailed(error));
        }
    };
}

function updateBadgesSuccess(badges: Badge[]): AnyAction {
    return {
        type: BadgeActionTypes.UPDATE_BADGE_TIERS_SUCCESS,
        payload: badges,
    };
}

function updateBadgesFailed(error: any): AnyAction {
    return {
        type: BadgeActionTypes.UPDATE_BADGE_TIERS_FAILED,
        payload: error,
    };
}

function resetBadgesSuccess(): AnyAction {
    return {
        type: BadgeActionTypes.RESET_BADGES_SUCCESS,
    };
}

function resetBadgesError(error : any): AnyAction {
    return {
        type: BadgeActionTypes.RESET_BADGES_ERROR,
        payload: error,
    };
}

export function resetBadges(): ThunkAction<void, {}, {}, AnyAction> {
    return async (dispatch) => {
        const state = getCVATStore().getState();
        const badges = state.badges.availableBadges;
        const uId = state.gamifuserdata.userId;
        try {
            badges.forEach((badge: { id: number; }) => {
                dispatch(saveBadgeStatus(uId, badge.id, BadgeTier.NOT_OBTAINED));
            });
            dispatch(resetBadgesSuccess);
        } catch (error) {
            dispatch(resetBadgesError(error));
        }
    };
}

export function updateBadges(init: boolean): ThunkAction<void, {}, {}, AnyAction> {
    return async (dispatch) => {
        // eslint-disable-next-line no-debugger
        // debugger;
        const state = getCVATStore().getState();
        const badges = state.badges.availableBadges;
        const userDataState = state.gamifuserdata;
        try {
            const updatedBadges = badges.map((badge: Badge) => {
                let updatedTier = BadgeTier.NOT_OBTAINED;
                // const updatedProgress = userdata[mapBadgeIdtoField(badge.id)];
                const updatedProgress = getBadgeValue(badge.id);
                if (updatedProgress >= badge.goal) {
                    updatedTier = BadgeTier.GOLD;
                } else if (badge.goal_silver && updatedProgress >= badge.goal_silver) {
                    updatedTier = BadgeTier.SILVER;
                } else if (badge.goal_bronze && updatedProgress >= badge.goal_bronze) {
                    updatedTier = BadgeTier.BRONZE;
                }

                if (encodeBadgeTier(updatedTier) > encodeBadgeTier(badge.tier) && !init) {
                    // console.log(`Upgrading tier of badge ${badge.title} to ${updatedTier}`);
                    dispatch(addGamifLog(`Upgrading tier of badge ${badge.title} to ${updatedTier}`));
                    dispatch(updateUserData('badges_obtained', 1));
                    cvat.badges.save(userDataState.userId, badge.id, encodeBadgeTier(updatedTier));
                    // eslint-disable-next-line security/detect-non-literal-fs-filename
                    notification.open({
                        message: 'Badge Obtained!',
                        // description: `Congratulations! You obtained the ${badge.title} Badge (${updatedTier})!`,
                        description: (
                            <div>
                                <p>
                                    Congratulations! You obtained the&nbsp;
                                    {badge.title}
                                    Badge&nbsp;
                                    {updatedTier}
                                    !
                                </p>
                                <Popover
                                    placement='leftTop'
                                    overlayClassName='gamif-popover'
                                    trigger='click'
                                    content={<Provider store={getCVATStore()}><BadgeOverview /></Provider>}
                                    mouseLeaveDelay={10}
                                    destroyTooltipOnHide
                                    onVisibleChange={(visible) => {
                                        if (visible) {
                                            dispatch(setCurrentBadge(badge.id));
                                        }
                                    }}
                                >
                                    <p>Click here to see the new Badge!</p>
                                </Popover>
                            </div>
                        ),
                    });
                    // load badges again so received date is properly displayed
                    dispatch(loadBadgesAsync());
                }

                // switch visibility to true if badge is obtained,
                // otherwise preserve its inert visibility (i.e., don't reveal hidden badges)
                const updatedVisible = updatedTier === BadgeTier.NOT_OBTAINED ? badge.visible : true;
                const updatedBadge = {
                    ...badge, tier: updatedTier, progress: updatedProgress, visible: updatedVisible,
                    // ...badge, tier: 0, progress: 0, visible: false, receivedOn: null,
                };
                return updatedBadge;
            });

            const order = Object.values(BadgeTier);
            updatedBadges.sort((a: any, b: any) => order.indexOf(b.tier) - order.indexOf(a.tier));

            dispatch(updateBadgesSuccess(updatedBadges));
        } catch (error) {
            dispatch(updateBadgesFailed(error));
        }
    };
}

export function updateEnergizerBadge(energizer: EnergizerType): AnyAction {
    return {
        type: BadgeActionTypes.UPDATE_ENERGIZER_BADGE,
        payload: energizer,
    };
}
