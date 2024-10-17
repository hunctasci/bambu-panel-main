"use client";

import { signOutAction } from "@/lib/actions";

export default function SignOut() {
  return (
    <form action={signOutAction}>
      <button className="flex grow items-center justify-center gap-2 rounded-md bg-red-600 text-sm font-medium text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground md:flex-none md:justify-start md:p-2 md:px-3">
        <div>Çıkış Yap</div>
      </button>
    </form>
  );
}
