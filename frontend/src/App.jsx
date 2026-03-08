import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import StudentHome from './pages/StudentHome';
import TeacherDashboard from './pages/TeacherDashboard';
import ParentDashboard from './pages/ParentDashboard';

const ROLES = [
  { key: 'student', label: '🎮 Học sinh' },
  { key: 'teacher', label: '📋 Giáo viên' },
  { key: 'parent', label: '👨‍👩‍👧 Phụ huynh' },
];

/** Thanh chuyển role - chỉ dùng khi prototype */
function DevRoleBar() {
  const { userProfile, switchRole } = useAuth();
  return (
    <div style={{ background: '#1a1a2e', color: '#fff', padding: '6px 16px', display: 'flex', alignItems: 'center', gap: 12, fontSize: 13 }}>
      <span style={{ opacity: 0.6 }}>PROTOTYPE — Xem vai:</span>
      {ROLES.map((r) => (
        <button
          key={r.key}
          onClick={() => switchRole(r.key)}
          style={{
            padding: '3px 12px', borderRadius: 20, border: 'none', cursor: 'pointer',
            background: userProfile?.role === r.key ? '#1a73e8' : '#333',
            color: '#fff', fontWeight: userProfile?.role === r.key ? 700 : 400,
          }}
        >
          {r.label}
        </button>
      ))}
      <span style={{ marginLeft: 'auto', opacity: 0.5 }}>👤 {userProfile?.displayName}</span>
    </div>
  );
}

function RoleRouter() {
  const { userProfile } = useAuth();
  if (userProfile?.role === 'teacher') return <TeacherDashboard />;
  if (userProfile?.role === 'parent') return <ParentDashboard />;
  return <StudentHome />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <DevRoleBar />
        <Routes>
          <Route path="/" element={<RoleRouter />} />
          <Route path="/game/:gameId" element={<StudentHome />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
