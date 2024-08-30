import React from "react";
import { getDetailJobsPublic } from "../networks/get-detail-job.network";
import { Separator } from "@/components/ui/separator";

type Props = {
  params: { id: string };
};
const JobDetailLayout = async (props: Props) => {
  const { data } = await getDetailJobsPublic(props.params.id);
  return (
    <main className="">
      <span className="text-xl font-semibold truncate text-ellipsis w-full">
        {data.title}
      </span>
      <div className="flex h-5 items-center space-x-2 text-sm">
        <div>{data.location.name}</div>
        {/* {data.custom_fields.employment_type && (
          <>
            <Separator orientation="vertical" />
            <div>{data.custom_fields.employment_type}</div>
          </>
        )}
        {data.departments[0].name && (
          <>
            <Separator orientation="vertical" />
            <div>{data.departments[0].name}</div>
          </>
        )} */}

        <Separator orientation="vertical" />
        <div>Job ID: {data.id}</div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </main>
  );
};

export default JobDetailLayout;
