import { Parser } from "json2csv";
import { dbConnect } from "@/lib/db";
import Registration from "@/lib/registration";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

type SessionUser = {
  id?: string;
  role?: string;
  name?: string | null;
};

type UserProjection = {
  name?: string | null;
  email?: string | null;
};

type Attendee = {
  userId: UserProjection;
  registeredAt: Date;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");
  const session = await getServerSession(authOptions);

  const role = (session?.user as SessionUser | undefined)?.role;
  if (!session || role !== "HOST") {
    return new Response("Unauthorized", { status: 401 });
  }

  await dbConnect();
  const attendees = (await Registration.find({ eventId }).populate("userId", "name email")) as unknown as Attendee[];

  const data = attendees.map((a) => ({
    name: a.userId.name ?? "",
    email: a.userId.email ?? "",
    date: a.registeredAt.toISOString(),
  }));

  const parser = new Parser();
  const csv = parser.parse(data);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename=attendees.csv`,
    },
  });
}
