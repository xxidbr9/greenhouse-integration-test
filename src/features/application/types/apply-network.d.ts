export interface ApplyRespType {
  id: number;
  first_name: string;
  last_name: string;
  company: string;
  title: string;
  created_at: string;
  updated_at: string;
  last_activity: string;
  is_private: boolean;
  photo_url: any;
  attachments: any[];
  application_ids: number[];
  phone_numbers: PhoneNumber[];
  addresses: Address[];
  email_addresses: EmailAddress[];
  website_addresses: WebsiteAddress[];
  social_media_addresses: SocialMediaAddress[];
  recruiter: any;
  coordinator: any;
  can_email: boolean;
  tags: any[];
  applications: Application[];
  educations: any[];
  employments: Employment[];
  linked_user_ids: any[];
}

export interface PhoneNumber {
  value: string;
  type: string;
}

export interface Address {
  value: string;
  type: string;
}

export interface EmailAddress {
  value: string;
  type: string;
}

export interface WebsiteAddress {
  value: string;
  type: string;
}

export interface SocialMediaAddress {
  value: string;
}

export interface Application {
  id: number;
  candidate_id: number;
  prospect: boolean;
  applied_at: string;
  rejected_at: any;
  last_activity_at: string;
  location: any;
  attachments: any[];
  source: any;
  credited_to: any;
  rejection_reason: any;
  rejection_details: any;
  jobs: Job[];
  job_post_id: any;
  status: string;
  current_stage: CurrentStage;
  answers: any[];
  prospective_department: any;
  prospective_office: any;
  prospect_detail: ProspectDetail;
}

export interface Job {
  id: number;
  name: string;
}

export interface CurrentStage {
  id: number;
  name: string;
}

export interface ProspectDetail {
  prospect_pool: any;
  prospect_stage: any;
  prospect_owner: any;
}

export interface Employment {
  id: number;
  company_name: string;
  title: string;
  start_date: string;
  end_date: string;
}
