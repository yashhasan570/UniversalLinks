"use client";

import { cn } from "@universallinks/utils";

type StatusIndicatorProps = {
  label: string;
  className?: string;
};

export function StatusIndicator({ label, className }: StatusIndicatorProps) {
  return (
    <span className={cn("animate-pulse text-xs text-neutral-400", className)}>
      {label}
    </span>
  );
}
