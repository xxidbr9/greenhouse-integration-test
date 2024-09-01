import React from "react";
import ApplicationForm from "../components/application-form";
import { JobListItemType } from "@/features/job/types/job-list";
import { JobDetailType } from "@/features/job/types/job-detail";

type Props = {
  params: { id: string };
};

const ApplicationFormLayout = async (props: Props) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/jobs/${props.params.id}`,
  );
  const json = await resp.json();
  const data = (await json.data) as {
    job_post_detail: JobDetailType;
    job_detail: JobListItemType;
  };
  return <ApplicationForm data={data} id={props.params.id} />;
};

export default ApplicationFormLayout;
