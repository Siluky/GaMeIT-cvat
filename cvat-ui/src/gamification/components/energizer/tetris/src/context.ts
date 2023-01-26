// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import { Game, init } from './models/Game';

export const Context = React.createContext<Game>(init());
