import React from "react";
import { ProjectForm, ProjectList } from "../components";

const Projects: React.FC = () => {
  return (
    <div className="mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Create Project</h1>
        <ProjectForm />
      </div>
      <div className="mb-8">
        <h1 className="text-xl font-bold mb-4">Projects</h1>
        <ProjectList />
      </div>
    </div>
  );
};

export default Projects;
