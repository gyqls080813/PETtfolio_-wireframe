/**
 * PetAvatar - Circular pet profile photo component
 * Shows the pet's custom photo with a styled border.
 * Supports moods for different poses/expressions.
 */

interface PetAvatarProps {
    pet: "choco" | "nabi" | string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    mood?: "default" | "happy" | "sleepy";
    className?: string;
    border?: boolean;
    /** If true, uses the full-body pose image instead of circular crop */
    fullBody?: boolean;
}

const sizeMap = {
    xs: "w-5 h-5",
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
    xl: "w-28 h-28",
};

/** Base avatar photos (close-up face) */
const petPhotos: Record<string, string> = {
    choco: "/pets/choco.png",
    nabi: "/pets/nabi.png",
};

/** Mood-based full body photos */
const petMoodPhotos: Record<string, Record<string, string>> = {
    choco: {
        happy: "/pets/choco_happy.png",
        sleepy: "/pets/choco_sleepy.png",
    },
    nabi: {
        happy: "/pets/nabi_happy.png",
        sleepy: "/pets/nabi_sleepy.png",
    },
};

export default function PetAvatar({
    pet,
    size = "sm",
    mood = "default",
    className = "",
    border = true,
    fullBody = false,
}: PetAvatarProps) {
    // Pick the right photo based on mood
    let photoUrl: string | undefined;
    if (mood !== "default" && petMoodPhotos[pet]?.[mood]) {
        photoUrl = petMoodPhotos[pet][mood];
    } else {
        photoUrl = petPhotos[pet];
    }

    const sizeClass = sizeMap[size] ?? sizeMap.sm;

    // Full body mode: no circle crop, just render the image
    if (fullBody) {
        return (
            <div className={`${sizeClass} shrink-0 ${className}`}>
                {photoUrl ? (
                    <img
                        src={photoUrl}
                        alt={`${pet} ${mood}`}
                        className="w-full h-full object-contain drop-shadow-sm"
                    />
                ) : (
                    <div className="w-full h-full bg-[var(--app-primary-light)] rounded-2xl flex items-center justify-center">
                        <span className="text-[var(--app-primary)] text-xs font-bold">
                            {pet.charAt(0).toUpperCase()}
                        </span>
                    </div>
                )}
            </div>
        );
    }

    // Default circular avatar
    return (
        <div
            className={`${sizeClass} rounded-full overflow-hidden shrink-0 ${border ? "ring-2 ring-[var(--app-border)] ring-offset-1 ring-offset-[var(--app-bg-main)]" : ""
                } ${className}`}
        >
            {photoUrl ? (
                <img
                    src={photoUrl}
                    alt={`${pet} ${mood}`}
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full bg-[var(--app-primary-light)] flex items-center justify-center">
                    <span className="text-[var(--app-primary)] text-xs font-bold">
                        {pet.charAt(0).toUpperCase()}
                    </span>
                </div>
            )}
        </div>
    );
}
