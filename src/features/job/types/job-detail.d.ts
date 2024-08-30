export interface JobDetailType {
  data: any;
  id: number;
  active: boolean;
  live: boolean;
  first_published_at: any;
  title: string;
  location: Location;
  internal: boolean;
  external: boolean;
  job_id: number;
  content: string;
  internal_content: any;
  updated_at: string;
  created_at: string;
  demographic_question_set_id: any;
  questions: Question[];
}

export interface Location {
  id: number;
  name: string;
  office_id: any;
  job_post_custom_location_id: any;
  job_post_location_type: JobPostLocationType;
}

export interface JobPostLocationType {
  id: number;
  name: string;
}

export interface Question {
  required?: boolean;
  private: boolean;
  label: string;
  name: string;
  type: string;
  values: any[];
  description: any;
}
