'use client'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://127.0.0.1:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function formatCurrency(number: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}

export function formatNumber(number: number) {
  return new Intl.NumberFormat("id-ID").format(number);
}

export function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
  }).format(date);
}

export function formatTime(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    timeStyle: "short",
  }).format(date);
}

export function getToken() {
  if (typeof window !== "undefined") {
    return "";
  }
  const session = localStorage.getItem("localSession");
  if (!session) {
    return "";
  }
  const sess = JSON.parse(session);
  return sess.accessToken;

}

export function userSession() {
  return JSON.parse(localStorage.getItem('localSession') ?? "")
}