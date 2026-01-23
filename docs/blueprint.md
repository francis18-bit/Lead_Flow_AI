# **App Name**: LeadFlow AI

## Core Features:

- Webhook Integration: Integrate with a backend webhook (https://mrjeffrey.app.n8n.cloud/webhook-test/sales) to receive assistant responses and actions.
- Message Rendering: Render the 'output' field from the backend response as the assistant's message in a chat interface.
- Action Handling: Process the 'action' field from the backend to control UI behavior (BOOK_MEETING, COLLECT_LEAD, NURTURE).
- Meeting Booking: Display a 'Book a meeting' button and open the 'calendarLink' from the backend when clicked, based on the BOOK_MEETING action.
- Lead Collection: Enable the collection of lead information (name, email, company, etc.) from user responses, triggered by the COLLECT_LEAD action.
- Typing Indicator: Show a typing indicator while waiting for a response from the backend.
- Error display: Display generic message when the response array is empty or malformed

## Style Guidelines:

- Primary color: Deep blue (#3F51B5) for trust and professionalism, reflecting the serious nature of sales.
- Background color: Light gray (#F0F0F0) for a clean, uncluttered interface.
- Accent color: Teal (#009688) for call-to-action buttons and highlights, offering a modern and engaging feel.
- Body font: 'Inter', a grotesque-style sans-serif, with a modern, machined, objective, neutral look; suitable for body text
- Headline font: 'Space Grotesk', a proportional sans-serif with a computerized, techy, scientific feel; suitable for headlines.
- Use clear and professional icons for actions and status indicators.
- A clean, single-column layout optimized for readability and conversation flow.