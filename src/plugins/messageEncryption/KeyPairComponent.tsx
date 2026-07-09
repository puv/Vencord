import { Forms, React, TextInput } from "@webpack/common";
import { Button } from "@components/Button";
import { CopyIcon } from "@components/Icons";

export function KeyPairComponent() {
    const [privateKey, setPrivateKey] = React.useState("");
    const [publicKey, setPublicKey] = React.useState("");

    const handleCopy = () => {
        if (!publicKey) return;
        navigator.clipboard.writeText(publicKey);
    };

    const handleGenerateKeyPair = async () => {

    };

    return (
        <div className="vc-message-encryption">
            <div className="vc-message-encryption-settings">
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

                <Button
                    size="medium"
                    onClick={handleGenerateKeyPair}
                >
                    Generate Key Pair
                </Button>
            </div>
        </div>
    );
}
