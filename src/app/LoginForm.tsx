"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) setError("Invalid credentials");
    else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <input name="email" type="email" placeholder="Email" required className="border p-2 rounded" />
      <input name="password" type="password" placeholder="Password" required className="border p-2 rounded" />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" className="bg-primary text-white p-2 rounded font-bold">Login</button>
    </form>
  );
}