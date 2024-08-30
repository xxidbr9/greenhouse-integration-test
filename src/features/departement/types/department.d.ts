export interface DepartmentType {
  id: string;
  name: string;
  parent_id: any;
  parent_department_external_id: any;
  child_ids: any[];
  child_department_external_ids: any[];
  external_id: any;
}
