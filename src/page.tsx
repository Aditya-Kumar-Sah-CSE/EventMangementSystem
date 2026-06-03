import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome back, {session?.user?.name || "Attendee"}!</h1>
      <p className="mt-2 text-muted-foreground font-medium">Here are your upcoming events.</p>
    </div>
  );
}