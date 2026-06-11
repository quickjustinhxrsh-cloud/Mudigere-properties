import { PropertyForm } from "@/components/PropertyForm";

export default function AddPropertyPage() {
  return (
    <div className="grid gap-5">
      <div>
        <h2 className="text-2xl font-black">Add property</h2>
        <p className="mt-1 text-sm font-semibold text-slate-500">Save as a draft or publish directly to the public listings.</p>
      </div>
      <PropertyForm />
    </div>
  );
}
