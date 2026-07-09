import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";
import { KeyPairComponent } from "./KeyPairComponent";

export const settings = definePluginSettings({
    keyPairComponent: {
        type: OptionType.COMPONENT,
        component: KeyPairComponent,
    },
});
