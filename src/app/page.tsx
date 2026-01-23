import ChatLayout from '@/components/chat/chat-layout';

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl flex-1 flex flex-col rounded-xl bg-card shadow-2xl">
        <header className="rounded-t-xl border-b bg-card p-4">
          <h1 className="font-headline text-center text-3xl font-bold text-primary">
            LeadFlow AI
          </h1>
          <p className="mt-1 text-center font-body text-sm text-muted-foreground">
            Your Sales & Lead Qualification Assistant
          </p>
        </header>
        <ChatLayout />
      </div>
    </main>
  );
}
