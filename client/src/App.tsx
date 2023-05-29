import React from "react";
import { Routes, Route } from "react-router-dom";
import { Landing, ProjectDetail, Projects } from "./pages";
import { LogIn, Navbar, SignIn } from "./components";

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar isAuthenticated={false} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </div>
  );
};

export default App;
