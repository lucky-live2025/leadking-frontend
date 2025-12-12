"use client";

import { apiGet } from "./api";

export async function getEngines() {
  try {
    const data = await apiGet("/ai/engines");
    return data;
  } catch (error: any) {
    console.error("Failed to load engines:", error);
    throw new Error("Failed to load engines");
  }
}
