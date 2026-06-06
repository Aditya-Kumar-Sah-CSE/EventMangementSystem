"use server";
import dbConnect from "@/lib/mongodb";
import Registration from "@/models/Registration";
import Event from "@/models/Event";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function registerForEvent(eventId: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await dbConnect();

  // Check capacity
  const event = await Event.findById(eventId);
  const count = await Registration.countDocuments({ eventId });
  
  if (count >= event.capacity) return { error: "Event is full" };

  try {
    await Registration.create({ eventId, userId: session.user.id });
    revalidatePath(`/events/${eventId}`);
    return { success: true };
  } catch (e) {
    return { error: "You are already registered" };
  }
}