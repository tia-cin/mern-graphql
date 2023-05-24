export interface TaskType {
  _id?: string;
  title: string;
  description?: string;
  project: ProjectType;
  createdAt?: string;
  updatedAt?: string;
  status: string;
  dueDate: string;
  assignedTo: string;
}

export interface ProjectType {
  _id?: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  status: string;
  tasks?: TaskType[];
  owner: UserType;
  members: UserType[];
  dueDate: string;
}

export interface UserType {
  name: string;
  password: string;
  email: string;
  role: string;
  projects: ProjectType[];
  tasks: TaskType[];
  createdAt?: string;
  updatedAt?: string;
}
