'use server';

import { type BackendResponse } from '@/lib/types';

const WEBHOOK_URL = "https://mrjeffrey.app.n8n.cloud/webhook/sales";

export async function sendMessage(userId: string, message: string): Promise<BackendResponse | { error: string }> {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        channel: 'website',
        message,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      return { error: 'Sorry — something went wrong. Please try again.' };
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
        console.error('Malformed response:', data);
        return { error: 'Sorry — something went wrong. Please try again.' };
    }

    return data[0] as BackendResponse;

  } catch (error) {
    console.error('Fetch Error:', error);
    return { error: 'Sorry — something went wrong. Please try again.' };
  }
}
