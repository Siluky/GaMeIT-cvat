// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { updateBadges } from 'gamification/actions/badge-actions';
import { getChallengesAsync, saveChallenges } from 'gamification/actions/challenge-actions';
import { toggleEnergyGain } from 'gamification/actions/energizer-actions';
import {
    getFriendsListAsync, loadStatus, rememberStatus, saveProfileDataAsync, setStatus,
} from 'gamification/actions/social-actions';
import {
    addGamifLog,
    saveUserData, updateUserData,
} from 'gamification/actions/user-data-actions';
import { OnlineStatus } from 'gamification/gamif-interfaces';
// import gamifconsts from 'gamification/gamifconsts';
import React, { useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useDispatch, useSelector } from 'react-redux';
import { CombinedState } from 'reducers/interfaces';

export function GamificationDummy(): JSX.Element {
    const dispatch = useDispatch();
    const intervalTimer = 10000; // TODO: Fix later!
    // const userdata = useSelector((state: CombinedState) => state.gamifuserdata);
    const { userId } = useSelector((state: CombinedState) => state.gamifuserdata);
    // const { energyGainEnabled } = useSelector((state: CombinedState) => state.energizer);
    const [idleTime, setIdleTime] = useState(0);
    const [active, setActive] = useState(true);
    // const [energizerTimer, setEnergizerTimer] = useState(0);

    const onIdle = (): void => {
        dispatch(toggleEnergyGain(false));
        // console.log('User is now idle');
        dispatch(addGamifLog('User is now idle'));
        setIdleTime(Date.now());
        setActive(false);
    };

    const onActive = (): void => {
        dispatch(toggleEnergyGain(true));
        // console.log(`User with id ${userId} is now active again
        // after ${Math.ceil((Date.now() - idleTime) / 1000)} seconds.`);

        dispatch(addGamifLog(`User with id ${userId} is now active again
        after ${Math.ceil((Date.now() - idleTime) / 1000)} seconds.`));
        setActive(true);
    };

    useIdleTimer({
        onIdle,
        onActive,
        timeout: 20_000,
        throttle: 1000,
    });

    // useEffect(() => {
    //     dispatch(initializeUserData());
    //     dispatch(getCurrentEnergyAsync());
    // }, []);

    // For "time annotated" incrementation
    useEffect(() => {
        const interval = setInterval(() => {
            // console.log('🚀 ~ file: gamification-dummy-component.tsx:53 ~ interval ~ active:', active);
            if (active) {
                // console.log('Saving');
                dispatch(updateUserData('annotation_time', intervalTimer / 1000));
                // dispatch(getFriendsListAsync());
                dispatch(updateBadges(false));
                dispatch(saveChallenges());
            }
        }, intervalTimer);
        return () => clearInterval(interval);
    }, [active]);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (active && energyGainEnabled) {
    //             setEnergizerTimer((prev) => prev + 1);
    //             console.log('🚀 ~ file: gam
    // ification-dummy-component.tsx:78 ~ interval ~ energizerTimer:', energizerTimer);
    //             if (energizerTimer >= gamifconsts.ENERGY_RATE) {
    //                 dispatch(updateBadges(false));
    //                 incrementEnergy(gamifconsts.ENERGY_INCREMENT);
    //                 setEnergizerTimer(0);
    //             }
    //         }
    //     }, 1000);
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(saveUserData(false));
            // Get friends list to update "friends online"-counter
            dispatch(getFriendsListAsync());
        }, 15000);

        dispatch(getChallengesAsync());

        /*         const visibilitychange = (): void => {
            if (document.visibilityState === 'hidden') {
                setCurrentStatus(status);
                dispatch(setStatus(OnlineStatus.OFFLINE));
                dispatch(saveProfileDataAsync());
                dispatch(saveUserData(true));
                dispatch(saveChallenges());
                console.log('hidden');
                dispatch(addGamifLog('Window hidden / Session end'));
            } else {
                dispatch(setStatus(currentStatus));
                dispatch(saveProfileDataAsync());
                console.log('visible');
            }
        }; */

        function saveAllUserData(): void {
            dispatch(saveProfileDataAsync());
            dispatch(saveUserData(true));
            dispatch(saveChallenges());
        }

        let isVisible = true; // internal flag, defaults to true

        function onVisible(): void {
            // prevent double execution
            if (isVisible) {
                return;
            }

            // change flag value
            isVisible = true;
            // dispatch(setStatus(currentStatus));
            dispatch(loadStatus());
            dispatch(saveProfileDataAsync());
            // Debug
            console.log('visible');
            dispatch(addGamifLog('Window visible'));
        }

        function onHidden(): void {
            // prevent double execution
            if (!isVisible) {
                return;
            }

            // change flag value
            isVisible = false;
            // TODO: Status is get from a "Stale State". EventListener is problem; need to find workaround.
            // setCurrentStatus(currentStatus);
            // console.log(`State before leaving window: ${status}`);
            dispatch(rememberStatus());
            dispatch(setStatus(OnlineStatus.AWAY));
            saveAllUserData();
            // Debug
            console.log('hidden');
            dispatch(addGamifLog('Window hidden'));
        }

        function handleVisibilityChange(forcedFlag: boolean | Event): void {
            // forcedFlag is a boolean when this event handler is triggered by a
            // focus or blur event, otherwise it's an Event object
            if (forcedFlag) {
                return onVisible();
            }
            return onHidden();
        }

        function handlePageHide(): void {
            dispatch(addGamifLog('Benutzer verlässt die Seite'));
            dispatch(setStatus(OnlineStatus.OFFLINE));
            // TODO: Check if works correctly
            // dispatch(addGamifLog('Nutzerstatus auf Offline gesetzt'));
            saveAllUserData();
        }

        window.addEventListener('pagehide', handlePageHide);
        document.addEventListener('pagehide', handlePageHide);

        // Code for tracking if user is inside the window or tabbed out
        document.addEventListener('visibilitychange', handleVisibilityChange, false);

        window.addEventListener('focus', () => {
            handleVisibilityChange(true);
        }, false);

        window.addEventListener('blur', () => {
            handleVisibilityChange(false);
        }, false);

        document.addEventListener('focus', () => {
            handleVisibilityChange(true);
        }, false);

        document.addEventListener('blur', () => {
            handleVisibilityChange(false);
        }, false);

        // document.addEventListener('visibilitychange', visibilitychange);

        return () => {
            clearInterval(interval);
            // window.removeEventListener('visibilitychange', visibilitychange);
            window.removeEventListener('focus', handleVisibilityChange);
            window.removeEventListener('blur', handleVisibilityChange);
            document.removeEventListener('focus', handleVisibilityChange);
            document.removeEventListener('blur', handleVisibilityChange);

            window.removeEventListener('pagehide', handlePageHide);
            document.removeEventListener('pagehide', handlePageHide);
        };
    }, []);

    /* const beforeUnloadHandler = (event: any): void => {
        // Recommended
        event.preventDefault();

        dispatch(setStatus(OnlineStatus.OFFLINE));
        dispatch(saveProfileDataAsync());
        dispatch(saveUserData(true));
        dispatch(saveChallenges());
        dispatch(addGamifLog('SESSION ENDED'));
        // Included for legacy support, e.g. Chrome/Edge < 119
        event.returnValue = true;
    };

    window.addEventListener('beforeunload', beforeUnloadHandler); */

    return <></>;
}
