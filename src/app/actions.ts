'use server';

import { type BackendResponse } from '@/lib/types';

const WEBHOOK_URL = "https://eppionn8nproduction.eppionventures.ai/webhook/business-hub";

/**
 * Sends a message to the n8n webhook and returns the assistant's response.
 * Note: maxDuration cannot be exported from a 'use server' file when imported by client components.
 */
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
      return { error: `The server responded with an error (${response.status}). Please try again.` };
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      return { error: 'Failed to read the response from the assistant.' };
    }
    
    if (!data || (Array.isArray(data) && data.length === 0)) {
        return { error: 'The assistant returned an empty response.' };
    }

    const payload = Array.isArray(data) ? data[0] : data;

    if (!payload || typeof payload !== 'object') {
      return { error: 'The assistant returned an invalid data format.' };
    }

    return {
      output: payload.output || 'No response received from assistant.',
      action: payload.action || 'NURTURE',
      leadScore: payload.leadScore !== undefined ? Number(payload.leadScore) : 0,
      lead: payload.lead || {},
      calendarLink: payload.calendarLink || null,
    };
  } catch (error: any) {
    if (error.name === 'AbortError' || error.message?.includes('timeout')) {
      return { error: 'The request timed out. The assistant is taking too long to respond.' };
    }
    return { error: 'Sorry — something went wrong with the connection. Please try again.' };
  }
}
