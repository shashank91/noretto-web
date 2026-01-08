"use client";

import { useMemo } from "react";
import styles from "./Sparks.module.css";

interface SparksProps {
  count?: number;
  frequency?: number; // Time in seconds between spark waves (default: 3)
}

const DIRECTIONS = [
  "Right",
  "Left", 
  "Down",
  "Up",
  "DiagBR",
  "DiagBL",
  "DiagTR",
  "DiagTL",
] as const;

export function Sparks({ count = 16, frequency = 3 }: SparksProps) {
  const sparks = useMemo(() => {
    const sparksPerDirection = Math.ceil(count / DIRECTIONS.length);
    const allSparks: { direction: string; delay: number; isDiagonal: boolean }[] = [];

    DIRECTIONS.forEach((direction) => {
      const isDiagonal = direction.startsWith("Diag");
      for (let i = 0; i < sparksPerDirection; i++) {
        // Stagger delays evenly across the animation duration
        const delay = (i / sparksPerDirection) * frequency;
        allSparks.push({ direction, delay, isDiagonal });
      }
    });

    // Limit to the requested count
    return allSparks.slice(0, count);
  }, [count, frequency]);

  return (
    <>
      {sparks.map((spark, index) => (
        <div
          key={index}
          className={`${styles.spark} ${styles[`spark${spark.direction}`]}`}
          style={{ 
            animationDelay: `${spark.delay}s`,
            animationDuration: `${spark.isDiagonal ? frequency * 1.17 : frequency}s`
          }}
        />
      ))}
    </>
  );
}
