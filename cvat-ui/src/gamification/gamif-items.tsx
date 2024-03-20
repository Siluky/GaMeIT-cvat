// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import 'gamification/gamif-styles.scss';
import 'gamification/gamif-profile-styles.scss';

import {
    ThunderboltFilled,
    UserOutlined, UserAddOutlined, UserDeleteOutlined,
    UserSwitchOutlined, UsergroupAddOutlined,
} from '@ant-design/icons';
import {
    AddChallengeIcon,
    AnnotationCoinsMaxIcon,
    AnnotationCoinsObtainedIcon,
    AnnotationMachineBronze, AnnotationMachineGold, AnnotationMachineGrey, AnnotationMachineSilver,
    AnnotationStreakIcon,
    AnnotationTimeIcon,
    AnnotatorBronze, AnnotatorGold, AnnotatorGrey, AnnotatorSilver,
    AvgTimeIcon,
    BadgeGreyIcon,
    BadgesObtainedIcon,
    BalancedEnergyBronze, BalancedEnergyGold, BalancedEnergyGrey, BalancedEnergySilver,
    ChallengerBronze, ChallengerGold, ChallengerGrey, ChallengerSilver,
    ChallengesIcon,
    ChatMenaceGold,
    ChatMenaceGrey,
    CobraGold,
    CobraGrey,
    EforEffortGold,
    EforEffortGrey,
    EnergizedBronze, EnergizedGold, EnergizedGrey, EnergizedSilver,
    EnergizerIcon,
    EnergizerIcon1,
    EnergizerIcon2,
    EnergizerIcon3,
    EnergizerIcon4,
    EnergizerIcon5,
    EnergizerIcon6,
    EnergizerIcon7,
    EnergizerIcon8,
    EnergizerIcon9,
    EnergizerIcon10,
    EnergizerIcon20,
    EnergyCollectorBronze, EnergyCollectorGold, EnergyCollectorGrey, EnergyCollectorSilver,
    EnergyGainedIcon,
    FunHaterGold,
    FunHaterGrey,
    HoarderBronze, HoarderGold, HoarderGrey, HoarderSilver,
    ImagesAnnotatedIcon,
    ItemsBoughtIcon,
    MillionaireBronze, MillionaireGold, MillionaireGrey, MillionaireSilver,
    MoneyManBronze, MoneyManGold, MoneyManGrey, MoneyManSilver,
    MysteryGiftBadgeBronze,
    MysteryGiftBadgeGold,
    MysteryGiftBadgeGrey,
    MysteryGiftBadgeSilver,
    MysteryGiftIcon,
    NightOwlGold,
    NightOwlGrey,
    QuizIcon,
    SerialAnnotatorBronze, SerialAnnotatorGold, SerialAnnotatorGrey, SerialAnnotatorSilver,
    SnakeIcon,
    StreakSaverIcon,
    PolygonProBronze, PolygonProGold, PolygonProGrey, PolygonProSilver,
    TagsSetIcon,
    TetrisGold,
    TetrisGrey,
    TetrisIcon,
    TimeFliesBronze, TimeFliesGold, TimeFliesGrey, TimeFliesSilver,
    UnlockerBronze, UnlockerGold, UnlockerGrey, UnlockerSilver,
} from 'icons';
import { getCVATStore } from 'cvat-store';
import {
    Badge, BadgeTier, Challenge, ChallengeType,
    OnlineStatus, QuizDuelQuestion, ShopItem, Statistic, UserData, UserDataState,
} from './gamif-interfaces';

// File for individual challenges / badges, mapping them to their IDs etc

// export const badges: Badge[] = [
//     {
//         id: 1,
//         title: 'Annotator',
//         instruction: 'Annotate GOAL Images',
//         progress: 0,
//         goal_bronze: 200,
//         goal_silver: 500,
//         goal: 1000,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: 'Images',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 2,
//         title: 'The Annotation Machine',
//         instruction: 'Annotate GOAL Images in one session',
//         progress: 0,
//         goal_bronze: 50,
//         goal_silver: 100,
//         goal: 250,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: 'Images',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 3,
//         title: 'PolygonPro',
//         instruction: 'Set GOAL Tags',
//         progress: 0,
//         goal_bronze: 500,
//         goal_silver: 1000,
//         goal: 2000,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: 'Tags',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 4,
//         title: 'Time Flies When...',
//         instruction: 'Spend GOAL hours annotating',
//         progress: 0,
//         goal_bronze: 10 * 60 * 60,
//         goal_silver: 50 * 60 * 60,
//         goal: 100 * 60 * 60,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: 'Hours',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 5,
//         title: 'Serial Annotator',
//         instruction: 'Annotate at least one image for GOAL days in a row',
//         progress: 0,
//         goal_bronze: 3,
//         goal_silver: 7,
//         goal: 14,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 6,
//         title: 'Energized',
//         instruction: 'Start GOAL Energizers',
//         progress: 0,
//         goal_bronze: 10,
//         goal_silver: 50,
//         goal: 100,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 7,
//         title: 'Energy Collector',
//         instruction: 'Collect GOAL Energy',
//         progress: 0,
//         goal_bronze: 100,
//         goal_silver: 500,
//         goal: 1000,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 8,
//         title: 'Balanced Energy',
//         instruction: 'Start each Energizer GOAL times',
//         progress: 0,
//         goal_bronze: 5,
//         goal_silver: 10,
//         goal: 20,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 9,
//         title: 'Challenger',
//         instruction: 'Complete GOAL Challenges',
//         progress: 0,
//         goal_bronze: 5,
//         goal_silver: 20,
//         goal: 50,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 10,
//         title: 'Millionaire',
//         instruction: 'Earn GOAL Annotation Coins',
//         progress: 0,
//         goal_bronze: 500,
//         goal_silver: 2000,
//         goal: 5000,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 11,
//         title: 'Hoarder',
//         instruction: 'Possess GOAL total annotation coins at one point',
//         progress: 0,
//         goal_bronze: 500,
//         goal_silver: 1000,
//         goal: 2500,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 12,
//         title: 'Money Man',
//         instruction: 'Buy this badge in the shop',
//         progress: 0,
//         goal_bronze: 1,
//         goal_silver: 2,
//         goal: 3,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 13,
//         title: 'Unlocker',
//         instruction: 'Buy GOAL Items from shop',
//         progress: 0,
//         goal_bronze: 10,
//         goal_silver: 20,
//         goal: 50,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 14,
//         title: 'Secretive',
//         instruction: 'Buy GOAL mystery gifts in shop',
//         progress: 0,
//         goal_bronze: 5,
//         goal_silver: 10,
//         goal: 50,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: true,
//     },

//     // Start hidden badges

