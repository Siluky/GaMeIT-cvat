// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import {
    Badge, BadgeTier, Statistic, UserData,
} from './gamif-interfaces';

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

export const stats: Statistic[] = [
    {
        id: 1,
        value: 0,
        unit: 'Images',
        tooltip_total: 'Images annotated total',
        tooltip_session: 'Images annotated this session',
    },
    {
        id: 2,
        value: 0,
        unit: 'Tags',
        tooltip_total: 'Tags set in total',
        tooltip_session: '',
    },
    {
        id: 3,
        value: 0,
        unit: 'Images',
        tooltip_total: 'Images annotated at night',
        tooltip_session: '',
    },
    {
        id: 4,
        value: 0,
        unit: 'hrs',
        tooltip_total: 'Time spent annotating',
        tooltip_session: '',
    },
    {
        id: 5,
        value: 0,
        unit: '',
        tooltip_total: '',
        tooltip_session: '',
    },

];

export function mapStatisticIdtoFieldName(id: number): keyof UserData {
    switch (id) {
        case 1: return 'images_annotated';
        case 2: return 'tags_set';
        case 3: return 'annotation_time';
        case 4: return 'annotation_streak_current';
        case 5: return 'annotation_time';
        case 6: return 'energy_gained';
        case 7: return 'tetris_played';
        case 8: return 'quiz_played';
        case 9: return 'snake_played';
        case 10: return 'challenges_completed';
        case 11: return 'items_bought';
        case 12: return 'annotation_coins_obtained';
        case 13: return 'annotation_coins_max';
        default: return 'images_annotated';
    }
}
