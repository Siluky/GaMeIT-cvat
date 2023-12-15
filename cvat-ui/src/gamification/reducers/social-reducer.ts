// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';
import { SocialActionTypes } from '../actions/social-actions';
import { SocialState, OnlineStatus, Profile } from '../gamif-interfaces';

const profile: Profile = {
    username: 'My Username',
    userId: 0,
    status: OnlineStatus.OFFLINE,
    selectedBadges: [],
    selectedBadgeStatuses: [],
    profileStyle: {
        additionalClassNames: 0,
        background: 0,
        color: 0,
        border: 0,
        backgroundElements: 0,
    },
    chatActive: false,
    chatVisible: false,
    sentAMessage: false,
};

const defaultState: SocialState = {
    status: OnlineStatus.OFFLINE,
    friendListEntries: [],
    ownProfile: profile,
    chats: [],
};

export default (state = defaultState, action: AnyAction): SocialState => {
    switch (action.type) {
        case SocialActionTypes.GET_FRIENDS_LIST_FAILED: {
            return {
                ...state,
            };
        }
        case SocialActionTypes.GET_FRIENDS_LIST_SUCCESS: {
            const friendListEntrieswithChatInfo = action.payload.map((profileImport: Profile) => {
                // eslint-disable-next-line max-len
                const relevantProfile = state.friendListEntries.find((_profile: Profile) => profileImport.userId === _profile.userId);
                return {
                    ...profileImport,
                    chatActive: relevantProfile?.chatActive ? relevantProfile?.chatActive : false,
                };
            });
            // console.log('🚀 ~ file
            // : social-reducer.ts:48 ~ friendListEntrieswithChatInfo ~
            // friendListEntrieswithChatInfo:', friendListEntrieswithChatInfo);

            return {
                ...state,
                friendListEntries: friendListEntrieswithChatInfo,
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

        case SocialActionTypes.SET_ADDITIONAL_CLASSNAMES: {
            return {
                ...state,
                ownProfile: {
                    ...state.ownProfile,
                    profileStyle: { ...state.ownProfile.profileStyle, additionalClassNames: action.payload },
                },
            };
        }

        case SocialActionTypes.SET_PROFILE_BACKGROUND: {
            return {
                ...state,
                ownProfile: {
                    ...state.ownProfile,
                    profileStyle: { ...state.ownProfile.profileStyle, background: action.payload },
                },
            };
        }

        case SocialActionTypes.SET_COLOR: {
            return {
                ...state,
                ownProfile: {
                    ...state.ownProfile,
                    profileStyle: { ...state.ownProfile.profileStyle, color: action.payload },
                },
            };
        }

        case SocialActionTypes.SET_PROFILE_BORDER: {
            return {
                ...state,
                ownProfile: {
                    ...state.ownProfile,
                    profileStyle: { ...state.ownProfile.profileStyle, border: action.payload },
                },
            };
        }

        case SocialActionTypes.SET_BACKGROUND_ELEMENTS: {
            return {
                ...state,
                ownProfile: {
                    ...state.ownProfile,
                    profileStyle: { ...state.ownProfile.profileStyle, backgroundElements: action.payload },
                },
            };
        }

        case SocialActionTypes.GET_CHAT_HISTORY_FAILED: {
            return {
                ...state,
            };
        }

        case SocialActionTypes.GET_CHAT_HISTORY_SUCCESS: {
            const { chats } = state;

            const relevantChat = chats.find((chat) => chat.otherUserId === action.payload.id);
            if (!relevantChat) {
                return {
                    ...state,
                    chats: state.chats.concat({
                        otherUserId: action.payload.id,
                        messages: action.payload.messages ?? [],
                    }),
                };
            }

            const updatedChats = chats.map((chat) => {
                if (chat.otherUserId === action.payload.id) {
                    return { ...chat, messages: action.payload.messages };
                }
                return chat;
            });

            return {
                ...state,
                chats: updatedChats,
            };
        }

        case SocialActionTypes.SEND_MESSAGE_FAILED: {
            return {
                ...state,
            };
        }

        case SocialActionTypes.SEND_MESSAGE_SUCCESS: {
            const { chats } = state;
            chats.map((chat) => {
                if (chat.otherUserId === action.payload.id) {
                    return chat.messages.concat({
                        sender: true,
                        content: action.payload.message,
                        timestamp: Date.now(),
                    });
                }
                return chat;
            });

            return {
                ...state,
                chats,
            };
        }

        case SocialActionTypes.SET_HAS_SENT_MESSAGE: {
            const { friend, hasSentMessage } = action.payload;
            const { friendListEntries } = state;

            const updatedFriends = friendListEntries.map((elem) => {
                if (elem.userId === friend.userId) {
                    return { ...elem, sentAMessage: hasSentMessage, chatVisible: true };
                }
                return elem;
            });

            return {
                ...state,
                friendListEntries: updatedFriends,
            };
        }

        case SocialActionTypes.GET_NEW_MESSAGES_FAILED: {
            return {
                ...state,
            };
        }

        default: {
            return state;
        }
    }
};
