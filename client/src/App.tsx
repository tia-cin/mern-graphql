import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { Landing, ProjectDetail, Projects } from "./pages";
import { LogIn, Navbar, SignIn } from "./components";
import client from "./apollo";

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Navbar isAuthenticated={false} />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
};

export default App;
