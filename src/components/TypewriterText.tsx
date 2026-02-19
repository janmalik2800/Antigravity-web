"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
    words: string[];
    className?: string;
    typingSpeed?: number;
    pauseTime?: number;
}

export default function TypewriterText({
    words,
    className = "",
    typingSpeed = 100,
    pauseTime = 2000
}: TypewriterTextProps) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const word = words[currentWordIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // Typing
                setCurrentText(word.substring(0, currentText.length + 1));
                if (currentText.length === word.length) {
                    // Finished typing, wait before deleting
                    setTimeout(() => setIsDeleting(true), pauseTime);
                }
            } else {
                // Deleting
                setCurrentText(word.substring(0, currentText.length - 1));
                if (currentText.length === 0) {
                    // Finished deleting, move to next word
                    setIsDeleting(false);
                    setCurrentWordIndex((prev) => (prev + 1) % words.length);
                }
            }
        }, isDeleting ? typingSpeed / 2 : typingSpeed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, pauseTime]);

    return (
        <span className={`${className} inline-block min-w-[2ch]`}>
            {currentText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-[3px] h-[1em] ml-1 align-middle bg-teal"
            />
        </span>
    );
}
