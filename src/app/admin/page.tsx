import type { Metadata } from "next";
import { AdminRequests } from "./AdminRequests";

export const metadata: Metadata = { title: "Requests", robots: { index: false, follow: false } };

export default function AdminPage() {
  return <AdminRequests />;
}
