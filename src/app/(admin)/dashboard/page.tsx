import { CandidateType } from "@/features/candidate/types/candidate";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Toaster } from "sonner";

async function getData({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}): Promise<CandidateType[]> {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/candidates?page=`,
  );
  const json = await resp.json();
  return (await json.data) as CandidateType[];
}

export default async function DemoPage() {
  const data = await getData({ page: 1, perPage: 10 });

  return (
    <div className="container mx-auto py-10" suppressHydrationWarning>
      <DataTable columns={columns} data={data} />
      <Toaster />
    </div>
  );
}
