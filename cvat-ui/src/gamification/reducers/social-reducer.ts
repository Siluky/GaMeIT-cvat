// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { SocialActionTypes } from '../actions/social-actions';
import { SocialState, OnlineStatus, Profile } from '../gamif-interfaces';

const dummyProfiles: Profile[] = [{
    username: 'Annotator 1',
    userId: 1,
    status: OnlineStatus.ONLINE,
    avatar: '1',
    avatar_border: '',
    profile_background: 'yellow',
    profile_border: '',
    selectedBadges: [1, 5, 12],
    chatActive: false,
},
{
    username: 'Annotator 2',
    userId: 2,
    status: OnlineStatus.DO_NOT_DISTURB,
    avatar: '2',
    avatar_border: '',
    profile_background: 'green',
    profile_border: '',
    selectedBadges: [1, 2, 4],
    chatActive: true,
},
{
    username: 'Annotator 3',
    userId: 3,
    status: OnlineStatus.OFFLINE,
    avatar: '3',
    avatar_border: '',
    profile_background: 'red',
    profile_border: '',
    selectedBadges: [8, 13, 2],
    chatActive: false,
},
];

const profile: Profile = {
    username: '',
    userId: 0,
    status: OnlineStatus.ONLINE,
    avatar: '',
    avatar_border: '',
    profile_background: '',
    profile_border: '',
    selectedBadges: [],
    chatActive: false,
};

const defaultState: SocialState = {
    status: OnlineStatus.ONLINE,
    friendListEntries: dummyProfiles,
    ownProfile: profile,
};

export default (state = defaultState, action: AnyAction): SocialState => {
    switch (action.type) {
        case SocialActionTypes.GET_FRIENDS_LIST_FAILED: {
            return {
                ...state,
            };
        }
        case SocialActionTypes.GET_FRIENDS_LIST_SUCCESS: {
            return {
                ...state,
                friendListEntries: action.payload,
            };
        }

        case SocialActionTypes.TOGGLE_CHAT_WINDOW: {
            const updatedFriendsList = state.friendListEntries.map(
                (_user) => {
                    if (_user.userId === action.payload.userId) return { ..._user, chatActive: action.payload.show };
                    return _user;
                },
            );

            return {
                ...state,
                friendListEntries: updatedFriendsList,
            };
        }

        case SocialActionTypes.SET_STATUS: {
            return {
                ...state,
                status: action.payload,
            };
        }

        case SocialActionTypes.SET_AVATAR: {
            return {
                ...state,
                ownProfile: { ...state.ownProfile, avatar: action.payload },
            };
        }

        case SocialActionTypes.SET_AVATAR_BORDER: {
            return {
                ...state,
                ownProfile: { ...state.ownProfile, avatar_border: action.payload },
            };
        }

        case SocialActionTypes.SET_PROFILE_BACKGROUND: {
            return {
                ...state,
                ownProfile: { ...state.ownProfile, profile_background: action.payload },
            };
        }

        case SocialActionTypes.SET_PROFILE_BORDER: {
            return {
                ...state,
                ownProfile: { ...state.ownProfile, profile_border: action.payload },
            };
        }

        case SocialActionTypes.GET_CHAT_HISTORY_FAILED: {
            return {
                ...state,
            };
        }
        case SocialActionTypes.GET_CHAT_HISTORY_SUCCESS: {
            return {
                ...state,
                // TODO: use action.payload somehow
            };
        }

        default: {
            return state;
        }
    }
};
