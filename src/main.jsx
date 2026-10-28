import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import CourseDetails from "./components/CourseDetails";
import MyLearning from "./components/MyLearning";
import LearningPage from "./components/LearningPage";
import AdminDashboard from "./AdminDashboard";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<App />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Course Details */}
        <Route path="/course/:id" element={<CourseDetails />} />

        {/* Student Learning */}
        <Route path="/my-learning" element={<MyLearning />} />
        <Route path="/learn/:id" element={<LearningPage />} />

        {/* Admin Analytics Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div
              style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "#F3EFE7",
                color: "#1F1F1F",
                fontFamily: "sans-serif",
                textAlign: "center",
                padding: "20px",
              }}
            >
              <h1 style={{ fontSize: "60px", margin: "0" }}>404</h1>

              <h2>Page Not Found</h2>

              <p>The page you are looking for does not exist.</p>

              <a
                href="/"
                style={{
                  display: "inline-block",
                  marginTop: "15px",
                  padding: "12px 24px",
                  background: "#E85D35",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                }}
              >
                Back to Home
              </a>
            </div>
          }
/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);