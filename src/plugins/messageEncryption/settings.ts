import { get, set } from "@api/DataStore";
import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

import type { StoredKeyPair } from "./crypto";
import { KeyPairComponent } from "./KeyPairComponent";

const MY_KEYPAIR = "messageEncryption_myKeyPair_v1";
const CONTACTS = "messageEncryption_contacts_v1";

export interface ContactEntry {
    publicKeyJwk: JsonWebKey;
    addedAt: number;
}

export const settings = definePluginSettings({
    keyPairComponent: {
        type: OptionType.COMPONENT,
        component: KeyPairComponent,
    },
});

export async function loadKeyPair(): Promise<StoredKeyPair | null> {
    return (await get(MY_KEYPAIR)) ?? null;
}

export async function saveKeyPair(kp: StoredKeyPair): Promise<void> {
    await set(MY_KEYPAIR, kp);
}

export async function loadContacts(): Promise<Record<string, ContactEntry>> {
    return (await get(CONTACTS)) ?? {};
}

export async function saveContacts(contacts: Record<string, ContactEntry>): Promise<void> {
    await set(CONTACTS, contacts);
}

export async function getContactPublicKey(userId: string): Promise<JsonWebKey | null> {
    const contacts = await loadContacts();
    return contacts[userId]?.publicKeyJwk ?? null;
}
