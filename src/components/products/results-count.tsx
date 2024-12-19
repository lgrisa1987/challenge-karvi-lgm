"use client";
import { formatNumber } from "@/lib/utils";
import { motion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

type ResultsCount = {
  count: number;
};

const ResultsCount = ({ count }: ResultsCount) => {
  const [animatedPrice, setAnimatedPrice] = useState(0);
  const springSubCount = useSpring(0, { bounce: 0, duration: 1000 });

  springSubCount.on("change", (value) => setAnimatedPrice(value));
  useEffect(() => {
    springSubCount.set(count);
  }, [count, springSubCount]);
  return (
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {formatNumber(Math.round(animatedPrice))} resultado
      {count === 1 ? "" : "s"}
    </motion.span>
  );
};

export default ResultsCount;
