"use server";

import dbConnect from "@/lib/mongodb";
import Event from "@/lib/Event";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath } from "next/cache";
type UserRole = { role?: string };
type SessionUser = { id?: string } & UserRole;

export async function createEvent(data: unknown) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as SessionUser | undefined)?.role;

  if (!session || role !== "HOST") {
    return { error: "Unauthorized" };
  }

  const hostId = (session.user as SessionUser).id;
  if (!hostId) {
    return { error: "Unauthorized" };
  }

  await dbConnect();
  try {
    await Event.create({
      ...(data as Record<string, unknown>),
      hostId,
    });
    revalidatePath("/dashboard");
    revalidatePath("/");
    return { success: true };
  } catch {
    return { error: "Failed to create event" };
  }
}

export async function deleteEvent(id: string) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as SessionUser | undefined)?.role;

  if (!session || role !== "HOST") {
    return { error: "Unauthorized" };
  }

  const hostId = (session.user as SessionUser).id;
  if (!hostId) {
    return { error: "Unauthorized" };
  }

  await dbConnect();
  const event = await Event.findById(id);

  if (!event || event.hostId.toString() !== hostId) {
    return { error: "Permission denied" };
  }

  try {
    await Event.findByIdAndDelete(id);
    revalidatePath("/dashboard");
    revalidatePath("/");
    return { success: true };
  } catch {
    return { error: "Failed to delete" };
  }
}
