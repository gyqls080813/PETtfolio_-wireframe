/**
 * Cute SVG Pet Character Component
 * Renders an adorable dog or cat character with different moods and sizes
 */

interface PetCharacterProps {
    type: "dog" | "cat";
    size?: "sm" | "md" | "lg" | "xl";
    mood?: "happy" | "sleepy" | "excited" | "wink";
    className?: string;
}

const sizeMap = {
    sm: 48,
    md: 80,
    lg: 120,
    xl: 180,
};

export default function PetCharacter({
    type,
    size = "md",
    mood = "happy",
    className = "",
}: PetCharacterProps) {
    const s = sizeMap[size];

    if (type === "dog") {
        return (
            <svg
                width={s}
                height={s}
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
            >
                {/* Body */}
                <ellipse cx="100" cy="115" rx="65" ry="60" fill="#E8C5A0" />
                {/* Head */}
                <circle cx="100" cy="85" r="55" fill="var(--app-primary)" />
                {/* Inner face */}
                <circle cx="100" cy="90" r="42" fill="var(--app-primary-light)" />
                {/* Floppy ears */}
                <ellipse cx="52" cy="60" rx="20" ry="32" fill="var(--app-primary-dark)" transform="rotate(-15 52 60)" />
                <ellipse cx="148" cy="60" rx="20" ry="32" fill="var(--app-primary-dark)" transform="rotate(15 148 60)" />
                {/* Inner ears */}
                <ellipse cx="54" cy="62" rx="12" ry="20" fill="#E8C5A0" transform="rotate(-15 54 62)" />
                <ellipse cx="146" cy="62" rx="12" ry="20" fill="#E8C5A0" transform="rotate(15 146 62)" />
                {/* Eyes */}
                {mood === "sleepy" ? (
                    <>
                        <path d="M78 84 Q84 80 90 84" stroke="#5C4033" strokeWidth="3" strokeLinecap="round" fill="none" />
                        <path d="M110 84 Q116 80 122 84" stroke="#5C4033" strokeWidth="3" strokeLinecap="round" fill="none" />
                    </>
                ) : mood === "wink" ? (
                    <>
                        <circle cx="82" cy="82" r="5" fill="var(--app-text-main)" />
                        <circle cx="80" cy="80" r="2" fill="white" />
                        <path d="M112 84 Q118 80 124 84" stroke="#5C4033" strokeWidth="3" strokeLinecap="round" fill="none" />
                    </>
                ) : (
                    <>
                        <circle cx="82" cy="82" r="5" fill="var(--app-text-main)" />
                        <circle cx="80" cy="80" r="2" fill="white" />
                        <circle cx="118" cy="82" r="5" fill="var(--app-text-main)" />
                        <circle cx="116" cy="80" r="2" fill="white" />
                    </>
                )}
                {/* Nose */}
                <ellipse cx="100" cy="96" rx="6" ry="4.5" fill="#5C4033" />
                {/* Mouth */}
                {mood === "excited" ? (
                    <path d="M90 102 Q100 115 110 102" stroke="#5C4033" strokeWidth="2.5" fill="#E07C6A" strokeLinecap="round" />
                ) : mood === "happy" || mood === "wink" ? (
                    <>
                        <path d="M92 102 Q100 110 108 102" stroke="#5C4033" strokeWidth="2" fill="none" strokeLinecap="round" />
                    </>
                ) : (
                    <path d="M95 104 Q100 107 105 104" stroke="#5C4033" strokeWidth="2" fill="none" strokeLinecap="round" />
                )}
                {/* Blush */}
                <circle cx="70" cy="96" r="8" fill="#E8A0A0" opacity="0.35" />
                <circle cx="130" cy="96" r="8" fill="#E8A0A0" opacity="0.35" />
                {/* Tail */}
                <path d="M155 130 Q175 100 165 85" stroke="var(--app-primary-dark)" strokeWidth="8" strokeLinecap="round" fill="none" />
                {/* Paws */}
                <ellipse cx="75" cy="160" rx="15" ry="10" fill="var(--app-primary)" />
                <ellipse cx="125" cy="160" rx="15" ry="10" fill="var(--app-primary)" />
                {/* Paw pads */}
                <circle cx="71" cy="160" r="3.5" fill="var(--app-primary-dark)" />
                <circle cx="79" cy="160" r="3.5" fill="var(--app-primary-dark)" />
                <circle cx="121" cy="160" r="3.5" fill="var(--app-primary-dark)" />
                <circle cx="129" cy="160" r="3.5" fill="var(--app-primary-dark)" />
            </svg>
        );
    }

    // Cat
    return (
        <svg
            width={s}
            height={s}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Body */}
            <ellipse cx="100" cy="118" rx="58" ry="55" fill="var(--app-primary-light)" />
            {/* Head */}
            <circle cx="100" cy="88" r="52" fill="#E8C5A0" />
            {/* Inner face */}
            <circle cx="100" cy="93" r="40" fill="#FFF5E9" />
            {/* Pointed ears */}
            <polygon points="58,50 42,15 75,45" fill="#E8C5A0" />
            <polygon points="142,50 158,15 125,45" fill="#E8C5A0" />
            {/* Inner ears */}
            <polygon points="59,48 48,22 72,45" fill="#F0B8B8" />
            <polygon points="141,48 152,22 128,45" fill="#F0B8B8" />
            {/* Eyes */}
            {mood === "sleepy" ? (
                <>
                    <path d="M78 86 Q84 82 90 86" stroke="#5C4033" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <path d="M110 86 Q116 82 122 86" stroke="#5C4033" strokeWidth="3" strokeLinecap="round" fill="none" />
                </>
            ) : mood === "wink" ? (
                <>
                    <ellipse cx="84" cy="84" rx="5" ry="6" fill="var(--app-text-main)" />
                    <circle cx="82" cy="82" r="2" fill="white" />
                    <path d="M112 86 Q118 82 124 86" stroke="#5C4033" strokeWidth="3" strokeLinecap="round" fill="none" />
                </>
            ) : (
                <>
                    <ellipse cx="82" cy="84" rx="5" ry="6" fill="var(--app-text-main)" />
                    <circle cx="80" cy="82" r="2" fill="white" />
                    <ellipse cx="118" cy="84" rx="5" ry="6" fill="var(--app-text-main)" />
                    <circle cx="116" cy="82" r="2" fill="white" />
                </>
            )}
            {/* Nose */}
            <path d="M97 97 L100 101 L103 97 Z" fill="#F0A0A0" />
            {/* Mouth */}
            {mood === "excited" ? (
                <path d="M90 104 Q100 116 110 104" stroke="#5C4033" strokeWidth="2.5" fill="#E07C6A" strokeLinecap="round" />
            ) : mood === "happy" || mood === "wink" ? (
                <>
                    <path d="M93 104 Q96.5 108 100 104 Q103.5 108 107 104" stroke="#5C4033" strokeWidth="2" fill="none" strokeLinecap="round" />
                </>
            ) : (
                <path d="M96 105 Q100 108 104 105" stroke="#5C4033" strokeWidth="2" fill="none" strokeLinecap="round" />
            )}
            {/* Whiskers */}
            <line x1="60" y1="92" x2="40" y2="88" stroke="#C4A684" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="60" y1="98" x2="38" y2="100" stroke="#C4A684" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="140" y1="92" x2="160" y2="88" stroke="#C4A684" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="140" y1="98" x2="162" y2="100" stroke="#C4A684" strokeWidth="1.5" strokeLinecap="round" />
            {/* Blush */}
            <circle cx="68" cy="100" r="7" fill="#F0B8B8" opacity="0.35" />
            <circle cx="132" cy="100" r="7" fill="#F0B8B8" opacity="0.35" />
            {/* Tail */}
            <path d="M150 140 Q180 120 170 90 Q165 80 158 85" stroke="#E8C5A0" strokeWidth="10" strokeLinecap="round" fill="none" />
            {/* Paws */}
            <ellipse cx="78" cy="162" rx="14" ry="9" fill="#E8C5A0" />
            <ellipse cx="122" cy="162" rx="14" ry="9" fill="#E8C5A0" />
            {/* Paw pads */}
            <circle cx="74" cy="162" r="3" fill="var(--app-primary)" />
            <circle cx="82" cy="162" r="3" fill="var(--app-primary)" />
            <circle cx="118" cy="162" r="3" fill="var(--app-primary)" />
            <circle cx="126" cy="162" r="3" fill="var(--app-primary)" />
        </svg>
    );
}
