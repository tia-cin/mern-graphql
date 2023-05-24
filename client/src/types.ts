export interface TaskType {
  _id?: string;
  title: string;
  project: ProjectType;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectType {
  _id?: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  tasks?: TaskType[];
}
