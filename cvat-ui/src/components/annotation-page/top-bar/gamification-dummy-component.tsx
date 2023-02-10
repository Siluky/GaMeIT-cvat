// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { getChallengesAsync, saveChallenges } from 'gamification/actions/challenge-actions';
import { setStatus } from 'gamification/actions/social-actions';
import {
    saveUserData, setSurveyTiming, toggleSurveyPrompt, updateUserData,
} from 'gamification/actions/user-data-actions';
import { OnlineStatus } from 'gamification/gamif-interfaces';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CombinedState } from 'reducers/interfaces';

export function GamificationDummy(): JSX.Element {
    const dispatch = useDispatch();
    const intervalTimer = 5000;
    const userdata = useSelector((state: CombinedState) => state.gamifuserdata);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(updateUserData('annotation_time', intervalTimer / 1000));
        }, intervalTimer);

        const interval2 = setInterval(() => {
            dispatch(saveUserData(false));
        }, 15000);

        dispatch(getChallengesAsync());

        const tabclose = (e: BeforeUnloadEvent): string | undefined => {
            if (userdata.surveyTiming !== 2) {
                dispatch(setStatus(OnlineStatus.OFFLINE));
                // dispatch(saveProfileDataAsync());
                dispatch(saveUserData(true));
                dispatch(saveChallenges());
                dispatch(setSurveyTiming(2));
                dispatch(toggleSurveyPrompt(true));
                e.preventDefault();
                const confirmationMessage = 'Before you leave, it would be great if you could do a quick survey using the link in the survey popup.';
                e.returnValue = confirmationMessage;
                return confirmationMessage;
            } return undefined;
        };

        window.addEventListener('beforeunload', tabclose);

        return () => {
            clearInterval(interval);
            clearInterval(interval2);
            window.removeEventListener('beforeunload', tabclose);
        };
    }, []);

    return <></>;
}
