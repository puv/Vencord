/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./style.css";

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

import { settings } from "./settings";

export default definePlugin({
    name: "MessageEncryption",
    description: "End-to-end privacy for your Discord messages. Encrypt a message with a private key, and share your public key with your friends.",
    tags: ["Chat", "Privacy"],
    authors: [Devs.puv],
    settings,

    start() {
        console.log("MessageEncryption started");
    },

    stop() {
        console.log("MessageEncryption stopped");
    }
});
