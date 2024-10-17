"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import SignOut from "./signOut";
import { Suspense } from "react";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="flex w-full items-center justify-between rounded-xl border p-3">
      <div className="space-x-5">
        <Link
          className={
            pathname === "/dashboard" ? "rounded-lg bg-secondary p-2" : ""
          }
          href="/dashboard"
        >
          <span>Ana Sayfa</span>
        </Link>
        <Link
          className={
            pathname.startsWith("/dashboard/employees")
              ? "rounded-lg bg-secondary p-2"
              : ""
          }
          href="/dashboard/employees"
        >
          <span>Personeller</span>
        </Link>
        <Link
          className={
            pathname.startsWith("/dashboard/employers")
              ? "rounded-lg bg-secondary p-2"
              : ""
          }
          href="/dashboard/employers"
        >
          <span>Müşteriler</span>
        </Link>
      </div>

      <div className="flex gap-3">
        <ModeToggle />
        <Suspense>
          <SignOut />
        </Suspense>
      </div>
    </div>
  );
}
