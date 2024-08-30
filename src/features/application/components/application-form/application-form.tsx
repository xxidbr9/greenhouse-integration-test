"use client";

import { useState } from "react";
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
import { PlusCircle, X } from "lucide-react";
import { format } from "date-fns";

const schema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  company: z.string().min(1, "Company is required"),
  title: z.string().min(1, "Title is required"),
  phone_numbers: z.array(
    z.object({
      value: z.string().min(1, "Phone number is required"),
      type: z.string().min(1, "Phone type is required"),
    }),
  ),
  addresses: z.array(
    z.object({
      value: z.string().min(1, "Address is required"),
      type: z.string().min(1, "Address type is required"),
    }),
  ),
  email_addresses: z.array(
    z.object({
      value: z.string().email("Invalid email").min(1, "Email is required"),
      type: z.string().min(1, "Email type is required"),
    }),
  ),
  website_addresses: z.array(
    z.object({
      value: z.string().url("Invalid URL").min(1, "Website is required"),
      type: z.string().min(1, "Website type is required"),
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
      description: z.string().min(1, "Description is required"),
      start_date: z.string().min(1, "Start date is required"),
      end_date: z.string().optional(),
      current_job: z.boolean(),
    }),
  ),
  educations: z.array(
    z.object({
      degree: z.string().min(1, "Degree is required"),
      school: z.string().min(1, "School is required"),
      start_date: z.string().min(1, "Start date is required"),
      end_date: z.string().min(1, "End date is required"),
    }),
  ),
  cv: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof schema>;

export default function ApplicationForm() {
  const [customSchool, setCustomSchool] = useState<string>("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone_numbers: [{ value: "", type: "" }],
      addresses: [{ value: "", type: "" }],
      email_addresses: [{ value: "", type: "" }],
      website_addresses: [{ value: "", type: "" }],
      social_media_addresses: [{ value: "" }],
      work_experiences: [
        {
          job_title: "",
          company: "",
          description: "",
          start_date: "",
          end_date: "",
          current_job: false,
        },
      ],
      educations: [{ degree: "", school: "", start_date: "", end_date: "" }],
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

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

  const renderDynamicList = (
    fields: any[],
    append: () => void,
    remove: (index: number) => void,
    name: string,
    label: string,
  ) => (
    <div className="flex items-start space-x-4">
      <Label className="w-1/3 text-right pt-2">{label}</Label>
      <div className="w-2/3 space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center space-x-2">
            <Input
              {...register(`${name}.${index}.value` as any)}
              placeholder="Value"
              className="flex-grow"
            />
            {name !== "social_media_addresses" && (
              <Input
                {...register(`${name}.${index}.type` as any)}
                placeholder="Type"
                className="w-1/3"
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
          className="mt-2"
        >
          <PlusCircle className="h-4 w-4 mr-2" /> Add {label}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Backend Engineer Intern - 2024 Start - Indonesia
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center space-x-4">
          <Label htmlFor="first_name" className="w-1/3 text-right">
            First Name
          </Label>
          <div className="w-2/3">
            <Input id="first_name" {...register("first_name")} />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.first_name.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Label htmlFor="last_name" className="w-1/3 text-right">
            Last Name
          </Label>
          <div className="w-2/3">
            <Input id="last_name" {...register("last_name")} />
            {errors.last_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.last_name.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Label htmlFor="company" className="w-1/3 text-right">
            Company
          </Label>
          <div className="w-2/3">
            <Input id="company" {...register("company")} />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">
                {errors.company.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Label htmlFor="title" className="w-1/3 text-right">
            Title
          </Label>
          <div className="w-2/3">
            <Input id="title" {...register("title")} />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
        </div>

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
        )}
        {renderDynamicList(
          websiteFields,
          () => appendWebsite({ value: "", type: "" }),
          removeWebsite,
          "website_addresses",
          "Website Addresses",
        )}
        {renderDynamicList(
          socialFields,
          () => appendSocial({ value: "" }),
          removeSocial,
          "social_media_addresses",
          "Social Media",
        )}

        <div className="flex items-start space-x-4">
          <Label className="w-1/3 text-right pt-2">Work Experience</Label>
          <div className="w-2/3 space-y-4">
            {workFields.map((field, index) => (
              <div key={field.id} className="border p-4 rounded-md space-y-2">
                <Input
                  {...register(`work_experiences.${index}.job_title`)}
                  placeholder="Job Title"
                />
                <Input
                  {...register(`work_experiences.${index}.company`)}
                  placeholder="Company"
                />
                <Textarea
                  {...register(`work_experiences.${index}.description`)}
                  placeholder="Description"
                />
                <div className="flex space-x-2">
                  <Input
                    {...register(`work_experiences.${index}.start_date`)}
                    type="date"
                  />
                  <Input
                    {...register(`work_experiences.${index}.end_date`)}
                    type="date"
                    disabled={field.current_job}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register(`work_experiences.${index}.current_job`)}
                    id={`current_job_${index}`}
                  />
                  <Label htmlFor={`current_job_${index}`}>
                    I currently work here
                  </Label>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeWork(index)}
                >
                  Remove
                </Button>
              </div>
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

        <div className="flex items-start space-x-4">
          <Label className="w-1/3 text-right pt-2">Education</Label>
          <div className="w-2/3 space-y-4">
            {educationFields.map((field, index) => (
              <div key={field.id} className="border p-4 rounded-md space-y-2">
                <Select
                  onValueChange={(value) =>
                    register(`educations.${index}.degree`).onChange({
                      target: { value },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Degree" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bachelor">Bachelor's</SelectItem>
                    <SelectItem value="master">Master's</SelectItem>
                    <SelectItem value="phd">Ph.D.</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(value) => {
                    if (value === "custom") {
                      setCustomSchool("");
                    } else {
                      register(`educations.${index}.school`).onChange({
                        target: { value },
                      });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select School" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="harvard">Harvard University</SelectItem>
                    <SelectItem value="mit">MIT</SelectItem>
                    <SelectItem value="stanford">
                      Stanford University
                    </SelectItem>
                    <SelectItem value="custom">Other (Custom)</SelectItem>
                  </SelectContent>
                </Select>
                {customSchool === "custom" && (
                  <Input
                    {...register(`educations.${index}.school`)}
                    placeholder="Enter School Name"
                  />
                )}
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
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeEducation(index)}
                >
                  Remove
                </Button>
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

        <div className="flex items-center space-x-4">
          <Label htmlFor="cv" className="w-1/3 text-right">
            CV Upload
          </Label>
          <div className="w-2/3">
            <Input
              id="cv"
              type="file"
              {...register("cv")}
              accept=".pdf,.doc,.docx"
            />
            {errors.cv && (
              <p className="text-red-500 text-sm mt-1">{errors.cv.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Submit Application</Button>
        </div>
      </form>
    </div>
  );
}
