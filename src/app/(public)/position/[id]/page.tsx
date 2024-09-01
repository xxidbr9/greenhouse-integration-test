import JobDetailLayout from "@/features/job/layouts/job-detail.layout";
import { JobDetailType } from "@/features/job/types/job-detail";
import { JobListItemType } from "@/features/job/types/job-list";
import React from "react";

type Props = {
  params: { id: string };
};

const Page = async (props: Props) => {
  const resp = await fetch(`http://localhost:3000/api/jobs/${props.params.id}`);
  const json = await resp.json();
  const data = (await json.data) as {
    job_post_detail: JobDetailType;
    job_detail: JobListItemType;
  };

  return <JobDetailLayout data={data} id={props.params.id} />;
};

export default Page;
