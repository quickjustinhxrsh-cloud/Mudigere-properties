import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { PropertyTable } from "@/components/PropertyTable";

export default function AdminPropertiesPage() {
  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black">Property management</h2>
          <p className="mt-1 text-sm font-semibold text-slate-500">Create, edit, delete, draft, publish, and feature listings.</p>
        </div>
        <Link href="/admin/add-property" className="inline-flex items-center justify-center gap-2 rounded bg-forest px-4 py-3 text-sm font-black text-white transition hover:bg-leaf">
          <PlusCircle className="h-4 w-4" />
          Add property
        </Link>
      </div>
      <PropertyTable />
    </div>
  );
}
