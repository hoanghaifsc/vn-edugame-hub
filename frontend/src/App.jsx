import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { LangProvider, useLang } from './hooks/useLang';
import StudentHome from './pages/StudentHome';
import TeacherDashboard from './pages/TeacherDashboard';
import ParentDashboard from './pages/ParentDashboard';
import GamePlay from './pages/GamePlay';

const ROLES = ['student', 'teacher', 'parent'];

function DevRoleBar() {
  const { userProfile, switchRole } = useAuth();
  const { lang, setLang, t, languages } = useLang();
  const [langOpen, setLangOpen] = useState(false);
  const currentLang = languages.find(l => l.code === lang) || languages[0];

  return (
    <div style={barStyle.bar}>
      {/* Role switcher */}
      <span style={barStyle.label}>{t('dev.prototype')}</span>
      {ROLES.map(r => (
        <button key={r} onClick={() => switchRole(r)} style={{
          ...barStyle.btn,
          background: userProfile?.role === r ? '#1a73e8' : '#333',
          fontWeight: userProfile?.role === r ? 700 : 400,
        }}>
          {t(`role.${r}`)}
        </button>
      ))}

      {/* Language switcher */}
      <div style={{ marginLeft: 'auto', position: 'relative' }}>
        <button
          onClick={() => setLangOpen(o => !o)}
          style={barStyle.langBtn}
          aria-label="Change language"
        >
          <span style={{ fontSize: 16 }}>{currentLang.flag}</span>
          <span>{currentLang.label}</span>
          <span style={{ fontSize: 10, opacity: 0.7 }}>▼</span>
        </button>

        {langOpen && (
          <>
            <div onClick={() => setLangOpen(false)} style={barStyle.backdrop} />
            <div style={barStyle.dropdown}>
              {languages.map(l => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setLangOpen(false); }}
                  style={{
                    ...barStyle.dropItem,
                    background: lang === l.code ? '#e8f0fe' : '#fff',
                    fontWeight: lang === l.code ? 700 : 400,
                    color: lang === l.code ? '#1a73e8' : '#333',
                  }}
                >
                  <span style={{ fontSize: 18 }}>{l.flag}</span>
                  <span>{l.label}</span>
                  {lang === l.code && <span style={{ marginLeft: 'auto', color: '#1a73e8' }}>✓</span>}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const barStyle = {
  bar:      { background: '#1a1a2e', color: '#fff', padding: '6px 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, flexWrap: 'wrap', position: 'sticky', top: 0, zIndex: 100 },
  label:    { opacity: 0.6, whiteSpace: 'nowrap' },
  btn:      { padding: '3px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', color: '#fff', fontSize: 13 },
  langBtn:  { display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 20, border: '1px solid #444', background: '#2a2a3e', color: '#fff', cursor: 'pointer', fontSize: 13, whiteSpace: 'nowrap' },
  backdrop: { position: 'fixed', inset: 0, zIndex: 99 },
  dropdown: { position: 'absolute', right: 0, top: 'calc(100% + 6px)', background: '#fff', borderRadius: 10, boxShadow: '0 4px 20px rgba(0,0,0,.18)', minWidth: 180, zIndex: 100, overflow: 'hidden' },
  dropItem: { display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 14px', border: 'none', cursor: 'pointer', fontSize: 14, textAlign: 'left' },
};

function RoleRouter() {
  const { userProfile } = useAuth();
  if (userProfile?.role === 'teacher') return <TeacherDashboard />;
  if (userProfile?.role === 'parent')  return <ParentDashboard />;
  return <StudentHome />;
}

export default function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <BrowserRouter>
          <DevRoleBar />
          <Routes>
            <Route path="/"             element={<RoleRouter />} />
            <Route path="/game/:gameId" element={<GamePlay />}  />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LangProvider>
  );
}
