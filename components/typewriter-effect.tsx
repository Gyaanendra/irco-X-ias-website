"use client";

import { cn } from "@/app/lib/utils";
import { motion } from "framer-motion";

export const TypewriterEffectSmooth = ({
  words,
  className,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  const renderWords = () => (
    <div>
      {wordsArray.map((word, idx) => (
        <div key={`word-${idx}`} className="inline-block">
          {word.text.map((char, index) => (
            <span key={`char-${index}`} className={cn(`dark:text-white text-black`, word.className)}>
              {char}
            </span>
          ))}
          &nbsp;
        </div>
      ))}
    </div>
  );

  return (
    <div className={cn("flex space-x-1 my-6", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{ width: "0%" }}
        whileInView={{ width: "fit-content" }}
        transition={{ duration: 2, ease: "linear", delay: 1 }}
      >
        <div
          className="text-xs sm:text-base md:text-xl lg:text-3xl xl:text-5xl font-bold"
          style={{ whiteSpace: "nowrap" }}
        >
          {renderWords()}{" "}
        </div>{" "}
      </motion.div>
    </div>
  );
};
