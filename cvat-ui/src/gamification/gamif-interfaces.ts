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
}

export interface BadgeState {
    availableBadges: Badge[];
    selectedBadge: Badge;
}

export interface ChallengeState {
    id: number;
}

export interface EnergizerState {
    id: number;
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
