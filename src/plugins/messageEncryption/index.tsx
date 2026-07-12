/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./style.css";

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import type { User } from "@vencord/discord-types";
import { Menu } from "@webpack/common";
import { CogWheel } from "@components/Icons";

import { ChatBarButton, ChatBarButtonFactory } from "@api/ChatButtons";
import { showToast, Toasts, useState } from "@webpack/common";
import { LockIcon, LockDisabledIcon } from "./Icons";
import { openSetKeyModal } from "./SetKeyModal";
import { settings } from "./settings";

let encryptionEnabled = false;

interface UserContextMenuProps {
    user: User;
}

const userContextMenuPatch = (children, { user }: UserContextMenuProps) => {
    if (!user) return;

    children.push(
        <Menu.MenuItem
            id="vc-set-encryption-key"
            label="Set Encryption Key"
            icon={CogWheel}
            action={() => openSetKeyModal(user)}
        />,
    );
};


export const EncryptionChatBarButton: ChatBarButtonFactory = ({ isMainChat }) => {
    console.log("EncryptionChatBarButton", { isMainChat });
    if (!isMainChat) return null;

    const [enabled, setEnabled] = useState(false);

    const handleClick = async () => {
        encryptionEnabled = !enabled;
        setEnabled(!enabled);
    };

    return (
        <ChatBarButton
            tooltip={enabled ? "Encryption Enabled" : "Encryption Disabled"}
            onClick={handleClick}
        >
            {enabled ? <LockIcon /> : <LockDisabledIcon />}
        </ChatBarButton>
    );
};

export default definePlugin({
    name: "MessageEncryption",
    description: "End-to-end privacy for your Discord messages. Encrypt a message with a private key, and share your public key with your friends.",
    tags: ["Chat", "Privacy"],
    authors: [Devs.puv],
    settings,
    chatBarButton: {
        render: EncryptionChatBarButton,
        icon: LockIcon,
    },

    contextMenus: {
        "user-context": userContextMenuPatch,
    },

    start() {
        console.log("MessageEncryption started");
    },

    stop() {
        console.log("MessageEncryption stopped");
    }
});
