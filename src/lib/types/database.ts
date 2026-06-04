export type OpenRole = {
  id: string;
  title: string;
  role_type: string;
  description: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type ContactInfo = {
  id: number;
  email: string;
  booking_url: string;
  updated_at: string;
};

export type OpenRoleInput = {
  title: string;
  role_type: string;
  description: string;
  sort_order?: number;
  published?: boolean;
};

export type JobApplication = {
  id: string;
  role_id: string | null;
  role_title: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  linkedin: string | null;
  resume_path: string;
  resume_filename: string;
  created_at: string;
};
