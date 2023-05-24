export interface Task {
  _id: string;
  title: string;
  project: Project;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
}

export interface ProjectTypes {
  name: string;
  description: string;
}
