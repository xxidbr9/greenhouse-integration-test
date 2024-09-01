import { formSchema } from "../components/application-form/application-form";
import z from "zod";
import { ApplyType, Education } from "../types/apply";

type schemaType = z.infer<typeof formSchema> & { new_educations: Education[] };

export const parseToApplicationCandidate = (args: {
  data: schemaType;
  job_id: number | string;
}): ApplyType => {
  const { data, job_id } = args;

  return {
    addresses: data.addresses,
    applications: [{ job_id: job_id as number }],
    company: data.company || "",
    educations: data.new_educations,
    email_addresses: data.email_addresses,
    employments: data.work_experiences.map((work) => ({
      company_name: work.company,
      title: work.job_title,
      end_date: work.end_date,
      start_date: work.start_date,
    })),
    first_name: data.first_name,
    is_private: false,
    last_name: data.last_name,
    phone_numbers: data.phone_numbers,
    social_media_addresses: data.social_media_addresses,
    title: data.title || "",
    tags: [],
    website_addresses: data.website_addresses.map((web) => ({
      value: web.value || "",
      type: web.type,
    })),
  };
};
/* 
{
  "first_name": "John",
  "last_name": "Locke",
  "company": "The Tustin Box Company",
  "title": "Customer Success Representative",
  "is_private": false,
  "phone_numbers": [
    {
      "value": "555-1212",
      "type": "mobile"
    }
  ],
  "addresses": [
    {
      "value": "123 Fake St.",
      "type": "home"
    }
  ],
  "email_addresses": [
    {
      "value": "john.locke+work@example.com",
      "type": "work"
    },
    {
      "value": "john.locke@example.com",
      "type": "personal"
    }
  ],
  "website_addresses": [
    {
      "value": "johnlocke.example.com",
      "type": "personal"
    }
  ],
  "social_media_addresses": [
    {
      "value": "linkedin.example.com/john.locke"
    },
    {
      "value": "@johnlocke"
    }
  ],
  "educations": [
  ],
  "employments": [
      {
          "company_name": "Greenhouse",
          "title": "Engineer",
          "start_date": "2012-08-15T00:00:00.000Z",
          "end_date": "2016-05-15T00:00:00.000Z"
      }
  ],
  "tags": [
  ],
  "applications": [
    {
      "job_id": 4063668007
    }
  ]
}
*/
