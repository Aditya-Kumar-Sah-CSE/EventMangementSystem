import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/lib/validations/auth";
import { mockUserStore } from "@/lib/mockUserStore";

// Use mock store for development
const USE_MOCK_DB = true;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = registerSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: "Invalid input data", details: validated.error.errors }, { status: 400 });
    }

    const { name, email, password, role } = validated.data;

    if (USE_MOCK_DB) {
      // Check if user exists in mock store
      const existingUser = await mockUserStore.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ error: "User already exists with this email" }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await mockUserStore.create({
        name,
        email,
        password: hashedPassword,
        role
      });

      return NextResponse.json({ message: "User created successfully", userId: newUser._id }, { status: 201 });
    }

    // MongoDB path (if USE_MOCK_DB is false)
    const dbConnect = (await import("@/lib/mongodb")).default;
    const User = (await import("@/models/User")).default;
    
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    return NextResponse.json({ message: "User created successfully", userId: newUser._id }, { status: 201 });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}