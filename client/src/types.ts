export enum ActionOptions {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

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
  owner: string;
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
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
  token: string;
}

export interface AuthState {
  user: UserType | null;
}

export interface AuthAction {
  type: ActionOptions;
  payload?: UserType | LoginInput;
}

export interface ContextType {
  user: UserType | null;
  login: (userData: LoginInput) => void;
  logout: () => void;
}
