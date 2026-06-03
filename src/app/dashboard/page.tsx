import Link from "next/link";
import { Search } from "@/components/Search";
import { StatsCard } from "@/components/StatsCard";
import { ChartPlaceholder } from "@/components/ChartPlaceholder";

export default function DashboardPage() {
  // Placeholder data – replace with real data fetching logic later
  const stats = [
    { title: "Tickets Booked", value: 12 },
    { title: "Upcoming Events", value: 3 },
    { title: "Total Revenue", value: "$1,240" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Event Management Dashboard</h1>
          {/* Search bar */}
          <Search placeholder="Search events..." />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats cards */}
        <section className="grid md:grid-cols-3 gap-6">
          {stats.map((s) => (
            <StatsCard key={s.title} title={s.title} value={s.value} />
          ))}
        </section>

        {/* Action cards */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
            <h3 className="font-semibold text-lg">Browse Events</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Discover upcoming events
            </p>
            <Link href="/events" className="mt-4 inline-block text-primary hover:underline">
              View Events
            </Link>
          </div>

          <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
            <h3 className="font-semibold text-lg">Create Event</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Host your own event
            </p>
            <Link href="/events/create" className="mt-4 inline-block text-primary hover:underline">
              Create New Event
            </Link>
          </div>

          <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
            <h3 className="font-semibold text-lg">My Tickets</h3>
            <p className="text-sm text-muted-foreground mt-2">
              View your registered events
            </p>
            <Link href="/tickets" className="mt-4 inline-block text-primary hover:underline">
              View Tickets
            </Link>
          </div>
        </section>

        {/* Chart placeholder */}
        <section className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Ticket Sales Overview</h3>
          <ChartPlaceholder />
        </section>
      </main>
    </div>
  );
}