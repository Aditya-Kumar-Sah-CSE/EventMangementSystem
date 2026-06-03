import Link from "next/link";

export const metadata = {
  title: "Event Management System",
  description: "Create, manage, and attend amazing events",
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-muted">
        <div className="text-center space-y-8 max-w-2xl px-4">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Event Management System
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto">
              Create, manage, and attend amazing events
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/login" 
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-lg"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="px-8 py-4 border-2 border-border rounded-lg font-semibold hover:bg-muted transition-colors text-lg"
            >
              Sign Up
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="p-6 bg-card/50 rounded-xl backdrop-blur border border-border">
              <h3 className="font-semibold text-lg mb-2">Create Events</h3>
              <p className="text-sm text-muted-foreground">Easily create and manage your own events</p>
            </div>
            <div className="p-6 bg-card/50 rounded-xl backdrop-blur border border-border">
              <h3 className="font-semibold text-lg mb-2">Get Tickets</h3>
              <p className="text-sm text-muted-foreground">Register and get tickets for events</p>
            </div>
            <div className="p-6 bg-card/50 rounded-xl backdrop-blur border border-border">
              <h3 className="font-semibold text-lg mb-2">Analytics</h3>
              <p className="text-sm text-muted-foreground">Track attendance and revenue</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        2024 Event Management System
      </footer>
    </div>
  );
}