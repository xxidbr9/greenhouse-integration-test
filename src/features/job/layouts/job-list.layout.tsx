"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllOfficesPublic } from "@/features/office/networks";
import { getAllDepartmentsPublic } from "@/features/departement/networks";
import { getAllJobsPublic } from "../networks/get-all-jobs.network";
import { JobListItemType } from "../types/job-list";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
type Props = {};

export const JobListLayout = (props: Props) => {
  return (
    <main>
      <div
        className="relative z-50 xl:h-[340px] h-[240px] w-full object-center bg-center  xl:bg-left-top bg-cover"
        style={{ backgroundImage: 'url("/tt_banner.jpeg")' }}
      >
        <div className="max-w-screen-xl mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8 px-2 flex justify-center items-center h-full">
          <div className=" flex flex-col gap-y-2">
            <BreadCrumbBack />
            <h1 className="text-4xl md:text-5xl tracking-tight lg:text-5xl text-white h-14 font-bold text-center">
              Create together, grow together
            </h1>
          </div>
        </div>
        <Suspense>
          <Form />
        </Suspense>
      </div>
      <ListJobs />
    </main>
  );
};

const BreadCrumbBack = () => {
  return (
    <Breadcrumb className="text-white xl:block hidden">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="text-white font-semibold">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-white" />
        <BreadcrumbItem>
          <BreadcrumbLink className="text-white hover:text-white">
            Open Positions
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const Form = () => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("q") || "";

  return (
    <form
      className="mx-auto bottom-0 md:px-8 flex items-center justify-center -mt-7 px-4"
      action={""}
      method="GET"
    >
      <div className="relative xl:w-auto w-full">
        <SearchIcon className="h-6 w-6 absolute xl:left-4 left-2 xl:top-4 top-3 text-gray-400" />
        <Input
          className="xl:pl-12 pl-10 bg-white w-auto rounded-r-none xl:h-14 h-12 shadow-2xl xl:w-[560px] w-full"
          name="q"
          defaultValue={searchValue}
          placeholder="Search your dream jobs"
        />
      </div>
      <Button className="rounded-l-none flex items-center gap-x-2 xl:h-14 h-12 shadow-2xl">
        Search{" "}
      </Button>
    </form>
  );
};

const ListJobs = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const handleReset = () => {
    const keys = [...params.keys()];
    keys.forEach((key) => params.delete(key));
    router.replace(pathname + params.toString());
  };

  return (
    <div className="relative w-full flex flex-col xl:pt-6 pt-4 max-w-screen-xl mx-auto md:px-8 px-2">
      <div className="flex">
        <div className="flex flex-col gap-y-4 w-72 mt-14">
          <div className="flex justify-between items-center w-full border-b pl-4 px-8 pb-2">
            <span className="font-semibold">Filter</span>
            <button className="text-gray-300 text-sm" onClick={handleReset}>
              Clear
            </button>
          </div>
          <DepartmentList />
          <OfficeList />
        </div>
        <JobsList />
      </div>
    </div>
  );
};

const OfficeList = () => {
  const key = "office_id";
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryFn: getAllOfficesPublic,
    queryKey: ["all_office"],
  });
  if (data?.data && data?.data.length <= 0) return;

  const defaultValue = searchParams.get(key) || "";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams],
  );

  const handleValueChange = (val: string) => {
    const params = createQueryString(key, val === defaultValue ? "" : val);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-y-4 pl-4 px-8 pb-4">
      <span className="font-semibold">Location</span>
      {isLoading &&
        Array.from({ length: 3 }).map((_, idx) => (
          <Skeleton key={idx} className="h-4 w-full" />
        ))}
      <RadioGroup
        defaultValue={defaultValue}
        className="space-y-1"
        onValueChange={handleValueChange}
      >
        {data?.data.map((office) => (
          <div className="flex items-center space-x-3" key={office.id}>
            <RadioGroupItem
              checked={defaultValue == office.id}
              onClick={() =>
                handleValueChange(defaultValue == office.id ? "" : office.id)
              }
              value={office.id}
              id={office.id}
            />
            <Label htmlFor={office.id}>{office.name}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

const DepartmentList = () => {
  const key = "department_id";
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryFn: getAllDepartmentsPublic,
    queryKey: ["all_department"],
  });
  if (data?.data && data?.data.length <= 0) return;

  const defaultValue = searchParams.get(key) || "";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams],
  );

  const handleValueChange = (val: string) => {
    const params = createQueryString(key, val === defaultValue ? "" : val);
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex flex-col gap-y-4 border-b pl-4 px-8 pb-4">
      <span className="font-semibold">Department</span>
      {isLoading &&
        Array.from({ length: 3 }).map((_, idx) => (
          <Skeleton key={idx} className="h-4 w-full" />
        ))}
      <RadioGroup defaultValue={defaultValue} className="space-y-1">
        {data?.data.map((department) => (
          <div className="flex items-center space-x-3" key={department.id}>
            <RadioGroupItem
              checked={defaultValue == department.id}
              onClick={() =>
                handleValueChange(
                  defaultValue == department.id ? "" : department.id,
                )
              }
              value={department.id}
              id={department.id}
            />
            <Label htmlFor={department.id}>{department.name}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

const JobsList = () => {
  const searchParams = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const query = Object.fromEntries(params);
  const { data, isLoading } = useQuery({
    queryFn: () => getAllJobsPublic(query),
    queryKey: ["all_jobs", params.toString()],
  });
  return (
    <div className="flex flex-col gap-y-4 my-10 flex-1 border-l-[1px] px-8">
      <h2 className="text-4xl font-semibold">
        All open jobs ({data?.data.length || 0}){" "}
      </h2>
      {isLoading &&
        Array.from({ length: 3 }).map((_, idx) => (
          <Skeleton key={idx} className="h-[102px] w-full" />
        ))}
      {data?.data.map((job) => <JobItem data={job} key={job.id} />)}
      {!!data && data?.data.length <= 0 && <div>Empty</div>}
    </div>
  );
};

type JobItemProps = {
  data: JobListItemType;
};
const JobItem = (props: JobItemProps) => {
  const { data } = props;
  return (
    <Link href={`/position/${data.id}`}>
      <Card className="px-4 pt-4 pb-5 w-full hover:shadow-xl transition-all duration-200 ease-out flex flex-col gap-y-2">
        <span className="text-xl font-semibold truncate text-ellipsis w-full">
          {data.name}
        </span>
        <div className="flex h-5 items-center space-x-2 text-sm">
          <div>{data.offices[0].name}</div>
          {data.custom_fields.employment_type && (
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
          )}

          <Separator orientation="vertical" />
          <div>Job ID: {data.id}</div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: data.notes }} />
      </Card>
    </Link>
  );
};
