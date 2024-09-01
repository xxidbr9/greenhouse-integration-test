"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon, ChevronLeftIcon, PlusCircle, Trash, X } from "lucide-react";
import { JobDetailType } from "@/features/job/types/job-detail";
import { JobListItemType } from "@/features/job/types/job-list";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { DevTool } from "@hookform/devtools";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getAllDegreesPublic,
  getAllDisciplinesPublic,
  getAllSchoolsPublic,
} from "@/features/education/networks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Education } from "../../types/apply";
import { parseToApplicationCandidate } from "../../helpers/parse-to-apply-candidate";
import { UploadApiResponse } from "cloudinary";
import { NetworkType, ResponseType } from "@/@types/networks";
import { applyJobPublic } from "../../networks/apply-job.network";
import { attachCVPublic } from "../../networks/attach-cv.network";
import { useRouter } from "next/navigation";
import { EducationItemType } from "@/features/education/types/education";

export const formSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  company: z.string().optional(),
  title: z.string().optional(),
  phone_numbers: z.array(
    z.object({
      value: z.string().min(1, "Phone number is required"),
      type: z.string().optional(),
    }),
  ),
  addresses: z.array(
    z.object({
      value: z.string().min(1, "Address is required"),
      type: z.string().optional(),
    }),
  ),
  email_addresses: z.array(
    z.object({
      value: z.string().email("Invalid email").min(1, "Email is required"),
      type: z.string().optional(),
    }),
  ),
  website_addresses: z.array(
    z.object({
      value: z.string().url("Invalid URL"),
      type: z.string().optional(),
    }),
  ),
  social_media_addresses: z.array(
    z.object({
      value: z.string().min(1, "Social media link is required"),
    }),
  ),
  work_experiences: z.array(
    z.object({
      job_title: z.string().min(1, "Job title is required"),
      company: z.string().min(1, "Company is required"),
      description: z.string().optional(),
      start_date: z.string().min(1, "Start date is required"),
      end_date: z.string().optional(),
      current_job: z.boolean(),
    }),
  ),
  educations: z.array(
    z.object({
      degree: z.string().min(1, "Degree is required"),
      school: z.string().optional(),
      custom_school: z.string().optional(),
      start_date: z.string().min(1, "Start date is required"),
      end_date: z.string().min(1, "End date is required"),
    }),
  ),
  cv: z.instanceof(File, { message: "File is required" }),
});

type FormData = z.infer<typeof formSchema>;

