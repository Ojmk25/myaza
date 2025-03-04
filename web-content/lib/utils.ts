import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: any): string {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export const getNameAbbreviationFromFrontegg = (name?: string): string => {
  if (!name) return ""; // Handle undefined or empty string cases
  return name
    .split(" ")
    .map((word: string) => word.charAt(0).toUpperCase())
    .join("");
};