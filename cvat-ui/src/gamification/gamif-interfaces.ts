// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

export interface Badge {
    title: string;
    instruction: string;
    progress: number;
    goal: number;
    goalunit: string;
    got: boolean;
    receivedOn: Date | null;
    visible: boolean;
}

export interface BadgeState {
    availableBadges: Badge[];
    selectedBadge: Badge;
    loading: boolean;
}

export enum ChallengeType {
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    SPECIAL = 'SPECIAL',
}

export interface Challenge {
    instruction: string;
    progress: number;
    goal: number;
    reward: number; // TODO: establiosh rewards
    challengeType: ChallengeType;
}

export interface ChallengeState {
    availableChallenges: number;
}

export enum EnergizerType {
    TETRIS = 'TETRIS',
    SNAKE = 'SNAKE',
    QUIZ = 'QUIZ',
    NONE = 'NONE',
}

export interface EnergizerState {
    energyLevel: number,
    active: boolean,
    activeEnergizer: EnergizerType,
}
export interface ShopState {
    id: number;
}
export interface SocialState {
    id: number;
}
export interface StatisticsState {
    id: number;
}
