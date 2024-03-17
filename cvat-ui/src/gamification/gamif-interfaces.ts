// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

export interface UserData {
    last_login: number, // https://stackoverflow.com/questions/4744299/how-to-get-datetime-in-javascript
    images_annotated: number,
    polygons_drawn: number,
    images_annotated_night: number,

    annotation_time: number,
    annotation_time_avg: number,
    annotation_streak_current: number,
    annotation_streak_max: number,
    streak_saver_active: boolean,

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
    mystery_gifts_bought: number,
    money_badge_tier: number,

    chat_messages: number,
}

export interface GamifImagesFinishedLog {
    logs: UrlLog[]
}

export interface ImageStatus {
    id: number,
    finished: boolean,
}

export interface UrlLog {
    id: number,
    statuses: ImageStatus[],
}

export interface UserDataState {
    userdata_session: UserData,
    userdata_total: UserData,
    userId: number,
    username: string,
    surveyPromptVisible: boolean,
    surveyTiming: number,
    imagesFinished: GamifImagesFinishedLog,
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

    receivedOn: Date | string | null;
    visible: boolean;
}

interface EnergizerBadges {
    quizBadge: number;
    tetrisBadge: number;
    snakeBadge: number;
}

export interface BadgeState {
    currentUserId: number;
    availableBadges: Badge[];
    selectedBadgeId: number;
    badgesinProfile: number[];
    loading: boolean;
    isBadgeOverviewVisible: boolean;
    overlayMessage: string;
    energizerBadges: EnergizerBadges;
}

export enum ChallengeType {
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    SPECIAL = 'SPECIAL',
}

export interface Challenge {
    id: number;
    instruction: string;
    importedProgress: number;
    baselineValue: number;
    progress: number;
    goal: number;
    goal_variance: number;
    reward: number;
    reward_variance: number;
    challengeType: ChallengeType;
}

export interface ChallengeState {
    availableChallenges: Challenge[];
}

export enum EnergizerType {
    TETRIS = 'TETRIS',
    SNAKE = 'SNAKE',
    QUIZ = 'QUIZ',
    RANDOM = 'RANDOM',
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
    highlighted?: boolean;
}

export interface EnergizerState {
    energyLevel: number,
    active: boolean,
    popupOpen: boolean,
    energyGainEnabled: boolean,

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
    visible: boolean;
    icon: any;
    onPurchase: () => void;
}

export interface ShopState {
    availableItems: ShopItem[];
    currentBalance: number;
    selectedItemId: number;
    overlayMessage: string;
}

export enum OnlineStatus {
    ONLINE = 'ONLINE',
    DO_NOT_DISTURB = 'DO_NOT_DISTURB',
    OFFLINE = 'OFFLINE',
}

interface ProfileStyle {
    additionalClassNames: number,
    background: number,
    color: number,
    border: number,
    backgroundElements: number,
    // avatar: number,
    // avatarBorder: string,
}

export interface BadgeStatus {
    id: number,
    tier: BadgeTier,
    receivedOn: string,
}

export interface Profile {
    username: string,
    userId: number,
    status: OnlineStatus,
    selectedBadges: number[],
    selectedBadgeStatuses: BadgeStatus[],
    profileStyle: ProfileStyle,
    chatActive: boolean,
}

export interface Message {
    sender: boolean;
    content: string;
    timestamp: string | any;
}

export interface ChatRoom {
    otherUserId: number,
    messages: Message[],
}

export interface SocialState {
    status: OnlineStatus,
    friendListEntries: Profile[],
    ownProfile: Profile,
    chats: ChatRoom[],
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
