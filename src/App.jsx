import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, Provider, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Redux slices
import { store } from "./store/store";
import { getUser } from "./store/slices/userSlice";
import { getAllMessages } from "./store/slices/messageSlice";
import { getAllTimeline } from "./store/slices/timelineSlice";
import { getAllSkills } from "./store/slices/skillSlice";
import { getAllSoftwareApplications } from "./store/slices/softwareApplicationSlice";
import { getAllProjects } from "./store/slices/projectSlice";

// Theme and Layout
import { ThemeProvider } from "@/components/theme-provider";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";

// Portfolio pages
import Home from "./pages/portfolio/Home";
import ProjectView from "./pages/portfolio/ProjectView";

// Dashboard pages
import HomePage from "./pages/dashboard/HomePage";
import Login from "./pages/dashboard/Login";
import ForgotPassword from "./pages/dashboard/ForgotPassword";
import ResetPassword from "./pages/dashboard/ResetPassword";
import ManageSkills from "./pages/dashboard/ManageSkills";
import ManageTimeline from "./pages/dashboard/ManageTimeline";
import ManageProjects from "./pages/dashboard/ManageProjects";
import ViewProject from "./pages/dashboard/ViewProject";
import UpdateProject from "./pages/dashboard/UpdateProject";

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("AppContent: Initial data fetching");
    dispatch(getUser());
    dispatch(getAllMessages());
    dispatch(getAllTimeline());
    dispatch(getAllSkills());
    dispatch(getAllSoftwareApplications());
    dispatch(getAllProjects());
  }, [dispatch]);

  // Debug data
  const { isAuthenticated, user } = useSelector(state => state.user);
  console.log("AppContent: Authentication status:", isAuthenticated);
  console.log("AppContent: User data:", user);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          {/* Portfolio Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/project/:id" element={<Layout><ProjectView /></Layout>} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<ErrorBoundary><HomePage /></ErrorBoundary>} />
          <Route path="/dashboard/login" element={<Login />} />
          <Route path="/dashboard/password/forgot" element={<ForgotPassword />} />
          <Route path="/dashboard/password/reset/:token" element={<ResetPassword />} />
          <Route path="/dashboard/manage/skills" element={<ManageSkills />} />
          <Route path="/dashboard/manage/timeline" element={<ManageTimeline />} />
          <Route path="/dashboard/manage/projects" element={<ManageProjects />} />
          <Route path="/dashboard/view/project/:id" element={<ViewProject />} />
          <Route path="/dashboard/update/project/:id" element={<UpdateProject />} />
        </Routes>

        <ToastContainer position="bottom-right" theme="dark" />
      </Router>
    </ThemeProvider>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
