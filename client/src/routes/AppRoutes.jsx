import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

import Home from '../pages/Home/Home';
import Course from "../pages/Course/Course";
import CareerTrack from "../pages/CareerTrack/CareerTrack";
import VacancySearch from "../pages/Vacancy/VacancySearch";
import About from '../pages/About/About';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Welcome from "../pages/Welcome/Welcome";
import Profile from '../pages/Profile/ProfileSetting';


import CourseIntroPage from '../pages/CourseIntroPage/CourseIntroPage';
import CourseContentPage from '../pages/CourseContentPage/CourseContentPage';

import NotFound from '../pages/NotFound/NotFound';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <Routes>
      <Route path="/" element={
        isAuthenticated ? <Navigate to="/welcome" replace /> : <Home />
      } />
      <Route path="/courses" element={<Course />} />
      <Route path="/career-track" element={<CareerTrack />} />
      <Route path="/vacancy-search" element={<VacancySearch />} />
      <Route path="/about" element={<About />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />

      {/* интро курсов */}
      <Route path="/course/:id" element={<CourseIntroPage />} />
      {/* страница с курсами  */}
      <Route path="/course/:id/learn" element={<CourseContentPage />} />

      <Route path="/welcome" element={
        <ProtectedRoute>
          <Welcome />
        </ProtectedRoute>
      } />
      <Route path="/profile/setting" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}