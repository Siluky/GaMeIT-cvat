// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { updateUserData } from 'gamification/actions/user-data-actions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CombinedState } from '../../../reducers/interfaces';

export function GamificationDummy(): JSX.Element {
    const dispatch = useDispatch();
    const udata = useSelector((state: CombinedState) => state.gamifuserdata);

    useEffect(() => {

    });

    useEffect(() => {
        console.log('Dummy element works');
        const interval = setInterval(() => {
            dispatch(updateUserData('annotation_time', 10));
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    console.log((udata.userdata_total.last_login) / 1000);
    console.log((udata.userdata_session.last_login) / 1000);
    // eslint-disable-next-line max-len
    console.log(`Time since login: ${(udata.userdata_session.last_login - udata.userdata_total.last_login) / 1000 / 60}`);
    // eslint-disable-next-line max-len
    console.log(`Time this session: ${(Date.now() - udata.userdata_session.last_login) / 1000 / 60}`);

    return <></>;
}
