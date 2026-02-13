'use server';

import { type BackendResponse } from '@/lib/types';

const WEBHOOK_URL = "https://eppionn8nproduction.eppionventures.ai/webhook/business-hub";

export async function sendMessage(
  userId: string,
  message: string
): Promise<BackendResponse | { error: string }> {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        channel: 'website',
        message,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('API Error:', response.status, response.statusText, errText);
      return { error: 'Sorry — something went wrong. Please try again.' };
    }

    const data = await response.json();

    // Accept both array and object shapes as per contract
    const first = Array.isArray(data) ? data[0] : data;

    if (!first) {
      console.error('Empty response:', data);
      return { error: 'Sorry — something went wrong. Please try again.' };
    }

    // Unwrap n8n item shape if present: { json: {...} }
    const payload = first.json ?? first;

    return payload as BackendResponse;
  } catch (error) {
    console.error('Fetch Error:', error);
    return { error: 'Sorry — something went wrong. Please try again.' };
  }
}
