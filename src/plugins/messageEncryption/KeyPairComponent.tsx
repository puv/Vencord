import { Forms, React, TextInput, Toasts, showToast } from "@webpack/common";
import { Button } from "@components/Button";
import { CopyIcon } from "@components/Icons";

import { generateKeyPair, serializePublicKey } from "./crypto";
import { loadKeyPair, saveKeyPair } from "./settings";

export function KeyPairComponent() {
    const [privateKey, setPrivateKey] = React.useState("");
    const [publicKey, setPublicKey] = React.useState("");
    const [hasKeyPair, setHasKeyPair] = React.useState(false);

    React.useEffect(() => {
        loadKeyPair().then(kp => {
            if (kp) {
                setPrivateKey(kp.privateKeyJwk.d!);
                setPublicKey(serializePublicKey(kp.publicKeyJwk));
                setHasKeyPair(true);
            }
        });
    }, []);

    const handleCopy = () => {
        if (!publicKey) return;
        navigator.clipboard.writeText(publicKey);
        showToast("Public key copied to clipboard.", Toasts.Type.SUCCESS);
    };

    const handleGenerateKeyPair = async () => {
        const kp = await generateKeyPair();
        if (kp) {
            setPrivateKey(kp.privateKeyJwk.d!);
            setPublicKey(serializePublicKey(kp.publicKeyJwk));
            await saveKeyPair(kp);
            setHasKeyPair(true);
            showToast("Key pair generated and saved.", Toasts.Type.SUCCESS);
        }
    };

    return (
        <div className="vc-message-encryption">
            <div className="vc-message-encryption-settings">
                <div className="vc-message-encryption-keys-row">
                    <div className="vc-message-encryption-input-group">
                        <Forms.FormTitle tag="h5">Private Key</Forms.FormTitle>
                        <TextInput
                            value={privateKey}
                            disabled
                            placeholder="Generate a key pair first..."
                        />
                    </div>

                    <div className="vc-message-encryption-input-group">
                        <Forms.FormTitle tag="h5">Public Key</Forms.FormTitle>
                        <div className="vc-message-encryption-input-row">
                            <TextInput
                                value={publicKey}
                                disabled
                                placeholder="Generate a key pair first..."
                            />
                            <Button
                                size="iconOnly"
                                disabled={!publicKey}
                                onClick={handleCopy}
                            >
                                <CopyIcon aria-label="Copy Public Key" width={20} height={20} />
                            </Button>
                        </div>
                    </div>
                </div>

                <Button
                    size="medium"
                    onClick={handleGenerateKeyPair}
                >
                    {hasKeyPair ? "Regenerate Key Pair" : "Generate Key Pair"}
                </Button>
            </div>
        </div>
    );
}