//     {
//         id: 101,
//         title: 'Fun Hater',
//         instruction: 'Let Energy expire',
//         progress: 0,
//         goal: 100,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: false,
//     },
//     {
//         id: 102,
//         title: 'Night Owl',
//         instruction: 'Annotate images at night',
//         progress: 0,
//         goal: 100,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: false,
//     },
//     {
//         id: 103,
//         title: 'Chat Menace',
//         instruction: 'Write chat messages',
//         progress: 0,
//         goal: 500,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: false,
//     },
//     {
//         id: 104,
//         title: 'E for Effort',
//         instruction: 'Answer every quiz question wrong',
//         progress: 0,
//         goal: 1,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: false,
//     },
//     {
//         id: 105,
//         title: 'Cobra',
//         instruction: 'Achieve a score of 20 in Snake',
//         progress: 0,
//         goal: 1,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: false,
//     },
//     {
//         id: 106,
//         title: 'Tetris',
//         instruction: 'Achieve a score of 2000 in Tetris',
//         progress: 0,
//         goal: 1,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: false,
//     },
// ];

export const badges: Badge[] = [
    {
        id: 1,
        title: 'Annotator',
        instruction: 'Annotate GOAL Images',
        progress: 0,
        goal_bronze: 50,
        goal_silver: 100,
        goal: 200,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: 'Images',
        receivedOn: null,
        visible: true,
    },
    {
        id: 2,
        title: 'The Annotation Machine',
        instruction: 'Annotate GOAL Images in one session',
        progress: 0,
        goal_bronze: 10,
        goal_silver: 25,
        goal: 50,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: 'Images',
        receivedOn: null,
        visible: true,
    },
    {
        id: 3,
        title: 'Polygon Pro',
        instruction: 'Create GOAL Polygons',
        progress: 0,
        goal_bronze: 100,
        goal_silver: 200,
        goal: 500,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: 'Polygons',
        receivedOn: null,
        visible: true,
    },
    {
        id: 4,
        title: 'Time Flies When...',
        instruction: 'Spend GOAL hours annotating',
        progress: 0,
        goal_bronze: 5 * 60 * 60,
        goal_silver: 10 * 60 * 60,
        goal: 40 * 60 * 60,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: 'Hours',
        receivedOn: null,
        visible: true,
    },
    {
        id: 5,
        title: 'Serial Annotator',
        instruction: 'Annotate at least one image for GOAL days in a row',
        progress: 0,
        goal_bronze: 3,
        goal_silver: 7,
        goal: 14,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: '',
        receivedOn: null,
        visible: true,
    },
    {
        id: 6,
        title: 'Energized',
        instruction: 'Start GOAL Energizers',
        progress: 0,
        goal_bronze: 10,
        goal_silver: 50,
        goal: 100,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: '',
        receivedOn: null,
        visible: true,
    },
    {
        id: 7,
        title: 'Energy Collector',
        instruction: 'Collect GOAL Energy',
        progress: 0,
        goal_bronze: 100,
        goal_silver: 500,
        goal: 1000,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: '',
        receivedOn: null,
        visible: true,
    },
    {
        id: 8,
        title: 'Balanced Energy',
        instruction: 'Start each Energizer GOAL times',
        progress: 0,
        goal_bronze: 3,
        goal_silver: 7,
        goal: 12,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: '',
        receivedOn: null,
        visible: true,
    },
    {
        id: 9,
        title: 'Challenger',
        instruction: 'Complete GOAL Challenges',
        progress: 0,
        goal_bronze: 3,
        goal_silver: 10,
        goal: 25,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: '',
        receivedOn: null,
        visible: true,
    },
    {
        id: 10,
        title: 'Millionaire',
        instruction: 'Earn GOAL Annotation Coins',
        progress: 0,
        goal_bronze: 500,
        goal_silver: 1000,
        goal: 2500,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: '',
        receivedOn: null,
        visible: true,
    },
    {
        id: 11,
        title: 'Hoarder',
        instruction: 'Possess GOAL total annotation coins at one point',
        progress: 0,
        goal_bronze: 500,
        goal_silver: 1000,
        goal: 2500,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: '',
        receivedOn: null,
        visible: true,
    },
    {
        id: 12,
        title: 'Money Man',
        instruction: 'Buy this badge in the shop',
        progress: 0,
        goal_bronze: 1,
        goal_silver: 2,
        goal: 3,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: '',
        receivedOn: null,
        visible: true,
    },
    {
        id: 13,
        title: 'Unlocker',
        instruction: 'Buy GOAL Items from shop',
        progress: 0,
        goal_bronze: 5,
        goal_silver: 10,
        goal: 20,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: '',
        receivedOn: null,
        visible: true,
    },
    {
        id: 14,
        title: 'Secretive',
        instruction: 'Buy GOAL mystery gifts in shop',
        progress: 0,
        goal_bronze: 5,
        goal_silver: 10,
        goal: 20,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: '',
        receivedOn: null,
        visible: true,
    },

    // Start hidden badges

    {
        id: 101,
        title: 'Fun Hater',
        instruction: 'Let Energy expire',
        progress: 0,
        goal: 100,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: '',
        receivedOn: null,
        visible: false,
    },
    {
        id: 102,
        title: 'Night Owl',
        instruction: 'Annotate images at night',
        progress: 0,
        goal: 25,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: '',
        receivedOn: null,
        visible: false,
    },
    // {
    //     id: 103,
    //     title: 'Chat Menace',
    //     instruction: 'Write chat messages',
    //     progress: 0,
    //     goal: 100,
    //     tier: BadgeTier.NOT_OBTAINED,
    //     goalunit: '',
    //     receivedOn: null,
    //     visible: false,
    // },
    {
        id: 104,
        title: 'E for Effort',
        instruction: 'Answer every quiz question wrong',
        progress: 0,
        goal: 1,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: '',
        receivedOn: null,
        visible: false,
    },
    {
        id: 105,
        title: 'Cobra',
        instruction: 'Achieve a score of 30 in Snake',
        progress: 0,
        goal: 1,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: '',
        receivedOn: null,
        visible: false,
    },
    {
        id: 106,
        title: 'Tetris Titan',
        instruction: 'Achieve a score of 2000 in Tetris',
        progress: 0,
        goal: 1,
        tier: BadgeTier.NOT_OBTAINED,
        goalunit: '',
        receivedOn: null,
        visible: false,
    },
];

