// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import styled from 'styled-components';

const MAXIMUM_ENERGY = 20;
const ENERGIZER_COST = 10;
const ENERGY_RATE = 120000; // in milliseconds
const ENERGY_INCREMENT = 1;

const QUIZ_DUEL_ROUNDS = 5;

export default {
    MAXIMUM_ENERGY,
    ENERGIZER_COST,
    ENERGY_RATE,
    ENERGY_INCREMENT,
    QUIZ_DUEL_ROUNDS,
};

export const Popup = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background: #fff;
padding: 12px 24px;
border-radius: 4px;
text-align: center;
box-shadow: 2px 7px 18px 3px #d2d2d2;
color: black;
z-index: 3;
`;
