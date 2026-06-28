"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/lib/adminApi";

export default function AdminRoot() {
  const router = useRouter();
  useEffect(() => {
    router.replace(getAuthToken() ? "/admin/dashboard" : "/admin/login");
  }, [router]);
  return (
    <div className="flex min-h-dvh items-center justify-center bg-base">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-(--ui-border) border-t-gold" />
    </div>
  );
}
