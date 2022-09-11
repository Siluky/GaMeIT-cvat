// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { Badge, BadgeTier } from './gamif-interfaces';

// TODO: File for individual challenges / badges, mapping them to their IDs etc

export const badges: Badge[] = [
    {
        id: 1,
        title: 'Annotator',
        instruction: 'Annotate a total of x images',
        progress: 0,
        goal_bronze: 1,
        goal_silver: 5,
        goal: 10,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: 'Images',
        receivedOn: null,
        visible: true,
    },
    {
        id: 2,
        title: 'The Annotation Machine',
        instruction: 'Annotate a total of x images in one session',
        progress: 0,
        goal_bronze: 13,
        goal_silver: 25,
        goal: 40,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: 'Images',
        receivedOn: null,
        visible: true,
    },
    {
        id: 3,
        title: 'Tagger',
        instruction: 'Set a total of x tags',
        progress: 0,
        goal_bronze: 5,
        goal_silver: 10,
        goal: 20,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: 'Tags',
        receivedOn: null,
        visible: true,
    },
    {
        id: 4,
        title: 'Time Flies When...',
        instruction: 'Spend a total of x hours annotating',
        progress: 0,
        goal_bronze: 1,
        goal_silver: 5,
        goal: 10,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: 'Hours',
        receivedOn: null,
        visible: true,
    },
    {
        id: 5,
        title: 'Night Owl',
        instruction: 'Spend a total of x hours annotating at night',
        progress: 0,
        goal: 10,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: 'Hours',
        receivedOn: null,
        visible: false,
    },
];