// export const badges: Badge[] = [
//     {
//         id: 1,
//         title: 'Annotator',
//         instruction: 'Annotate images',
//         progress: 0,
//         goal_bronze: 1,
//         goal_silver: 5,
//         goal: 10,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: 'Images',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 2,
//         title: 'The Annotation Machine',
//         instruction: 'Annotate images in one session',
//         progress: 0,
//         goal_bronze: 13,
//         goal_silver: 25,
//         goal: 40,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: 'Images',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 3,
//         title: 'PolygonPro',
//         instruction: 'Set tags',
//         progress: 0,
//         goal_bronze: 5,
//         goal_silver: 10,
//         goal: 20,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: 'Tags',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 4,
//         title: 'Time Flies When...',
//         instruction: 'Spend hours annotating',
//         progress: 0,
//         goal_bronze: 1,
//         goal_silver: 5,
//         goal: 10,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: 'Hours',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 5,
//         title: 'Serial Annotator',
//         instruction: 'Annotate at least on image for days in a row',
//         progress: 0,
//         goal_bronze: 3,
//         goal_silver: 14,
//         goal: 21,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 6,
//         title: 'Energized',
//         instruction: 'Start Energizers',
//         progress: 0,
//         goal_bronze: 10,
//         goal_silver: 50,
//         goal: 100,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 7,
//         title: 'Energy Collector',
//         instruction: 'Collect Energy',
//         progress: 0,
//         goal_bronze: 100,
//         goal_silver: 500,
//         goal: 1000,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 8,
//         title: 'Balanced Energy',
//         instruction: 'Start each Energizer', // TODO: meh.
//         progress: 0,
//         goal_bronze: 1,
//         goal_silver: 5,
//         goal: 10,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 9,
//         title: 'Challenger',
//         instruction: 'Complete Challenges',
//         progress: 0,
//         goal_bronze: 5,
//         goal_silver: 20,
//         goal: 50,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 10,
//         title: 'Millionaire',
//         instruction: 'Earn annotation coins',
//         progress: 0,
//         goal_bronze: 1000,
//         goal_silver: 5000,
//         goal: 10000,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 11,
//         title: 'Hoarder',
//         instruction: 'Possess total annotation coins at one point', // TODO: meh.
//         progress: 0,
//         goal_bronze: 100,
//         goal_silver: 500,
//         goal: 1000,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 12,
//         title: 'Money Man',
//         instruction: 'Buy in shop',
//         progress: 0,
//         goal_bronze: 1,
//         goal_silver: 2,
//         goal: 3,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 13,
//         title: 'Unlocker',
//         instruction: 'Buy items from shop',
//         progress: 0,
//         goal_bronze: 10,
//         goal_silver: 20,
//         goal: 50,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: true,
//     },
//     {
//         id: 14,
//         title: 'Secretive',
//         instruction: 'Buy mystery gifts in shop',
//         progress: 0,
//         goal_bronze: 5,
//         goal_silver: 10,
//         goal: 50,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: true,
//     },

//     // Start hidden badges

//     {
//         id: 101,
//         title: 'Fun Hater',
//         instruction: 'Let Energy expire',
//         progress: 0,
//         goal: 10,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: false,
//     },
//     {
//         id: 102,
//         title: 'Night Owl',
//         instruction: 'Annotate images at night',
//         progress: 0,
//         goal: 50,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: false,
//     },
//     {
//         id: 103,
//         title: 'Chat Menace',
//         instruction: 'Write chat messages',
//         progress: 0,
//         goal: 1000,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: false,
//     },
//     {
//         id: 104,
//         title: 'E for Effort',
//         instruction: 'Answer every quiz question wrong',
//         progress: 0,
//         goal: 1,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: false,
//     },
//     {
//         id: 105,
//         title: 'Cobra',
//         instruction: 'Achieve a 50-foot long snake',
//         progress: 0,
//         goal: 1,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: false,
//     },

//     {
//         id: 106,
//         title: 'Tetris',
//         instruction: 'Score 2 Tetrises in a row',
//         progress: 0,
//         goal: 1,
//         tier: BadgeTier.NOT_OBTAINED,
//         goalunit: '',
//         receivedOn: null,
//         visible: false,
//     },
// ];

export const encodeBadgeTier = (tier: BadgeTier): number => {
    switch (tier) {
        case BadgeTier.NOT_OBTAINED: return 0;
        case BadgeTier.BRONZE: return 1;
        case BadgeTier.SILVER: return 2;
        case BadgeTier.GOLD: return 3;
        default: return 0;
    }
};

export const decodeBadgeTier = (tier: number): BadgeTier => {
    switch (tier) {
        case 0: return BadgeTier.NOT_OBTAINED;
        case 1: return BadgeTier.BRONZE;
        case 2: return BadgeTier.SILVER;
        case 3: return BadgeTier.GOLD;
        default: return BadgeTier.NOT_OBTAINED;
    }
};

