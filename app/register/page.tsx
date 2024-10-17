"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/lib/actions";

export default function Register() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await registerUser({ username, email, password });

    if (result?.error) {
      setError(result.error);
    } else {
      ref.current?.reset();
      router.push("/login");
    }
  };

  return (
    <section className="flex h-screen w-full items-center justify-center">
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className="flex w-full max-w-[400px] flex-col items-center justify-between gap-2 rounded border border-solid border-black bg-white p-6"
      >
        {error && <div className="text-red-500">{error}</div>}
        <h1 className="mb-5 w-full text-2xl font-bold">Register</h1>

        <label className="w-full text-sm">Kullanıcı Adı</label>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          className="h-8 w-full rounded border border-solid border-black px-2.5 py-1 text-[13px]"
          name="username"
          required
        />

        <label className="w-full text-sm">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="h-8 w-full rounded border border-solid border-black px-2.5 py-1"
          name="email"
          required
        />

        <label className="w-full text-sm">Password</label>
        <div className="flex w-full">
          <input
            type="password"
            placeholder="Password"
            className="h-8 w-full rounded border border-solid border-black px-2.5 py-1"
            name="password"
            required
          />
        </div>

        <button
          type="submit"
          className="ease mt-2.5 w-full rounded border border-solid border-black py-1.5 transition duration-150 hover:bg-black hover:text-white"
        >
          Sign up
        </button>

        <Link
          href="/login"
          className="ease text-sm text-[#888] transition duration-150 hover:text-black"
        >
          Already have an account?
        </Link>
      </form>
    </section>
  );
}
