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

import pomeImg from "../../../../assets/pome.png";
import catImg from "../../../../assets/cat.png";
import pomeHappy from "../../../../assets/pome_thumbsup.png";
import catHappy from "../../../../assets/cat_thumbsup.png";
import pomeSleepy from "../../../../assets/pome_sad.png";
import catSleepy from "../../../../assets/cat_sad.png";

const getImgSrc = (img: any): string => typeof img === 'string' ? img : (img?.src || (img as string));

export default function PetAvatar({
    pet,
    size = "sm",
    mood = "default",
    className = "",
    border = true,
    fullBody = false,
}: PetAvatarProps) {
    // Pick the right photo based on pet and mood
    let photoUrl: any;
    if (pet === "choco" || pet === "강아지") {
        if (mood === "happy") photoUrl = pomeHappy;
        else if (mood === "sleepy") photoUrl = pomeSleepy;
        else photoUrl = pomeImg;
    } else if (pet === "nabi" || pet === "고양이") {
        if (mood === "happy") photoUrl = catHappy;
        else if (mood === "sleepy") photoUrl = catSleepy;
        else photoUrl = catImg;
    } else {
        photoUrl = pomeImg;
    }
    
    const resolvedSrc = photoUrl ? getImgSrc(photoUrl) : undefined;

    const sizeClass = sizeMap[size] ?? sizeMap.sm;

    // Full body mode: no circle crop, just render the image
    if (fullBody) {
        return (
            <div className={`${sizeClass} shrink-0 ${className}`}>
                {resolvedSrc ? (
                    <img
                        src={resolvedSrc}
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
            {resolvedSrc ? (
                <img
                    src={resolvedSrc}
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