export function getBadgeIcon(id: number, tier: BadgeTier): React.ReactNode {
    let tierCode = 0;
    switch (tier) {
        case BadgeTier.NOT_OBTAINED: tierCode = 0; break;
        case BadgeTier.BRONZE: tierCode = 1; break;
        case BadgeTier.SILVER: tierCode = 2; break;
        case BadgeTier.GOLD: tierCode = 3; break;
        default: tierCode = 0; break;
    }

    const iconCode = `${id.toString()}-${tierCode.toString()}`;

    switch (iconCode) {
        case '1-0': return <AnnotatorGrey />;
        case '1-1': return <AnnotatorBronze />;
        case '1-2': return <AnnotatorSilver />;
        case '1-3': return <AnnotatorGold />;
        case '2-0': return <AnnotationMachineGrey />;
        case '2-1': return <AnnotationMachineBronze />;
        case '2-2': return <AnnotationMachineSilver />;
        case '2-3': return <AnnotationMachineGold />;
        case '3-0': return <PolygonProGrey />;
        case '3-1': return <PolygonProBronze />;
        case '3-2': return <PolygonProSilver />;
        case '3-3': return <PolygonProGold />;
        case '4-0': return <TimeFliesGrey />;
        case '4-1': return <TimeFliesBronze />;
        case '4-2': return <TimeFliesSilver />;
        case '4-3': return <TimeFliesGold />;
        case '5-0': return <SerialAnnotatorGrey />;
        case '5-1': return <SerialAnnotatorBronze />;
        case '5-2': return <SerialAnnotatorSilver />;
        case '5-3': return <SerialAnnotatorGold />;
        case '6-0': return <EnergizedGrey />;
        case '6-1': return <EnergizedBronze />;
        case '6-2': return <EnergizedSilver />;
        case '6-3': return <EnergizedGold />;
        case '7-0': return <EnergyCollectorGrey />;
        case '7-1': return <EnergyCollectorBronze />;
        case '7-2': return <EnergyCollectorSilver />;
        case '7-3': return <EnergyCollectorGold />;
        case '8-0': return <BalancedEnergyGrey />;
        case '8-1': return <BalancedEnergyBronze />;
        case '8-2': return <BalancedEnergySilver />;
        case '8-3': return <BalancedEnergyGold />;
        case '9-0': return <ChallengerGrey />;
        case '9-1': return <ChallengerBronze />;
        case '9-2': return <ChallengerSilver />;
        case '9-3': return <ChallengerGold />;
        case '10-0': return <MillionaireGrey />;
        case '10-1': return <MillionaireBronze />;
        case '10-2': return <MillionaireSilver />;
        case '10-3': return <MillionaireGold />;
        case '11-0': return <HoarderGrey />;
        case '11-1': return <HoarderBronze />;
        case '11-2': return <HoarderSilver />;
        case '11-3': return <HoarderGold />;
        case '12-0': return <MoneyManGrey />;
        case '12-1': return <MoneyManBronze />;
        case '12-2': return <MoneyManSilver />;
        case '12-3': return <MoneyManGold />;
        case '13-0': return <UnlockerGrey />;
        case '13-1': return <UnlockerBronze />;
        case '13-2': return <UnlockerSilver />;
        case '13-3': return <UnlockerGold />;
        case '14-0': return <MysteryGiftBadgeGrey />;
        case '14-1': return <MysteryGiftBadgeBronze />;
        case '14-2': return <MysteryGiftBadgeSilver />;
        case '14-3': return <MysteryGiftBadgeGold />;

        case '101-0': return <FunHaterGrey />;
        case '101-3': return <FunHaterGold />;
        case '102-0': return <NightOwlGrey />;
        case '102-3': return <NightOwlGold />;
        case '103-0': return <ChatMenaceGrey />;
        case '103-3': return <ChatMenaceGold />;
        case '104-0': return <EforEffortGrey />;
        case '104-3': return <EforEffortGold />;
        case '105-0': return <CobraGrey />;
        case '105-3': return <CobraGold />;
        case '106-0': return <TetrisGrey />;
        case '106-3': return <TetrisGold />;

        default: return <BadgeGreyIcon />;
    }
}

export function getBadgeValue(id: number): number {
    const state = getCVATStore().getState();
    const udata: UserDataState = state.gamifuserdata;
    const { energizerBadges } = state.badges;

    switch (id) {
        case 1: return udata.userdata_total.images_annotated;
        case 2: return udata.userdata_session.images_annotated;
        case 3: return udata.userdata_total.polygons_drawn;
        case 4: return udata.userdata_total.annotation_time;
        case 5: return udata.userdata_total.annotation_streak_max;
        case 6: return udata.userdata_total.energizers_completed;
        case 7: return udata.userdata_total.energy_gained;
        case 8:
            return Math.min(
                udata.userdata_total.tetris_played,
                udata.userdata_total.quiz_played,
                udata.userdata_total.snake_played,
            );
        case 9: return udata.userdata_total.challenges_completed;
        case 10: return udata.userdata_total.annotation_coins_obtained;
        case 11: return udata.userdata_total.annotation_coins_max;
        case 12: return udata.userdata_total.money_badge_tier;
        case 13: return udata.userdata_total.items_bought;
        case 14: return udata.userdata_total.mystery_gifts_bought;
        case 101: return udata.userdata_total.energy_expired;
        case 102: return udata.userdata_total.images_annotated_night;
        case 103: return udata.userdata_total.chat_messages;
        case 104: return energizerBadges.quizBadge;
        case 105: return energizerBadges.snakeBadge;
        case 106: return energizerBadges.tetrisBadge;
        default: return 0;
    }
}

export function mapBadgeIdtoField(id: number): keyof UserData {
    switch (id) {
        case 1: return 'images_annotated';
        case 2: return 'images_annotated'; // TODO: SESSION!
        case 3: return 'polygons_drawn';
        case 4: return 'annotation_time';
        case 5: return 'annotation_streak_max';
        case 6: return 'energizers_completed';
        case 7: return 'energy_gained';
        case 8: return 'tetris_played'; // TODO: All energizers, not just tetris!
        case 9: return 'challenges_completed';
        case 10: return 'annotation_coins_obtained';
        case 11: return 'annotation_coins_max';
        case 12: return 'images_annotated'; // TODO: Money Badge!
        case 13: return 'items_bought';
        case 101: return 'energy_expired';
        case 102: return 'images_annotated_night';
        case 103: return 'chat_messages';
        // case 104: return ''; // TODO: Quiz-based
        // case 105: return 'images_annotated_night'; // TODO: Snake-based
        // case 106: return 'images_annotated_night'; // TODO: Tetris-based
        default: return 'images_annotated';
    }
}

export const mapStatisticIdtoIcon = (id: number): JSX.Element => {
    switch (id) {
        case 1: return <ImagesAnnotatedIcon />;
        case 2: return <TagsSetIcon />;
        case 3: return <AvgTimeIcon />;
        case 4: return <AnnotationStreakIcon />;
        case 5: return <AnnotationTimeIcon />;
        case 6: return <EnergyGainedIcon />;
        case 7: return <TetrisIcon />;
        case 8: return <QuizIcon />;
        case 9: return <SnakeIcon />;
        case 10: return <ChallengesIcon />;
        case 11: return <ItemsBoughtIcon />;
        case 12: return <AnnotationCoinsObtainedIcon />;
        case 13: return <AnnotationCoinsMaxIcon />;
        default: return <BadgesObtainedIcon />;
    }
};

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
        unit: 'Polygons',
        tooltip_total: 'Polygons drawn in total',
        tooltip_session: 'Polygons drawn this session',
    },
    {
        id: 3,
        value: 0,
        unit: 'sec',
        tooltip_total: 'Average time per image all time',
        tooltip_session: 'Average time per image this session',
    },
    {
        id: 4,
        value: 0,
        unit: 'Days',
        tooltip_total: 'Longest annotation streak',
        tooltip_session: 'Current annotation streak',
    },
    {
        id: 5,
        value: 0,
        unit: 'sec',
        tooltip_total: 'Time spent annotating',
        tooltip_session: 'Time spent annotating this session',
    },
    {
        id: 6,
        value: 0,
        unit: '',
        tooltip_total: 'Energy gained all time',
        tooltip_session: 'Energy gained this session',
    },
    {
        id: 7,
        value: 0,
        unit: '',
        tooltip_total: 'Tetris played all time',
        tooltip_session: 'Tetris played this session',
    },
    {
        id: 8,
        value: 0,
        unit: '',
        tooltip_total: 'Quiz played all time',
        tooltip_session: 'Quiz played this session',
    },
    {
        id: 9,
        value: 0,
        unit: '',
        tooltip_total: 'Snake played all time',
        tooltip_session: 'Snake played this session',
    },
    {
        id: 10,
        value: 0,
        unit: '',
        tooltip_total: 'Challenges completed all time',
        tooltip_session: 'Challenges completed this session',
    },
    {
        id: 11,
        value: 0,
        unit: 'Items',
        tooltip_total: 'Shop items bought all time',
        tooltip_session: 'Shop items bought this session',
    },
    {
        id: 12,
        value: 0,
        unit: '',
        tooltip_total: 'Annotation coins obtained all time',
        tooltip_session: 'Annotation coins obtained this session',
    },
    {
        id: 13,
        value: 0,
        unit: '',
        tooltip_total: 'Annotation coin maximum',
        tooltip_session: 'Annotation coin maximum',
    },
    {
        id: 14,
        value: 0,
        unit: '',
        tooltip_total: 'Badges obtained total',
        tooltip_session: 'Badges obtained this session',
    },
];

