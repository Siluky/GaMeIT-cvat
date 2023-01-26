// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

// eslint-disable-next-line @typescript-eslint/no-redeclare
/* global document */

type Callback = () => void;
const callbacks: Callback[] = [];
let isPressed = false;

function callCallbacks(): void {
    callbacks.forEach((callback) => {
        callback();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.shiftKey && !isPressed) {
        isPressed = e.shiftKey;
        callCallbacks();
    }

    return true;
});

document.addEventListener('keyup', (e) => {
    if (!e.shiftKey && isPressed) {
        isPressed = e.shiftKey;
    }

    return true;
});

export default {
    bind(callback: Callback): void {
        callbacks.push(callback);
    },

    unbind(callback: Callback): void {
        const index = callbacks.indexOf(callback);
        if (index !== -1) {
            callbacks.splice(index, 1);
        }
    },
};
