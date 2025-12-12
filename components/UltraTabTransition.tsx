"use client";

import { useState, useEffect, ReactNode } from "react";

interface UltraTabTransitionProps {
  children: ReactNode;
  active: boolean;
  duration?: number;
}

export default function UltraTabTransition({ children, active, duration = 300 }: UltraTabTransitionProps) {
  const [display, setDisplay] = useState(active);
  const [opacity, setOpacity] = useState(active ? 1 : 0);

  useEffect(() => {
    if (active) {
      setDisplay(true);
      setTimeout(() => setOpacity(1), 10);
    } else {
      setOpacity(0);
      setTimeout(() => setDisplay(false), duration);
    }
  }, [active, duration]);

  if (!display) return null;

  return (
    <div
      style={{
        opacity,
        transition: `opacity ${duration}ms ease-in-out`,
      }}
    >
      {children}
    </div>
  );
}