export function mapStatisticIdtoFieldName(id: number): keyof UserData {
    switch (id) {
        case 1: return 'images_annotated';
        case 2: return 'polygons_drawn';
        case 3: return 'annotation_time_avg';
        case 4: return 'annotation_streak_max';
        case 5: return 'annotation_time';
        case 6: return 'energy_gained';
        case 7: return 'tetris_played';
        case 8: return 'quiz_played';
        case 9: return 'snake_played';
        case 10: return 'challenges_completed';
        case 11: return 'items_bought';
        case 12: return 'annotation_coins_obtained';
        case 13: return 'annotation_coins_max';
        case 14: return 'badges_obtained';
        default: return 'images_annotated';
    }
}

// eslint-disable-next-line max-len
const itemPortrait = (backgroundStyle: React.CSSProperties | undefined, outlineStyle: React.CSSProperties | undefined): JSX.Element => (
    <div
        className='gamif-shop-item-portrait'
        style={{ ...backgroundStyle, ...outlineStyle }}
    />
);

export const items: ShopItem[] = [
    {
        id: 1,
        title: 'Charge Pack',
        price: 100,
        repeatable: true,
        bought: false,
        visible: true,
        icon: <ThunderboltFilled />,
        onPurchase: () => {},
    },
    {
        id: 2,
        title: 'Mystery Gift',
        price: 80,
        repeatable: true,
        bought: false,
        visible: true,
        icon: <MysteryGiftIcon />,
        onPurchase: () => {},
    },
    {
        id: 3,
        title: 'Extra Challenge',
        price: 100,
        repeatable: true,
        bought: false,
        visible: true,
        icon: <AddChallengeIcon />,
        onPurchase: () => {},
    },
    {
        id: 4,
        title: 'Streak Saver',
        price: 200,
        repeatable: true,
        bought: false,
        visible: true,
        icon: <StreakSaverIcon />,
        onPurchase: () => {},
    },
    {
        id: 5,
        title: 'Money Man Badge',
        price: 2000,
        repeatable: false,
        bought: false,
        visible: true,
        icon: <MoneyManGold />,
        // icon() {
        //     const { shop } = getCVATStore().getState();
        //     switch (shop.moneyBadgeTier) {
        //         case BadgeTier.NOT_OBTAINED: return <MoneyManBronze />;
        //         case BadgeTier.BRONZE: return <MoneyManSilver />;
        //         case BadgeTier.SILVER: return <MoneyManGold />;
        //         case BadgeTier.GOLD: return <MoneyManGold />;
        //         default: return <MoneyManBronze />;
        //     }
        // },
        onPurchase: () => {},
    },
    {
        id: 6,
        title: 'Clear Profile Background',
        price: 0,
        repeatable: false,
        bought: true,
        visible: true,
        icon: itemPortrait(
            { background: '#e6e6e6' },
            { outline: '1px solid black' },
        ),
        onPurchase: () => {},
    },
    {
        id: 7,
        title: 'Green Background',
        price: 200,
        repeatable: false,
        bought: false,
        visible: true,
        icon: itemPortrait(
            { background: '#bbf1c4' },
            { outline: '1px solid black' },
        ),
        onPurchase: () => {},
    },
    {
        id: 8,
        title: 'Blue Background',
        price: 200,
        repeatable: false,
        bought: false,
        visible: true,
        icon: itemPortrait(
            { background: '#aec6cf' },
            { outline: '1px solid black' },
        ),
        onPurchase: () => {},
    },
    {
        id: 9,
        title: 'Red Background',
        price: 200,
        repeatable: false,
        bought: false,
        visible: true,
        icon: itemPortrait(
            { background: '#ff6961' },
            { outline: '1px solid black' },
        ),
        onPurchase: () => {},
    },
    {
        id: 10,
        title: 'Blue-Purple Background',
        price: 400,
        repeatable: false,
        bought: false,
        visible: true,
        icon: <div
            className='gamif-profile-blue-blackground'
            style={{
                width: '45px',
                height: '35px',
                borderRadius: '20%',
                position: 'absolute',
            }}
        />,
        onPurchase: () => {},
    },
    {
        id: 11,
        title: 'Tri-Color Background 1',
        price: 500,
        repeatable: false,
        bought: false,
        visible: true,
        icon: <div
            className='gamif-profile-tri-color-background-1'
            style={{
                width: '45px',
                height: '35px',
                borderRadius: '20%',
                position: 'absolute',
            }}
        />,
        onPurchase: () => {},
    },
    {
        id: 12,
        title: 'Tri-Color Background 2',
        price: 500,
        repeatable: false,
        bought: false,
        visible: true,
        icon: <div
            className='gamif-profile-tri-color-background-2'
            style={{
                width: '45px',
                height: '35px',
                borderRadius: '20%',
                position: 'absolute',
            }}
        />,
        onPurchase: () => {},
    },
    {
        id: 13,
        title: 'Tri-Color Background 3',
        price: 500,
        repeatable: false,
        bought: false,
        visible: true,
        icon: <div
            className='gamif-profile-tri-color-background-3'
            style={{
                width: '45px',
                height: '35px',
                borderRadius: '20%',
                position: 'absolute',
            }}
        />,
        onPurchase: () => {},
    },
    {
        id: 14,
        title: 'Star Shower Background',
        price: 1000,
        repeatable: false,
        bought: false,
        visible: true,
        icon: (
            <div
                className='gamif-quick-profile-shooting-stars-background'
                style={{
                    width: '45px',
                    height: '35px',
                    borderRadius: '20%',
                    position: 'absolute',
                }}
            >
                <div style={{ position: 'relative', transform: 'rotateZ(45deg)' }}>
                    <div style={{ position: 'relative' }} className='shooting_star' />
                    <div style={{ position: 'relative' }} className='shooting_star' />
                    <div style={{ position: 'relative' }} className='shooting_star' />
                    <div style={{ position: 'relative' }} className='shooting_star' />
                </div>
            </div>
        ),
        onPurchase: () => {},
    },
    {
        id: 15,
        title: 'Mystery Background',
        price: 100000,
        repeatable: false,
        bought: false,
        visible: true,
        icon: (
            <div
                className='bubbles'
                style={{
                    width: '45px',
                    height: '35px',
                    borderRadius: '20%',
                    position: 'absolute',
                    background: '#1a1e23',
                }}
            >
                <div className='bubble' />
                <div className='bubble' />
                <div className='bubble' />
                <div className='bubble' />
            </div>),
        onPurchase: () => {},
    },
    {
        id: 16,
        title: 'Clear Border',
        price: 0,
        repeatable: false,
        bought: true,
        visible: true,
        icon: itemPortrait({ background: 'transparent' }, { outline: '3px solid #bbf1c4' }),
        onPurchase: () => {},
    },
    {
        id: 17,
        title: 'Green Border',
        price: 200,
        repeatable: false,
        bought: false,
        visible: true,
        icon: itemPortrait({ background: '#e6e6e6' }, { outline: '3px solid #bbf1c4' }),
        onPurchase: () => {},
    },
    {
        id: 18,
        title: 'Blue Border',
        price: 200,
        repeatable: false,
        bought: false,
        visible: true,
        icon: itemPortrait({ background: '#e6e6e6' }, { outline: '3px solid #aec6cf' }),
        onPurchase: () => {},
    },
    {
        id: 19,
        title: 'Red Border',
        price: 200,
        repeatable: false,
        bought: false,
        visible: true,
        icon: itemPortrait({ background: '#e6e6e6' }, { outline: '3px solid #ff6961' }),
        onPurchase: () => {},
    },

    {
        id: 20,
        title: 'Blue Animated Border',
        price: 500,
        repeatable: false,
        bought: false,
        visible: true,
        icon: <div
            className='gamif-profile-anim-border-blue'
            style={{
                width: '45px',
                height: '35px',
                borderRadius: '20%',
            }}
        />,
        onPurchase: () => {},
    },
    {
        id: 21,
        title: 'Red Animated Border',
        price: 500,
        repeatable: false,
        bought: false,
        visible: true,
        icon: <div
            className='gamif-profile-anim-border-red'
            style={{
                width: '45px',
                height: '35px',
                borderRadius: '20%',
            }}
        />,
        onPurchase: () => {},
    },
    {
        id: 22,
        title: 'Christmas Profile Border',
        price: 500,
        repeatable: false,
        bought: false,
        visible: true,
        icon: <div
            className='gamif-profile-christmas-box'
            style={{
                width: '45px',
                height: '35px',
                borderRadius: '20%',
            }}
        />,
        onPurchase: () => {},
    },
    {
        id: 23,
        title: 'Rainbow Profile Border',
        price: 500,
        repeatable: false,
        bought: false,
        visible: true,
        icon: <div
            className='gamif-profile-rainbow-box'
            style={{
                width: '45px',
                height: '35px',
                borderRadius: '20%',
            }}
        />,
        onPurchase: () => {},
    },
    {
        id: 24,
        title: 'Rainbow Profile Effect',
        price: 1000,
        repeatable: false,
        bought: false,
        visible: true,
        icon: <div
            className='gamif-profile-rainbow-effect'
            style={{
                width: '45px',
                height: '35px',
                borderRadius: '20%',
            }}
        />,
        onPurchase: () => {},
    },
    {
        id: 25,
        title: 'Mystery Profile Border',
        price: 100000,
        repeatable: false,
        bought: false,
        visible: true,
        icon: (
            <div
                className='gamif-profile-hover-background'
                style={{
                    width: '45px',
                    height: '35px',
                    borderRadius: '20%',
                    position: 'absolute',
                    background: '#1a1e23',
                }}
            />
        ),
        onPurchase: () => {},
    },
];

