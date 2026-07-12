import { IconComponent } from "@utils/types";

export const LockIcon: IconComponent = ({ height = 24, width = 24, className, children }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            className={className}
        >
            <path
                fill="currentColor"
                d="M7 10V8 a5 5 0 0 1 10 0v2 h1a2 2 0 0 1 2 2v8 a2 2 0 0 1-2 2H6 a2 2 0 0 1-2-2v-8 a2 2 0 0 1 2-2h1zm2 0h6V8 a3 3 0 0 0-6 0v2zm3 3 a1.5 1.5 0 0 1 1.5 1.5 c0 .62-.38 1.15-.92 1.38V18 h-1.16v-2.12 A1.5 1.5 0 0 1 12 13z"
            />
            {children}
        </svg>
    );
};

export function LockDisabledIcon() {
    return (
        <LockIcon>
            <mask id="vc-lock-mask">
                <path fill="#fff" d="M0 0h24v24H0Z" />
                <path stroke="#000" strokeWidth="6" d="M0 24 24 0" />
            </mask>

            <path fill="var(--status-danger)" d="m21.178 1.70703 1.414 1.414L4.12103 21.593l-1.414-1.415L21.178 1.70703Z" />
        </LockIcon>

    );
}
