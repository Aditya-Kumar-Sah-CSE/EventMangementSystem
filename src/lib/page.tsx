import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import dbConnect from "@/lib/mongodb";
import Event from "@/lib/Event";
import Registration from "@/lib/registration";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const user = session.user as { id: string; role: string; name?: string };

  await dbConnect();

  let content;
  if (user.role === "HOST") {
    const events = await Event.find({ hostId: user.id });
    content = (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Hosted Events</h2>
          <Link href="/events/create" className="bg-primary text-white px-4 py-2 rounded">Create Event</Link>
        </div>
        <div className="grid gap-4">
          {events.map((event: { _id: string; title: string; date: string | Date }) => (
            <div key={event._id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <p className="font-bold">{event.title}</p>
                <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString()}</p>
              </div>
              <Link href={`/api/route?eventId=${event._id}`} className="text-blue-500 underline text-sm">Export Attendees</Link>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    const registrations = await Registration.find({ userId: user.id }).populate("eventId");
    content = (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Registrations</h2>
        <div className="grid gap-4">
          {registrations.map((reg: { _id: string; eventId: { title: string; date: string | Date } }) => (
            <div key={reg._id} className="border p-4 rounded">
              <p className="font-bold">{reg.eventId.title}</p>
              <p className="text-sm text-muted-foreground">{new Date(reg.eventId.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Welcome back, {session.user.name}!</h1>
      {content}
    </div>
  );
}