export function getAvatar(id: number): React.ReactNode {
    switch (id) {
        case 1: return <UserOutlined />;
        case 2: return <UserAddOutlined />;
        case 3: return <UserDeleteOutlined />;
        case 4: return <UserSwitchOutlined />;
        case 5: return <UsergroupAddOutlined />;
        default: return <UserOutlined />;
    }
}

// export const availableChallenges: Challenge[] = [
//     {
//         id: 1,
//         instruction: 'Annotate GOAL Images',
//         importedProgress: 0,
//         baselineValue: 0,
//         progress: 0,
//         goal: 40,
//         goal_variance: 20,
//         reward: 80,
//         reward_variance: 40,
//         challengeType: ChallengeType.DAILY,
//     },
//     {
//         id: 2,
//         instruction: 'Annotate GOAL Minutes',
//         importedProgress: 0,
//         baselineValue: 0,
//         progress: 0,
//         goal: 45,
//         goal_variance: 15,
//         reward: 90,
//         reward_variance: 20,
//         challengeType: ChallengeType.DAILY,
//     },
//     {
//         id: 3,
//         instruction: 'Annotate GOAL Minutes in one Session',
//         importedProgress: 0,
//         baselineValue: 0,
//         progress: 0,
//         goal: 30 * 60,
//         goal_variance: 10,
//         reward: 90,
//         reward_variance: 30,
//         challengeType: ChallengeType.DAILY,
//     },
//     {
//         id: 4,
//         instruction: 'Complete GOAL Energizers',
//         importedProgress: 0,
//         baselineValue: 0,
//         progress: 0,
//         goal: 3,
//         goal_variance: 1,
//         reward: 75,
//         reward_variance: 25,
//         challengeType: ChallengeType.DAILY,
//     },
//     {
//         id: 5,
//         instruction: 'Play Tetris GOAL times',
//         importedProgress: 0,
//         baselineValue: 0,
//         progress: 0,
//         goal: 1,
//         goal_variance: 2,
//         reward: 40,
//         reward_variance: 80,
//         challengeType: ChallengeType.DAILY,
//     },
//     {
//         id: 6,
//         instruction: 'Play Snake GOAL times',
//         importedProgress: 0,
//         baselineValue: 0,
//         progress: 0,
//         goal: 1,
//         goal_variance: 2,
//         reward: 40,
//         reward_variance: 80,
//         challengeType: ChallengeType.DAILY,
//     },
//     {
//         id: 7,
//         instruction: 'Play Quiz GOAL times',
//         importedProgress: 0,
//         baselineValue: 0,
//         progress: 0,
//         goal: 2,
//         goal_variance: 1,
//         reward: 40,
//         reward_variance: 80,
//         challengeType: ChallengeType.DAILY,
//     },
//     {
//         id: 8,
//         instruction: 'Obtain or upgrade GOAL badge',
//         importedProgress: 0,
//         baselineValue: 0,
//         progress: 0,
//         goal: 1,
//         goal_variance: 0,
//         reward: 80,
//         reward_variance: 10,
//         challengeType: ChallengeType.DAILY,
//     },
//     {
//         id: 9,
//         instruction: 'Collect GOAL Energy',
//         importedProgress: 0,
//         baselineValue: 0,
//         progress: 0,
//         goal: 20,
//         goal_variance: 10,
//         reward: 60,
//         reward_variance: 30,
//         challengeType: ChallengeType.DAILY,
//     },
// ];

