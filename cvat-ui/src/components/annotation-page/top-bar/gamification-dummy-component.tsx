// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { saveUserData, updateUserData } from 'gamification/actions/user-data-actions';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export function GamificationDummy(): JSX.Element {
    const dispatch = useDispatch();
    const intervalTimer = 5000;

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(updateUserData('annotation_time', intervalTimer / 1000));
        }, intervalTimer);

        const interval2 = setInterval(() => {
            dispatch(saveUserData());
        }, 15000);

        const tabclose = (): void => {
            dispatch(saveUserData());
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
