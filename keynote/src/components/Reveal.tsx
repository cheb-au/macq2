import type { CSSProperties, ElementType, ReactNode } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { useBeat } from "../engine/PresentationContext";

type Variant = "up" | "soft" | "fade" | "rise" | "head";

interface RevealProps {
  /** beat at which this element appears */
  at?: number;
  /** stagger order within the same beat */
  i?: number;
  /** optionally dim (rather than hide) once a later beat arrives */
  until?: number;
  variant?: Variant;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const variantClass: Record<Variant, string> = {
  up: "",
  soft: "reveal--soft",
  fade: "reveal--fade",
  rise: "reveal--rise",
  head: "reveal--head",
};

export function Reveal({
  at = 0,
  i = 0,
  until,
  variant = "up",
  as,
  className = "",
  style,
  children,
}: RevealProps) {
  const beat = useBeat();
  const Tag = (as ?? "div") as ElementType;
  const shown = beat >= at;
  const dimmed = until !== undefined && beat > until;

  return (
    <Tag
      className={[
        "reveal",
        variantClass[variant],
        shown ? "is-shown" : "",
        until !== undefined ? "dim-past" : "",
        dimmed ? "is-dimmed" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ ["--i" as string]: i, ...style }}
    >
      {children}
    </Tag>
  );
}

type Grad = "ink" | "accent" | "gold" | "violet";

// All gradients are VERTICAL so each word can carry the full gradient over its
// own box and the line still reads as one - no per-word measurement, and blur +
// clip live on the same element (safe).
const GRADIENTS: Record<Grad, string> = {
  ink: "linear-gradient(180deg,#ffffff 0%,#c2c8d4 100%)",
  accent: "linear-gradient(165deg,#c7ccff 0%,#8b93ff 45%,#5f86e6 100%)",
  gold: "linear-gradient(180deg,#e8d5a8 0%,#cbab74 100%)",
  violet: "linear-gradient(170deg,#cfd3ff 0%,#8b93ff 100%)",
};

interface WordsProps {
  text: string;
  at?: number;
  /** starting stagger index */
  from?: number;
  /** optional per-word clipped gradient (vertical, so it reads as one line) */
  grad?: Grad;
  className?: string;
  style?: CSSProperties;
}

/**
 * Headline that reveals word-by-word, left to right - each word starts hidden
 * and heavily blurred, then resolves into focus.
 */
export function Words({ text, at = 0, from = 0, grad, className = "", style }: WordsProps) {
  const beat = useBeat();
  const shown = beat >= at;
  const words = text.split(" ");

  const gradStyle: CSSProperties = grad
    ? {
        backgroundImage: GRADIENTS[grad],
        backgroundSize: "100% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }
    : {};

  return (
    <span
      className={["words", shown ? "is-shown" : "", className].filter(Boolean).join(" ")}
      style={style}
    >
      {words.map((w, idx) => (
        <span
          key={idx}
          className="w"
          style={{ ["--wi" as string]: from + idx, ...gradStyle }}
        >
          {w}
          {idx < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