export const availableChallenges: Challenge[] = [
    {
        id: 1,
        instruction: 'Annotate GOAL Images',
        importedProgress: 0,
        baselineValue: 0,
        progress: 0,
        goal: 8,
        goal_variance: 4,
        reward: 80,
        reward_variance: 40,
        challengeType: ChallengeType.DAILY,
    },
    {
        id: 2,
        instruction: 'Annotate GOAL Minutes',
        importedProgress: 0,
        baselineValue: 0,
        progress: 0,
        goal: 45,
        goal_variance: 15,
        reward: 90,
        reward_variance: 20,
        challengeType: ChallengeType.DAILY,
    },
    {
        id: 3,
        instruction: 'Annotate GOAL Minutes in one Session',
        importedProgress: 0,
        baselineValue: 0,
        progress: 0,
        goal: 30 * 60,
        goal_variance: 10,
        reward: 90,
        reward_variance: 30,
        challengeType: ChallengeType.DAILY,
    },
    {
        id: 4,
        instruction: 'Complete GOAL Energizers',
        importedProgress: 0,
        baselineValue: 0,
        progress: 0,
        goal: 5,
        goal_variance: 2,
        reward: 75,
        reward_variance: 25,
        challengeType: ChallengeType.DAILY,
    },
    {
        id: 5,
        instruction: 'Play Tetris GOAL times',
        importedProgress: 0,
        baselineValue: 0,
        progress: 0,
        goal: 2,
        goal_variance: 1,
        reward: 40,
        reward_variance: 80,
        challengeType: ChallengeType.DAILY,
    },
    {
        id: 6,
        instruction: 'Play Snake GOAL times',
        importedProgress: 0,
        baselineValue: 0,
        progress: 0,
        goal: 2,
        goal_variance: 1,
        reward: 40,
        reward_variance: 80,
        challengeType: ChallengeType.DAILY,
    },
    {
        id: 7,
        instruction: 'Play Quiz GOAL times',
        importedProgress: 0,
        baselineValue: 0,
        progress: 0,
        goal: 2,
        goal_variance: 1,
        reward: 40,
        reward_variance: 80,
        challengeType: ChallengeType.DAILY,
    },
    {
        id: 8,
        instruction: 'Obtain or upgrade GOAL badge',
        importedProgress: 0,
        baselineValue: 0,
        progress: 0,
        goal: 1,
        goal_variance: 0,
        reward: 80,
        reward_variance: 10,
        challengeType: ChallengeType.DAILY,
    },
    {
        id: 9,
        instruction: 'Collect GOAL Energy',
        importedProgress: 0,
        baselineValue: 0,
        progress: 0,
        goal: 20,
        goal_variance: 10,
        reward: 60,
        reward_variance: 30,
        challengeType: ChallengeType.DAILY,
    },
    // // FIXME: Placeholder not in use yet.
    // {
    //     id: 10,
    //     instruction: 'WEEKLY DEBUG Goal',
    //     importedProgress: 0,
    //     baselineValue: 0,
    //     progress: 0,
    //     goal: 20,
    //     goal_variance: 10,
    //     reward: 60,
    //     reward_variance: 30,
    //     challengeType: ChallengeType.WEEKLY,
    // },
];

export function getChallengeValue(id: number): number {
    const state = getCVATStore().getState();
    const udata: UserDataState = state.gamifuserdata;

    switch (id) {
        case 1: return udata.userdata_session.images_annotated;
        case 2: return udata.userdata_session.annotation_time;
        case 3: return udata.userdata_session.annotation_time; // TODO: refine
        case 4: return udata.userdata_session.energizers_completed;
        case 5: return udata.userdata_session.tetris_played;
        case 6: return udata.userdata_session.snake_played;
        case 7: return udata.userdata_session.quiz_played;
        case 8: return udata.userdata_session.badges_obtained;
        case 9: return udata.userdata_session.energy_gained;
        default: return 0;
    }
}

export const encodeStatus = (status: OnlineStatus): number => {
    switch (status) {
        case OnlineStatus.OFFLINE: return 1;
        case OnlineStatus.DO_NOT_DISTURB: return 2;
        case OnlineStatus.ONLINE: return 3;
        default: return 1;
    }
};

export const decodeStatus = (status: number): OnlineStatus => {
    switch (status) {
        case 1: return OnlineStatus.OFFLINE;
        case 2: return OnlineStatus.DO_NOT_DISTURB;
        case 3: return OnlineStatus.ONLINE;
        default: return OnlineStatus.OFFLINE;
    }
};

export const getstatusStyle = (status: OnlineStatus): any => {
    switch (status) {
        case OnlineStatus.ONLINE: return { background: 'green' };
        case OnlineStatus.DO_NOT_DISTURB: return { background: 'red' };
        case OnlineStatus.OFFLINE: return { background: 'grey' };
        default: return { background: 'grey' };
    }
};

export const getProfileClassNames = (id: number): string => {
    switch (id) {
        case 0: return '';
        case 1: return 'gamif-profile-blue-blackground';
        case 2: return 'gamif-profile-tri-color-background-1';
        case 3: return 'gamif-profile-tri-color-background-2';
        case 4: return 'gamif-profile-tri-color-background-3';
        case 5: return 'gamif-quick-profile-shooting-stars-background';
        case 6: return 'gamif-profile-anim-border-blue';
        case 7: return 'gamif-profile-anim-border-red';
        case 8: return 'gamif-profile-christmas-box';
        case 9: return 'gamif-profile-rainbow-box';
        case 10: return 'gamif-profile-rainbow-effect';
        case 11: return 'gamif-profile-hover-background';
        default: return '';
    }
};

export const getProfileBackground = (id: number): string => {
    switch (id) {
        case 0: return '';
        case 1: return '#e6e6e6';
        case 2: return '#bbf1c4';
        case 3: return '#aec6cf';
        case 4: return '#ff6961';
        case 5: return '#1a1e23';
        default: return '';
    }
};

