// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

export interface UserData {
    last_login: number, // https://stackoverflow.com/questions/4744299/how-to-get-datetime-in-javascript
    images_annotated: number,
    tags_set: number,
    images_annotated_night: number,

    annotation_time: number, // TODO: in seconds?!
    annotation_streak_current: number,
    annotation_streak_max: number,

    badges_obtained: number,
    challenges_completed: number,

    energy_gained: number,
    energizers_completed: number,
    energy_expired: number,
    tetris_played: number,
    quiz_played: number,
    snake_played: number,

    currentBalance: number,
    annotation_coins_obtained: number,
    annotation_coins_max: number,
    items_bought: number,

    chat_messages: number,
}

export interface UserDataState {
    userdata_session: UserData,
    userdata_total: UserData,
    userId: number,
    username: string,
}

export enum BadgeTier {
    NOT_OBTAINED = 'NOT_OBTAINED',
    BRONZE = 'BRONZE',
    SILVER = 'SILVER',
    GOLD = 'GOLD',
}

export interface Badge {
    id: number;
    title: string;
    instruction: string;
    goal: number;
    tier: BadgeTier;
    goal_silver?: number;
    goal_bronze?: number;

    progress: number;
    goalunit: string;

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
    showLeaderboard: (show: boolean) => void;
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
    userId: number,
    username: string;
    energizer: EnergizerType;
    score: number;
}

export interface EnergizerState {
    energyLevel: number,
    active: boolean,
    popupOpen: boolean,

    activeEnergizer: EnergizerType,
    leaderboardEntries: LeaderboardEntry[],
    latestEntry: LeaderboardEntry,

    questions: QuizDuelQuestion[],
}

export interface ShopItem {
    id: number;
    title: string;
    price: number;
    repeatable: boolean;
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
    avatar: number,
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
    value: number;
    unit: string;
    tooltip_total: string;
    tooltip_session: string;
}

export interface StatisticsState {
    statistics: Statistic[],
    selectedStatistics: number[],
    selecting: boolean,
}
