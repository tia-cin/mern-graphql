import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Landing, ProjectDetail, Projects } from "./pages";
import { LogIn, Navbar, SignIn } from "./components";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

// const auth = (context) => {
//   const authHeader = context.req.headers.authorization;

//   if (authHeader) {
//     const token = authHeader.split("Bearer")[1];

//     if (token) {
//       try {
//         const user = jwt.verify(token, secret);
//         return user;
//       } catch (error) {
//         throw new AuthenticationError("Invalid/Expired Token");
//       }
//     }
//     throw new Error("Authentication token must be 'Bearer' type");
//   }
//   throw new Error("Authorization header must be provided");
// };

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
