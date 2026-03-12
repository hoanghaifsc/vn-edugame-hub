import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLang } from '../hooks/useLang';
import { mockDB, MOCK_GAMES } from '../services/mockData';

export default function TeacherDashboard() {
  const { userProfile } = useAuth();
  const { t } = useLang();
  const [tab, setTab] = useState('assignments');
  const [assignments, setAssignments] = useState(() => mockDB.getAssignments(userProfile?.classId));
  const [reportData, setReportData] = useState([]);
  const [form, setForm] = useState({ gameId: '', classId: userProfile?.classId || '', title: '', dueDate: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  function handleAssign(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      mockDB.createAssignment({ ...form, teacherUid: userProfile.uid });
      setAssignments(mockDB.getAssignments(userProfile?.classId));
      setMessage(t('teacher.assigned'));
      setForm({ gameId: '', classId: userProfile?.classId || '', title: '', dueDate: '' });
      setLoading(false);
    }, 500);
  }

  function viewReport(assignmentId) {
    setReportData(mockDB.getReport(assignmentId));
    setTab('reports');
  }

  return (
    <div className="teacher-dashboard" data-testid="teacher-dashboard">
      <h1>{t('teacher.title')} — {userProfile?.displayName}</h1>

      <nav className="tab-nav">
        <button className={tab === 'assignments' ? 'active' : ''} onClick={() => setTab('assignments')} data-testid="tab-assignments">
          {t('teacher.tabAssign')}
        </button>
        <button className={tab === 'reports' ? 'active' : ''} onClick={() => setTab('reports')} data-testid="tab-reports">
          {t('teacher.tabReport')}
        </button>
      </nav>

      {tab === 'assignments' && (
        <div data-testid="assignments-panel">
          <section>
            <h2>{t('teacher.newTask')}</h2>
            <form onSubmit={handleAssign} data-testid="assign-form">
              <label>
                {t('teacher.inputTitle')}
                <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required data-testid="input-title" />
              </label>
              <label>
                {t('teacher.selectGame')}
                <select value={form.gameId} onChange={e => setForm({ ...form, gameId: e.target.value })} required data-testid="select-game">
                  <option value="">--</option>
                  {MOCK_GAMES.map(g => <option key={g.gameId} value={g.gameId}>{g.title}</option>)}
                </select>
              </label>
              <label>
                {t('teacher.classId')}
                <input type="text" value={form.classId} onChange={e => setForm({ ...form, classId: e.target.value })} required data-testid="input-class" />
              </label>
              <label>
                {t('teacher.dueDate')}
                <input type="datetime-local" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} required data-testid="input-due" />
              </label>
              <button type="submit" disabled={loading} data-testid="btn-assign">
                {loading ? t('teacher.assigning') : t('teacher.btnAssign')}
              </button>
            </form>
            {message && <p className="success-msg" data-testid="assign-message">{message}</p>}
          </section>

          <section>
            <h2>{t('teacher.assigned_list')}</h2>
            <table data-testid="assignments-table">
              <thead>
                <tr>
                  <th>{t('col.title')}</th>
                  <th>{t('col.game')}</th>
                  <th>{t('col.class')}</th>
                  <th>{t('col.due')}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {assignments.map(a => (
                  <tr key={a.assignmentId} data-testid={`assignment-row-${a.assignmentId}`}>
                    <td>{a.title}</td>
                    <td>{a.gameTitle}</td>
                    <td>{a.classId}</td>
                    <td>{new Date(a.dueDate).toLocaleDateString()}</td>
                    <td><button onClick={() => viewReport(a.assignmentId)}>{t('teacher.viewReport')}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      )}

      {tab === 'reports' && (
        <div data-testid="reports-panel">
          <h2>{t('teacher.reportTitle')}</h2>
          {reportData.length === 0 ? (
            <p>{t('teacher.noReport')}</p>
          ) : (
            <table data-testid="report-table">
              <thead>
                <tr>
                  <th>{t('col.student')}</th>
                  <th>{t('col.status')}</th>
                  <th>{t('col.score')}</th>
                  <th>{t('col.correct')}</th>
                  <th>{t('col.wrong')}</th>
                  <th>{t('col.duration')}</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map(row => (
                  <tr key={row.studentUid} data-testid={`report-row-${row.studentUid}`}>
                    <td>{row.studentName}</td>
                    <td data-testid="status">{row.status === 'completed' ? t('status.done') : t('status.pending')}</td>
                    <td>{row.score ?? '-'}</td>
                    <td>{row.correctAnswers ?? '-'}</td>
                    <td>{row.wrongAnswers ?? '-'}</td>
                    <td>{row.durationSeconds ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
