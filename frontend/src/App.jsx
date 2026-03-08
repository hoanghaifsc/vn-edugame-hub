import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import StudentHome from './pages/StudentHome';
import TeacherDashboard from './pages/TeacherDashboard';
import ParentDashboard from './pages/ParentDashboard';

function RoleRouter() {
  const { userProfile, loading } = useAuth();
  if (loading) return <div style={{ padding: 32 }}>Đang tải...</div>;
  if (!userProfile) return <Navigate to="/login" />;
  if (userProfile.role === 'teacher') return <TeacherDashboard />;
  if (userProfile.role === 'parent') return <ParentDashboard />;
  return <StudentHome />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleRouter />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/parent" element={<ParentDashboard />} />
          <Route path="/game/:gameId" element={<StudentHome />} />
          <Route path="/login" element={<div>Login page (TODO)</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
