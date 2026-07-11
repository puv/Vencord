import type { RenderModalProps, User } from "@vencord/discord-types";
import { Forms, Modal, openModal, React, showToast, TextInput, Toasts } from "@webpack/common";
import { Button } from "@components/Button";

import { deserializePublicKey } from "./crypto";
import { loadContacts, saveContacts } from "./settings";

interface SetKeyModalProps {
    modalProps: RenderModalProps;
    user: User;
}

export function openSetKeyModal(user: User) {
    openModal(modalProps => (
        <SetKeyModal modalProps={modalProps} user={user} />
    ));
}

function SetKeyModal({ modalProps, user }: SetKeyModalProps) {
    const [input, setInput] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);

    const handleSave = async () => {
        const serializedKey = input.trim();
        const jwk = deserializePublicKey(serializedKey);
        if (!jwk) {
            showToast("Invalid public key format. Make sure it starts with 🔑v1:", Toasts.Type.FAILURE);
            return;
        }

        const contacts = await loadContacts();
        contacts[user.id] = { publicKeyJwk: jwk, addedAt: Date.now() };
        await saveContacts(contacts);

        showToast(`Encryption key saved for ${user.username || user.globalName || "user"}.`, Toasts.Type.SUCCESS);
        modalProps.onClose();
    };

    return (
        <Modal {...modalProps}
            title={`Set Encryption Key for ${user.username ?? user.globalName ?? user.id}`}
            size="md"
        >
            <div>
                <Forms.FormTitle tag="h5">Public Key</Forms.FormTitle>
                <TextInput
                    placeholder="v1:..."
                    value={input}
                    onChange={v => { setInput(v); }}
                    autoFocus
                />
            </div>
            <div className="vc-message-encryption-btn-row">
                <Button
                    className="vc-message-encryption-btn"
                    onClick={handleSave}
                    disabled={!input.trim()}
                >
                    Save Key
                </Button>
                <Button
                    className="vc-message-encryption-btn"
                    style={{ background: "transparent" }}
                    onClick={modalProps.onClose}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    );
}
