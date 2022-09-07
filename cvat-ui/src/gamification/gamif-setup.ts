// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { getCVATStore } from '../cvat-store';

// TODO: save somewhere more reasonable in state
export const getUserId = (): number => getCVATStore().getState().badges.currentUserId;
// export const getUserName = (): string => getCVATStore.getState().badges.
