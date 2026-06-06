import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";


export async function GET() {
  try {
    await dbConnect();
    const Event = (await import("@/models/Event")).default;

    const events = await Event.find({})
      .sort({ date: 1 })
      .lean();

    return NextResponse.json({ events }, { status: 200 });
  } catch (error: any) {
    console.warn("Events GET fallback (Mongo not available):", error?.message || error);

    // Dev fallback: return empty list instead of 500.
    return NextResponse.json({ events: [] }, { status: 200 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Prefer role guard (HOST) if present; otherwise allow for now.
  const role = (session.user as any)?.role;
  if (role && role !== "HOST") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { title, description, date, location, capacity, image } = body ?? {};

    if (!title || !date || !location || capacity === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();
    const Event = (await import("@/models/Event")).default;

    const hostId = (session.user as any)?.id;
    if (!hostId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const created = await Event.create({
      title,
      description,
      date: new Date(date),
      location,
      capacity: Number(capacity),
      image,
      hostId,
    });

    return NextResponse.json({ message: "Event created", event: created }, { status: 201 });
  } catch (error: any) {
    console.error("Events POST error:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
