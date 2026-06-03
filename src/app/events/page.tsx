import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Events - Event Management System",
  description: "Browse upcoming events",
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Events</h1>
          <Button asChild>
            <Link href="/events/create">Create Event</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">No Events Yet</h2>
          <p className="text-muted-foreground mb-6">Be the first to create an event!</p>
          <Button asChild>
            <Link href="/events/create">Create Your First Event</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}