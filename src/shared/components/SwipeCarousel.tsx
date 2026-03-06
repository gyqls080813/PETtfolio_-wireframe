import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SwipeCarouselProps {
    views: React.ReactNode[];
}

export default function SwipeCarousel({ views }: SwipeCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = 0;
            if (nextIndex >= views.length) nextIndex = views.length - 1;
            return nextIndex;
        });
    };

    return (
        <div className="relative w-full overflow-hidden flex flex-col h-full flex-1">
            <div className="relative flex-1">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold && currentIndex < views.length - 1) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold && currentIndex > 0) {
                                paginate(-1);
                            }
                        }}
                        className="absolute w-full h-full flex flex-col"
                    >
                        {views[currentIndex]}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-4 shrink-0">
                {views.map((_, i) => (
                    <button
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? "bg-[var(--app-primary)]" : "bg-[var(--app-border)]"}`}
                        onClick={() => {
                            setDirection(i > currentIndex ? 1 : -1);
                            setCurrentIndex(i);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

