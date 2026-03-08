/**
 * TeacherDashboard.jsx — PROTOTYPE MODE
 * US03: Giao bài tập | US04: Xem báo cáo (mock data, không cần API)
 */
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { mockDB, MOCK_GAMES } from '../services/mockData';

export default function TeacherDashboard() {
  const { userProfile } = useAuth();
  const [tab, setTab] = useState('assignments');
  const [assignments, setAssignments] = useState(() => mockDB.getAssignments(userProfile?.classId));
  const [reportData, setReportData] = useState([]);
  const [form, setForm] = useState({ gameId: '', classId: userProfile?.classId || '', title: '', dueDate: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  function handleAssign(e) {
    e.preventDefault();
    setLoading(true);
    // Simulate async save
    setTimeout(() => {
      mockDB.createAssignment({ ...form, teacherUid: userProfile.uid });
      setAssignments(mockDB.getAssignments(userProfile?.classId));
      setMessage('Giao bài thành công!');
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
      <h1>Dashboard Giáo viên — {userProfile?.displayName}</h1>

      <nav className="tab-nav">
        <button className={tab === 'assignments' ? 'active' : ''} onClick={() => setTab('assignments')} data-testid="tab-assignments">
          Giao bài tập
        </button>
        <button className={tab === 'reports' ? 'active' : ''} onClick={() => setTab('reports')} data-testid="tab-reports">
          Báo cáo
        </button>
      </nav>

      {tab === 'assignments' && (
        <div data-testid="assignments-panel">
          <section>
            <h2>Giao bài tập mới</h2>
            <form onSubmit={handleAssign} data-testid="assign-form">
              <label>
                Tiêu đề bài tập:
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required data-testid="input-title" />
              </label>
              <label>
                Chọn game:
                <select value={form.gameId} onChange={(e) => setForm({ ...form, gameId: e.target.value })} required data-testid="select-game">
                  <option value="">-- Chọn game --</option>
                  {MOCK_GAMES.map((g) => <option key={g.gameId} value={g.gameId}>{g.title}</option>)}
                </select>
              </label>
              <label>
                Mã lớp:
                <input type="text" value={form.classId} onChange={(e) => setForm({ ...form, classId: e.target.value })} required data-testid="input-class" />
              </label>
              <label>
                Hạn nộp:
                <input type="datetime-local" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} required data-testid="input-due" />
              </label>
              <button type="submit" disabled={loading} data-testid="btn-assign">
                {loading ? 'Đang lưu...' : 'Giao bài'}
              </button>
            </form>
            {message && <p className="success-msg" data-testid="assign-message">{message}</p>}
          </section>

          <section>
            <h2>Bài tập đã giao</h2>
            <table data-testid="assignments-table">
              <thead>
                <tr><th>Tiêu đề</th><th>Game</th><th>Lớp</th><th>Hạn nộp</th><th></th></tr>
              </thead>
              <tbody>
                {assignments.map((a) => (
                  <tr key={a.assignmentId} data-testid={`assignment-row-${a.assignmentId}`}>
                    <td>{a.title}</td>
                    <td>{a.gameTitle}</td>
                    <td>{a.classId}</td>
                    <td>{new Date(a.dueDate).toLocaleDateString('vi-VN')}</td>
                    <td><button onClick={() => viewReport(a.assignmentId)}>Xem báo cáo</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      )}

      {tab === 'reports' && (
        <div data-testid="reports-panel">
          <h2>Báo cáo kết quả học sinh</h2>
          {reportData.length === 0 ? (
            <p>Chọn một bài tập để xem báo cáo.</p>
          ) : (
            <table data-testid="report-table">
              <thead>
                <tr><th>Học sinh</th><th>Trạng thái</th><th>Điểm</th><th>Câu đúng</th><th>Câu sai</th><th>Thời gian (giây)</th></tr>
              </thead>
              <tbody>
                {reportData.map((row) => (
                  <tr key={row.studentUid} data-testid={`report-row-${row.studentUid}`}>
                    <td>{row.studentName}</td>
                    <td data-testid="status">{row.status === 'completed' ? 'Hoàn thành' : 'Chưa làm'}</td>
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
