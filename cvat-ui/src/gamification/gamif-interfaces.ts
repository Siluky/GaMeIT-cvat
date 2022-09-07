// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

export interface Badge {
    id: number,
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
    currentUserId: number;
    availableBadges: Badge[];
    selectedBadgeId: number;
    badgesinProfile: number[];
    loading: boolean;
}

export enum ChallengeType {
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    SPECIAL = 'SPECIAL',
}

export interface Challenge {
    id: number;
    instruction: string;
    progress: number;
    goal: number;
    reward: number; // TODO: establiosh rewards
    challengeType: ChallengeType;
}

export interface ChallengeState {
    availableChallenges: Challenge[];
}

export enum EnergizerType {
    TETRIS = 'TETRIS',
    SNAKE = 'SNAKE',
    QUIZ = 'QUIZ',
    NONE = 'NONE',
}

export interface EnergizerProps {
    showLeaderboard: (show: boolean, score: number) => void;
}

export interface QuizDuelQuestion {
    question: string;
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
    correctAnswer: number;
}

export interface LeaderboardEntry {
    username: string;
    score: number;
    avatar: any;
}

export interface EnergizerState {
    energyLevel: number,
    active: boolean,
    popupOpen: boolean,
    activeEnergizer: EnergizerType,
    leaderboardEntries: LeaderboardEntry[],
    questions: QuizDuelQuestion[],
}

export interface ShopItem {
    id: number;
    title: string;
    price: number;
    bought: boolean;
    icon: any;
    onPurchase: () => void;
}

export interface ShopState {
    availableItems: ShopItem[];
    currentBalance: number;
    selectedItemId: number;
}

export enum OnlineStatus {
    ONLINE = 'ONLINE',
    DO_NOT_DISTURB = 'DO_NOT_DISTURB',
    OFFLINE = 'OFFLINE',
}

export interface Profile {
    username: string,
    userId: number,
    avatar: number, // TODO: figure out best way to save this.
    status: OnlineStatus,
    shownBadges: Badge[],
    chatActive: boolean,
}

export interface SocialState {
    status: OnlineStatus,
    friendListEntries: Profile[],
    id: number;

}

export interface Statistic {
    id: number;
    name?: string;
    value?: number;
    unit?: string;
    hoverOverText?: string;
    icon?: any;
}

export interface StatisticsState {
    statistics: Statistic[],
    selectedStatistics: number[],
    selecting: boolean,
}
