import { NetworkType } from "@/@types/networks";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import JobDetailLayout from "@/features/job/layouts/job-detail.layout";
import { getDetailJobsPublic } from "@/features/job/networks/get-detail-job.network";
import { JobDetailType } from "@/features/job/types/job-detail";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  params: { id: string };
};

const Page = async (props: Props) => {
  const resp = await fetch(`http://localhost:3000/api/jobs/${props.params.id}`);
  const json = await resp.json();
  const data = (await json.data) as JobDetailType;

  return (
    <div className="relative w-full flex flex-col">
      <Image
        className="absolute top-0 z-0 -translate-y-1/2 select-none"
        src={"/bg-back.png"}
        width={1000}
        height={1000}
        alt="back bg"
      />
      <main className="relative w-screen-md mx-auto py-20 ">
        <div className=" z-10 flex flex-col gap-y-2">
          <Button className="self-start px-0 -ml-2" variant={"link"} asChild>
            <Link href={"/position"}>
              <ChevronLeftIcon className="w-6 h-6" /> Back
            </Link>
          </Button>
          <span className="text-3xl font-semibold truncate text-ellipsis w-full">
            {data?.title}
          </span>
          <div className="flex h-5 items-center space-x-2 text-sm">
            <div>{data?.location.name}</div>
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
            <div>Job ID: {data?.id}</div>
          </div>
        </div>
        <div className="py-8">
          <span className="text-lg font-semibold">Descriptions</span>
          <article
            dangerouslySetInnerHTML={{ __html: data?.content || {} }}
            className="prose lg:prose-md "
          />
        </div>

        <div className="flex items-center gap-x-4">
          <Button className="self-start" asChild>
            <Link href={`/apply/${props.params.id}`}>Apply Job</Link>
          </Button>

          {/* <div className="flex flex-row gap-x-2">
            <span>Share to:</span>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default Page;
