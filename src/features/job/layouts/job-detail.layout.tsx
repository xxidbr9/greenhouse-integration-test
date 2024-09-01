import React from "react";
import { getDetailJobsPublic } from "../networks/get-detail-job.network";
import { Separator } from "@/components/ui/separator";
import { JobDetailType } from "../types/job-detail";
import { JobListItemType } from "../types/job-list";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

type Props = {
  id: string;
  data: {
    job_post_detail: JobDetailType;
    job_detail: JobListItemType;
  };
};
const JobDetailLayout = async (props: Props) => {
  const { data } = props;
  return (
    <div className="relative w-full flex flex-col">
      <Image
        className="absolute top-0 z-0 -translate-y-1/2 select-none"
        src={"/bg-back.png"}
        width={1000}
        height={1000}
        alt="back bg"
      />
      <main className="relative container mx-auto py-20 ">
        <div className=" z-10 flex flex-col gap-y-2">
          <Button className="self-start px-0 -ml-2" variant={"link"} asChild>
            <Link href={"/position"}>
              <ChevronLeftIcon className="w-6 h-6" /> Back
            </Link>
          </Button>
          <span className="text-3xl font-semibold w-full">
            {data?.job_post_detail.title}
          </span>
          <div className="flex h-5 items-center space-x-2 text-sm">
            <div>{data?.job_post_detail.location.name}</div>
            {data.job_detail.custom_fields.employment_type && (
              <>
                <Separator orientation="vertical" />
                <div>{data.job_detail.custom_fields.employment_type}</div>
              </>
            )}
            {data.job_detail.departments[0].name && (
              <>
                <Separator orientation="vertical" />
                <div>{data.job_detail.departments[0].name}</div>
              </>
            )}

            <Separator orientation="vertical" />
            <div>Job ID: {props.id}</div>
          </div>
        </div>
        <div className="py-8 prose-sm">
          <span className="text-lg font-semibold">Descriptions</span>
          <article
            dangerouslySetInnerHTML={{
              __html: data?.job_post_detail.content || {},
            }}
            className=""
          />
        </div>

        <div className="flex items-center gap-x-4">
          <Button className="self-start" asChild>
            <Link href={`/apply/${props.id}`}>Apply Job</Link>
          </Button>

          {/* <div className="flex flex-row gap-x-2">
            <span>Share to:</span>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default JobDetailLayout;