export const getProfileBorder = (id: number): string => {
    switch (id) {
        case 0: return '';
        case 1: return '4px solid #bbf1c4';
        case 2: return '4px solid #aec6cf';
        case 3: return '4px solid #ff6961';
        default: return '';
    }
};

export const getProfileBackgroundElements = (id: number): JSX.Element => {
    switch (id) {
        case 1: return (
            <>
                <div className='night'>
                    <div className='shooting_star'> </div>
                    <div className='shooting_star'> </div>
                    <div className='shooting_star'> </div>
                    <div className='shooting_star'> </div>
                    <div className='shooting_star'> </div>
                    <div className='shooting_star'> </div>
                    <div className='shooting_star'> </div>
                    <div className='shooting_star'> </div>
                    <div className='shooting_star'> </div>
                    <div className='shooting_star'> </div>
                    <div className='shooting_star'> </div>
                    <div className='shooting_star'> </div>
                </div>
            </>
        );
        case 2: return (
            <>
                <div className='bubbles'>
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                    <div className='bubble' />
                </div>
            </>
        );
        default: return <></>;
    }
};

export const getEnergizerIcon = (energy: number): React.ReactNode => {
    switch (energy) {
        case 0: return <EnergizerIcon />;
        case 1: return <EnergizerIcon1 />;
        case 2: return <EnergizerIcon2 />;
        case 3: return <EnergizerIcon3 />;
        case 4: return <EnergizerIcon4 />;
        case 5: return <EnergizerIcon5 />;
        case 6: return <EnergizerIcon6 />;
        case 7: return <EnergizerIcon7 />;
        case 8: return <EnergizerIcon8 />;
        case 9: return <EnergizerIcon9 />;
        case 10: return <EnergizerIcon10 />;
        case 20: return <EnergizerIcon20 />;
        default: return <EnergizerIcon10 />;
    }
};

const quizDuelQuestions: QuizDuelQuestion[] = [
    {
        question: 'What company was originally called "Cadabra"?',
        answerA: 'Google',
        answerB: 'Amazon',
        answerC: 'Ebay',
        answerD: 'Tesla',
        correctAnswer: 2,
    },
    {
        question: 'What is the 4th letter of the Greek alphabet?',
        answerA: 'Alpha',
        answerB: 'Epsilon',
        answerC: 'Delta',
        answerD: 'Gamma',
        correctAnswer: 3,
    },
    {
        question: 'How many bones do we have in an ear?',
        answerA: '1',
        answerB: '2',
        answerC: '3',
        answerD: '4',
        correctAnswer: 3,
    },
    {
        question: 'What is the largest Spanish-speaking city in the world?',
        answerA: 'Mexico City',
        answerB: 'Madrid',
        answerC: 'New York',
        answerD: 'New Orleans',
        correctAnswer: 1,
    },
    {
        question: 'On what continent would you find the world’s largest desert?',
        answerA: 'Antarctica',
        answerB: 'Arctic',
        answerC: 'Africa',
        answerD: 'Asia',
        correctAnswer: 1,
    },
    {
        question: 'What is a Beaujolais?',
        answerA: 'A dish in France',
        answerB: 'A small bird',
        answerC: 'A type of red wine',
        answerD: 'A beauty salon',
        correctAnswer: 3,
    },
    {
        question: 'What is the name of the biggest technology company in South Korea?',
        answerA: 'Apple',
        answerB: 'Tencent',
        answerC: 'Hyundai',
        answerD: 'Samsung',
        correctAnswer: 4,
    },
    {
        question: 'What is the smallest country in the world?',
        answerA: 'Liechtenstein',
        answerB: 'Vatican City',
        answerC: 'Brunei',
        answerD: 'Malta',
        correctAnswer: 2,
    },
    {
        question: 'What type of animal is a Flemish giant?',
        answerA: 'Cat',
        answerB: 'Dog',
        answerC: 'Rabbit',
        answerD: 'Snake',
        correctAnswer: 3,
    },
    {
        question: 'Which of these religious observances lasts for the shortest period of time during the calendar year?',
        answerA: 'Ramadan',
        answerB: 'Lent',
        answerC: 'Hanukkah',
        answerD: 'Diwali',
        correctAnswer: 4,
    },
    {
        question: 'Construction of which of these famous landmarks was completed first?',
        answerA: 'Empire State Building',
        answerB: 'Royal Albert Hall',
        answerC: 'Eiffel Tower',
        answerD: 'Big Ben',
        correctAnswer: 4,
    },
    {
        question: 'How many wives had Henry VIII?',
        answerA: '1',
        answerB: '2',
        answerC: '4',
        answerD: '6',
        correctAnswer: 4,
    },
    {
        question: 'In which country is the baht the currency?',
        answerA: 'China',
        answerB: 'Thailand',
        answerC: 'Malaysia',
        answerD: 'Pakistan',
        correctAnswer: 2,
    },
    {
        question: 'Who was the 40th President of the United States?',
        answerA: 'Donald Trump',
        answerB: 'Ronald Reagan',
        answerC: 'Teddy Roosevelt',
        answerD: 'George W. Bush',
        correctAnswer: 2,
    },
    {
        question: 'Where can you find the smallest bone in the human body?',
        answerA: 'Ear',
        answerB: 'Shoulder',
        answerC: 'Foot',
        answerD: 'Hand',
        correctAnswer: 1,
    },
    {
        question: 'What is the name of the Twitter bird?',
        answerA: 'Larry',
        answerB: 'Birdy',
        answerC: 'Tweet',
        answerD: 'Lorry',
        correctAnswer: 1,
    },
    {
        question: 'Which animal’s poop is cube-shaped?',
        answerA: 'Beaver',
        answerB: 'Wombat',
        answerC: 'Bear',
        answerD: 'Penguin',
        correctAnswer: 3,
    },
    {
        question: 'What animal has more toes on their front legs?',
        answerA: 'Cats',
        answerB: 'Dogs',
        answerC: 'Bears',
        answerD: 'Ants',
        correctAnswer: 1,
    },
    {
        question: 'Which of these is a blood group?',
        answerA: 'AA',
        answerB: 'AB',
        answerC: 'BA',
        answerD: 'BB',
        correctAnswer: 2,
    },
    {
        question: 'Which year was the first ipod released?',
        answerA: '1999',
        answerB: '2000',
        answerC: '2001',
        answerD: '2004',
        correctAnswer: 3,
    },
];

function shuffleArray(array: Array<any>): Array<any> {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

export const getQuizDuelQuestions = (amount: number): QuizDuelQuestion[] => {
    const shuffledQuestions = shuffleArray(quizDuelQuestions);
    return shuffledQuestions.slice(0, amount);
};
