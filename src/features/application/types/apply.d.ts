export interface ApplyType {
  first_name: string;
  last_name: string;
  company: string;
  title: string;
  is_private: boolean;
  phone_numbers: PhoneNumber[];
  addresses: Address[];
  email_addresses: EmailAddress[];
  website_addresses: WebsiteAddress[];
  social_media_addresses: SocialMediaAddress[];
  educations: Education[];
  employments: Employment[];
  tags: any[];
  applications: Application[];
}

export interface Education {
  school_id?: number;
  discipline_id?: number;
  degree_id?: number;
  start_date?: string;
  end_date?: string;
}

export interface PhoneNumber {
  value: string;
  type?: string;
}

export interface Address {
  value: string;
  type?: string;
}

export interface EmailAddress {
  value: string;
  type?: string;
}

export interface WebsiteAddress {
  value: string;
  type?: string;
}

export interface SocialMediaAddress {
  value: string;
}

export interface Employment {
  company_name: string;
  title: string;
  start_date?: string;
  end_date?: string;
}

export interface Application {
  job_id: number;
}