type ApplicationFormProps = {
  id: string;
  data: {
    job_post_detail: JobDetailType;
    job_detail: JobListItemType;
  };
};
export default function ApplicationForm(props: ApplicationFormProps) {
  const { data } = props;
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone_numbers: [{ value: "", type: "" }],
      addresses: [{ value: "", type: "" }],
      email_addresses: [{ value: "", type: "" }],
      website_addresses: [
        // { value: "", type: "" }
      ],
      social_media_addresses: [
        // { value: "" }
      ],
      work_experiences: [
        // {
        //   job_title: "",
        //   company: "",
        //   description: "",
        //   start_date: "",
        //   end_date: "",
        //   current_job: false,
        // },
      ],
      educations: [
        // { degree: "", school: "", start_date: "", end_date: "" }
      ],
    },
  });

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({ control, name: "phone_numbers" });
  const {
    fields: addressFields,
    append: appendAddress,
    remove: removeAddress,
  } = useFieldArray({ control, name: "addresses" });
  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({ control, name: "email_addresses" });
  const {
    fields: websiteFields,
    append: appendWebsite,
    remove: removeWebsite,
  } = useFieldArray({ control, name: "website_addresses" });
  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({ control, name: "social_media_addresses" });
  const {
    fields: workFields,
    append: appendWork,
    remove: removeWork,
  } = useFieldArray({ control, name: "work_experiences" });
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({ control, name: "educations" });

  const { data: schoolData } = useQuery({
    queryKey: ["all_school"],
    queryFn: getAllSchoolsPublic,
  });
  const { data: degreeData } = useQuery({
    queryKey: ["all_degree"],
    queryFn: getAllDegreesPublic,
  });
  // const { data: disciplineData } = useQuery({ queryKey: ["all_discipline"], queryFn: getAllDisciplinesPublic })

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/file-upload", {
      method: "POST",
      body: formData,
    });
    return response.json() as NetworkType<UploadApiResponse>;
  };

  const onSubmit = async (data: FormData) => {
    const toastID = toast.loading("Please wait!", {
      description: "Step 1 of 3: Submitting your application",
    });

    const educations: Education[] = data.educations.map((edu) => ({
      degree_id: degreeData?.data.find(
        (education) => education.name === edu.degree,
      )?.id,
      school_id: schoolData?.data.find((school) => school.name === edu.school)
        ?.id,
      end_date: edu.end_date,
      start_date: edu.start_date,
    }));

    try {
      const submittedData = parseToApplicationCandidate({
        data: { ...data, new_educations: educations },
        job_id: props.id,
      });
      const reader = new FileReader();

      setTimeout(
        () =>
          toast.loading("Please wait!", {
            id: toastID,
            description: "Step 2 of 3: Uploading your CV",
          }),
        1000,
      );
      // const uploadResp = await handleUpload(data.cv)
      // const { url } = uploadResp.data;

      setTimeout(
        () =>
          toast.loading("Please wait!", {
            id: toastID,
            description: "Step 3 of 3: Creating your application",
          }),
        2000,
      );
      const applyResp = await applyJobPublic(submittedData);
      reader.onload = async function (e) {
        if (!e.target?.result) return;
        const result = e.target.result;
        const base64String = (result as string).split(",")[1];
        attachCVPublic({
          content_type: data.cv.type,
          filename: data.cv.name,
          id: applyResp.data.application_ids[0],
          type: "resume",
          content: base64String,
        })
          .then(() => {
            toast.success("Success 🎉", {
              id: toastID,
              description: "Redirecting...",
              onAutoClose: () => router.push("/apply/success"),
            });
          })
          .catch((e) => {
            toast.error("Error appear!", { id: toastID });
          });
      };

      reader.readAsDataURL(data.cv);
    } catch (e) {
      toast.error("Error appear!", { id: toastID });
    }
  };

  const renderDynamicList = (
    fields: any[],
    append: () => void,
    remove: (index: number) => void,
    name: string,
    label: string,
    type?: React.HTMLInputTypeAttribute,
    placeholder?: string,
  ) => (
    <div className="flex flex-col space-y-2 w-full">
      <Label className="w-1/3 text-left pt-2">{label}</Label>
      <div className="w-full space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex w-full items-center space-x-2">
            <Input
              {...register(`${name}.${index}.value` as any)}
              placeholder={placeholder || "Value"}
              type={type}
              className="flex-1"
            />
            {name === "phone_numbers" && (
              <Controller
                name={`${name}.${index}.type`}
                control={control}
                render={({ field: innerField }) => (
                  <Select
                    onValueChange={(value) => {
                      innerField.onChange(value);
                      setValue(`${name}.${index}.type`, value);
                    }}
                  >
                    <SelectTrigger className="w-1/3">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {["home", "work", "mobile", "skype", "other"].map(
                        (phoneType: string) => (
                          <SelectItem value={phoneType} key={phoneType}>
                            {phoneType.charAt(0).toUpperCase() +
                              phoneType.slice(1).toLowerCase()}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
            )}
            {name === "addresses" && (
              <Controller
                name={`${name}.${index}.type`}
                control={control}
                render={({ field: innerField }) => (
                  <Select
                    onValueChange={(value) => {
                      innerField.onChange(value);
                      setValue(`${name}.${index}.type`, value);
                    }}
                  >
                    <SelectTrigger className="w-1/3">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {["home", "work", "other"].map((phoneType: string) => (
                        <SelectItem value={phoneType} key={phoneType}>
                          {phoneType.charAt(0).toUpperCase() +
                            phoneType.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            )}

            {name === "email_addresses" && (
              <Controller
                name={`${name}.${index}.type`}
                control={control}
                render={({ field: innerField }) => (
                  <Select
                    onValueChange={(value) => {
                      innerField.onChange(value);
                      setValue(`${name}.${index}.type`, value);
                    }}
                  >
                    <SelectTrigger className="w-1/3">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {["personal", "work", "other"].map(
                        (phoneType: string) => (
                          <SelectItem value={phoneType} key={phoneType}>
                            {phoneType.charAt(0).toUpperCase() +
                              phoneType.slice(1).toLowerCase()}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
            )}
            {name === "website_addresses" && (
              <Controller
                name={`${name}.${index}.type`}
                control={control}
                render={({ field: innerField }) => (
                  <Select
                    onValueChange={(value) => {
                      innerField.onChange(value);
                      setValue(`${name}.${index}.type`, value);
                    }}
                  >
                    <SelectTrigger className="w-1/3">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "personal",
                        "company",
                        "portfolio",
                        "blog",
                        "other",
                      ].map((phoneType: string) => (
                        <SelectItem value={phoneType} key={phoneType}>
                          {phoneType.charAt(0).toUpperCase() +
                            phoneType.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            )}

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append()}
          className=""
        >
          <PlusCircle className="h-4 w-4 mr-2" /> Add {label}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="relative w-full flex flex-col pb-20">
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
            <Link href={`/position/${props.id}`}>
              <ChevronLeftIcon className="w-6 h-6" /> Back
            </Link>
          </Button>
          <h1 className="text-3xl font-semibold w-full">
            {data?.job_post_detail.title}
          </h1>
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
          <Separator />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 pt-6 w-full"
        >
          <div className="flex ">
            <span className="w-1/3 text-lg font-semibold">Resume</span>
            <div className="flex-1 flex items-start flex-col space-y-2">
              {/* <Label htmlFor="cv" className="text-left">
                Resume <span className="text-destructive">*</span>
              </Label> */}
              <div className="w-full">
                <Controller
                  name="cv"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Input
                      id="cv"
                      type="file"
                      multiple={false}
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        onChange(e.target.files?.[0] || null);
                      }}
                    />
                  )}
                />
                {errors.cv && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cv.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <Separator />

          <div className="flex ">
            <div className="w-1/3  flex flex-col gap-y-2">
              <span className="text-lg font-semibold">Basic Information</span>
              <p className="text-sm text-foreground">
                Please add basic information.
              </p>
            </div>
            {/* RESUME */}
            <div className="flex-1 flex flex-col space-y-6">
              {/* BASIC INFO */}

              <div className="flex flex-col space-y-2">
                <Label htmlFor="first_name" className="">
                  First Name <span className="text-destructive">*</span>
                </Label>
                <div className="w-full">
                  <Input id="first_name" {...register("first_name")} />
                  {errors.first_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <Label htmlFor="last_name" className="">
                  Last Name <span className="text-destructive">*</span>
                </Label>
                <div className="w-full">
                  <Input id="last_name" {...register("last_name")} />
                  {errors.last_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.last_name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <Label htmlFor="company" className="">
                  Company
                </Label>
                <div className="w-full">
                  <Input id="company" {...register("company")} />
                  {errors.company && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.company.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <Label htmlFor="title" className="">
                  Title
                </Label>
                <div className="w-full">
                  <Input id="title" {...register("title")} />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Separator />

          {/* END BASIC INFO */}

          <div className="flex">
            <span className="w-1/3 text-lg font-semibold">
              Additional Information
            </span>
            <div className="flex-1 flex flex-col space-y-4">
              {renderDynamicList(
                phoneFields,
                () => appendPhone({ value: "", type: "" }),
                removePhone,
                "phone_numbers",
                "Phone Numbers",
              )}
              {renderDynamicList(
                addressFields,
                () => appendAddress({ value: "", type: "" }),
                removeAddress,
                "addresses",
                "Addresses",
              )}
              {renderDynamicList(
                emailFields,
                () => appendEmail({ value: "", type: "" }),
                removeEmail,
                "email_addresses",
                "Email Addresses",
                "email",
              )}
              {renderDynamicList(
                websiteFields,
                () => appendWebsite({ value: "", type: "" }),
                removeWebsite,
                "website_addresses",
                "Website Addresses",
                "url",
                "URL",
              )}
              {renderDynamicList(
                socialFields,
                () => appendSocial({ value: "" }),
                removeSocial,
                "social_media_addresses",
                "Social Media",
                "text",
                "Username or URL",
              )}
            </div>
          </div>
          <Separator />

          {/*STAR WORK EXPERIENCE */}
          <div className="flex">
            <span className="w-1/3 text-lg font-semibold">Work Experience</span>
            <div className="flex-1 flex flex-col items-start space-y-2">
              <div className="w-full space-y-4">
                {workFields.map((field, index) => (
                  <React.Fragment key={field.id}>
                    <div key={field.id} className=" rounded-md space-y-4">
                      <div className="flex flex-col space-y-2">
                        <Label className="text-left pt-2">Job Title</Label>
                        <Input
                          {...register(`work_experiences.${index}.job_title`)}
                          placeholder="Job Title"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Label className="text-left pt-2">Company Name</Label>
                        <Input
                          {...register(`work_experiences.${index}.company`)}
                          placeholder="Company"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Label className="text-left pt-2">Description</Label>
                        <Textarea
                          {...register(`work_experiences.${index}.description`)}
                          placeholder="Description"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="space-y-1">
                          <Label className="text-left pt-2">
                            Start & end date
                          </Label>
                        </div>
                        <div className="flex space-x-2">
                          <Input
                            {...register(
                              `work_experiences.${index}.start_date`,
                            )}
                            type="date"
                          />
                          <Input
                            {...register(`work_experiences.${index}.end_date`)}
                            type="date"
                            disabled={field.current_job}
                          />
                        </div>
                      </div>
                      {/* <div className="flex items-center space-x-2">
                        <Checkbox
                          {...register(`work_experiences.${index}.current_job`)}
                          id={`current_job_${index}`}
                        />
                        <Label htmlFor={`current_job_${index}`}>
                          I currently work here
                        </Label>
                      </div> */}
                      <div className="w-full flex justify-end">
                        <Button
                          type="button"
                          variant="ghost"
                          className="hover:bg-red-100 hover:bg-opacity-10 hover:text-destructive"
                          onClick={() => removeWork(index)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {index < workFields.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    appendWork({
                      job_title: "",
                      company: "",
                      description: "",
                      start_date: "",
                      end_date: "",
                      current_job: false,
                    })
                  }
                >
                  Add Work Experience
                </Button>
              </div>
            </div>
          </div>
          <Separator />

          {/*END WORK EXPERIENCE */}

          <div className="flex">
            <div className="w-1/3  flex flex-col gap-y-2">
              <span className="text-lg font-semibold">Education</span>
              <p className="text-sm text-foreground">
                Please add education experience. If you are currently enrolled
                in school, please fill in your expected graduation date.
              </p>
            </div>
            <div className="flex-1 flex items-start space-x-4 w-full">
              <div className="w-full space-y-4">
                {educationFields.map((field, index) => (
                  <div key={field.id} className="rounded-md space-y-4">
                    <div className="flex flex-col space-y-2">
                      <Label className="text-left pt-2">Degree</Label>
                      <Controller
                        name={`educations.${index}.degree`}
                        control={control}
                        render={({ field: innerField }) => (
                          <Select
                            onValueChange={(value) => {
                              innerField.onChange(value);
                              setValue(`educations.${index}.degree`, value);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Degree" />
                            </SelectTrigger>
                            <SelectContent>
                              {degreeData?.data.map((degree) => (
                                <SelectItem
                                  value={degree.id.toString()}
                                  key={degree.id}
                                >
                                  {degree.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-col space-y-1">
                        <Label className="text-left pt-2">School name</Label>
                        <span className="text-xs text-gray-500">
                          Select other if your school are not listed.
                        </span>
                      </div>
                      <Controller
                        name={`educations.${index}.school`}
                        control={control}
                        render={() => (
                          <EducationSchool
                            index={index}
                            schoolData={schoolData}
                            setValue={setValue}
                            watch={watch}
                          />
                        )}
                      />
                    </div>
                    {watch(`educations.${index}.school`) === "other" && (
                      <Input
                        {...register(`educations.${index}.custom_school`)}
                        placeholder="Enter School Name"
                      />
                    )}
                    <div className="flex flex-col space-y-2">
                      <div className="space-y-1">
                        <Label className="text-left pt-2">
                          Start & end date
                        </Label>
                        <p className="text-sm">
                          If there is no accurate graduation date available, you
                          can enter an estimated graduation date
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Input
                          {...register(`educations.${index}.start_date`)}
                          type="date"
                        />
                        <Input
                          {...register(`educations.${index}.end_date`)}
                          type="date"
                        />
                      </div>
                    </div>
                    <div className="w-full flex justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        className="hover:bg-red-100 hover:bg-opacity-10 hover:text-destructive"
                        onClick={() => removeEducation(index)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                    {index < workFields.length - 1 && <Separator />}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    appendEducation({
                      degree: "",
                      school: "",
                      start_date: "",
                      end_date: "",
                    })
                  }
                >
                  Add Education
                </Button>
              </div>
            </div>
          </div>

          <div className="flex w-full fixed z-10 bottom-0 bg-white py-6 border-2 left-0 shadow-lg bg-opacity-20 drop-shadow-lg backdrop-blur-lg">
            <div className="container mx-auto flex justify-end items-center space-x-4">
              <div className="flex items-center gap-x-2">
                <Checkbox />
                <Label>
                  I have read and agreed to the{" "}
                  <span className="text-red-500">Privacy Policy</span>
                </Label>
              </div>
              <Button type="submit">Submit Application</Button>
            </div>
          </div>
        </form>
        <DevTool control={control} />
      </main>
    </div>
  );
}

const EducationSchool = (props: {
  index: number;
  watch: any;
  schoolData: ResponseType<EducationItemType[]> | undefined;
  setValue: any;
}) => {
  const { index, schoolData, setValue, watch } = props;
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {watch(`educations.${index}.school`)
              ? schoolData?.data.find(
                  (school) =>
                    school.name.toString() ===
                    watch(`educations.${index}.school`),
                )?.name || "Other (Custom)"
              : "Select school..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50 -mr-1" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 left-0" align="start">
          <Command className="w-full">
            <CommandInput placeholder="Search school..." className="h-9" />
            <CommandList>
              <CommandEmpty>No School found.</CommandEmpty>
              <CommandGroup>
                {schoolData?.data.map((school) => (
                  <CommandItem
                    key={school.id}
                    value={school.name}
                    onSelect={(currentValue) => {
                      setValue(`educations.${index}.school`, currentValue);
                      setOpen(false);
                    }}
                  >
                    {school.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        watch(`educations.${index}.school`) ===
                          school.id.toString()
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
                <CommandItem
                  value={"other"}
                  onSelect={(currentValue) => {
                    setValue(`educations.${index}.school`, currentValue);
                    setOpen(false);
                  }}
                >
                  Other (Custom)
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      watch(`educations.${index}.school`) === "custom"
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </React.Fragment>
  );
};
