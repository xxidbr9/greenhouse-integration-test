import { CandidateType } from "@/features/candidate/types/candidate";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Toaster } from "sonner";

export default async function DashboardPage() {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/candidates?page=`,
  );
  const json = await resp.json();
  const data = (await json.data) as CandidateType[];

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      <Toaster />
    </div>
  );
}
