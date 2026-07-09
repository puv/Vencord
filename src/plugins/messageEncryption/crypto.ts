const PUBKEY_PREFIX = "v1:";

const ECDH_ALGORITHM = { name: "ECDH", namedCurve: "P-256" } as const;

export interface StoredKeyPair {
    publicKeyJwk: JsonWebKey;
    privateKeyJwk: JsonWebKey;
    createdAt: number;
}

function btourl(bytes: Uint8Array): string {
    return btoa(String.fromCharCode(...bytes))
        .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function urltob(b64: string): Uint8Array {
    b64 = b64.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    return Uint8Array.from(atob(b64), c => c.charCodeAt(0));
}

export async function generateKeyPair(): Promise<StoredKeyPair> {
    const pair = await crypto.subtle.generateKey(
        ECDH_ALGORITHM, true, ["deriveBits"],
    );
    const [publicKeyJwk, privateKeyJwk] = await Promise.all([
        crypto.subtle.exportKey("jwk", pair.publicKey),
        crypto.subtle.exportKey("jwk", pair.privateKey),
    ]);
    return { publicKeyJwk, privateKeyJwk, createdAt: Date.now() };
}

export function serializePublicKey(jwk: JsonWebKey): string {
    const x = urltob(jwk.x!);
    const y = urltob(jwk.y!);
    const combined = new Uint8Array(64);
    combined.set(x, 0);
    combined.set(y, 32);
    return PUBKEY_PREFIX + btourl(combined);
}
