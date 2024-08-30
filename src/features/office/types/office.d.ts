export interface OfficeType {
  id: string;
  name: string;
  location: Location;
  primary_contact_user_id?: any;
  parent_id?: any;
  parent_office_external_id?: any;
  child_ids?: any[];
  child_office_external_ids?: any[];
  external_id?: any;
}

export interface Location {
  name: any;
}
