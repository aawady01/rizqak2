import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind classes safely, handling conflicts and conditional classes.
 * This is the core utility required for Shadcn-inspired component architecture.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
