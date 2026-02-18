'use server';

import { type BackendResponse } from '@/lib/types';

const WEBHOOK_URL = "https://eppionn8nproduction.eppionventures.ai/webhook/business-hub";

export const maxDuration = 60; // Allow up to 60 seconds for slow webhook responses

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
      console.error('API Error:', response.status, response.statusText);
      return { error: `The server responded with an error (${response.status}). Please try again.` };
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      return { error: 'Failed to read the response from the assistant.' };
    }
    
    // Validate the response format [ { ... } ]
    if (!data || (Array.isArray(data) && data.length === 0)) {
        return { error: 'The assistant returned an empty response.' };
    }

    const payload = Array.isArray(data) ? data[0] : data;

    if (!payload || typeof payload !== 'object') {
      console.error('Invalid payload shape:', payload);
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
    console.error('Fetch Error:', error);
    if (error.name === 'AbortError' || error.message?.includes('timeout')) {
      return { error: 'The request timed out. The assistant is taking too long to respond.' };
    }
    return { error: 'Sorry — something went wrong with the connection. Please try again.' };
  }
}
