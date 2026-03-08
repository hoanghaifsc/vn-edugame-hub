/**
 * TeacherDashboard.jsx
 * US03: Giáo viên giao bài tập
 * US04: Giáo viên xem báo cáo
 */
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function TeacherDashboard() {
  const { user, userProfile } = useAuth();
  const [tab, setTab] = useState('assignments'); // 'assignments' | 'reports'
  const [games, setGames] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [form, setForm] = useState({ gameId: '', classId: '', title: '', dueDate: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchGames();
    fetchAssignments();
  }, []);

  async function getAuthHeader() {
    const token = await user.getIdToken();
    return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  }

  async function fetchGames() {
    const res = await fetch('/api/games');
    const data = await res.json();
    setGames(data);
  }

  async function fetchAssignments() {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/assignments/class/${userProfile?.classId}`, { headers });
    if (res.ok) {
      const data = await res.json();
      setAssignments(data);
    }
  }

  // US03: Giao bài tập
  async function handleAssign(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const headers = await getAuthHeader();
      const res = await fetch('/api/assignments', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...form,
          teacherUid: user.uid,
        }),
      });
      if (res.ok) {
        setMessage('Giao bài thành công!');
        setForm({ gameId: '', classId: '', title: '', dueDate: '' });
        fetchAssignments();
      } else {
        setMessage('Lỗi khi giao bài. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  }

  // US04: Xem báo cáo
  async function fetchReport(assignmentId) {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/reports/assignment/${assignmentId}`, { headers });
    if (res.ok) {
      const data = await res.json();
      setReportData(data);
    }
  }

  return (
    <div className="teacher-dashboard" data-testid="teacher-dashboard">
      <h1>Dashboard Giáo viên - {userProfile?.displayName}</h1>

      <nav className="tab-nav">
        <button
          className={tab === 'assignments' ? 'active' : ''}
          onClick={() => setTab('assignments')}
          data-testid="tab-assignments"
        >
          Giao bài tập
        </button>
        <button
          className={tab === 'reports' ? 'active' : ''}
          onClick={() => setTab('reports')}
          data-testid="tab-reports"
        >
          Báo cáo
        </button>
      </nav>

      {tab === 'assignments' && (
        <div data-testid="assignments-panel">
          {/* US03: Form giao bài */}
          <section>
            <h2>Giao bài tập mới</h2>
            <form onSubmit={handleAssign} data-testid="assign-form">
              <label>
                Tiêu đề bài tập:
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  data-testid="input-title"
                />
              </label>
              <label>
                Chọn game:
                <select
                  value={form.gameId}
                  onChange={(e) => setForm({ ...form, gameId: e.target.value })}
                  required
                  data-testid="select-game"
                >
                  <option value="">-- Chọn game --</option>
                  {games.map((g) => (
                    <option key={g.gameId} value={g.gameId}>{g.title}</option>
                  ))}
                </select>
              </label>
              <label>
                Mã lớp:
                <input
                  type="text"
                  value={form.classId}
                  onChange={(e) => setForm({ ...form, classId: e.target.value })}
                  required
                  data-testid="input-class"
                />
              </label>
              <label>
                Hạn nộp:
                <input
                  type="datetime-local"
                  value={form.dueDate}
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  required
                  data-testid="input-due"
                />
              </label>
              <button type="submit" disabled={loading} data-testid="btn-assign">
                {loading ? 'Đang gửi...' : 'Giao bài'}
              </button>
            </form>
            {message && <p data-testid="assign-message">{message}</p>}
          </section>

          {/* Danh sách bài đã giao với trạng thái */}
          <section>
            <h2>Bài tập đã giao</h2>
            <table data-testid="assignments-table">
              <thead>
                <tr>
                  <th>Tiêu đề</th><th>Game</th><th>Lớp</th><th>Hạn</th><th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((a) => (
                  <tr key={a.assignmentId} data-testid={`assignment-row-${a.assignmentId}`}>
                    <td>{a.title}</td>
                    <td>{a.gameTitle}</td>
                    <td>{a.classId}</td>
                    <td>{new Date(a.dueDate).toLocaleDateString('vi-VN')}</td>
                    <td>
                      <button onClick={() => { fetchReport(a.assignmentId); setTab('reports'); }}>
                        Xem báo cáo
                      </button>
                    </td>
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
                <tr>
                  <th>Học sinh</th>
                  <th>Trạng thái</th>
                  <th>Điểm</th>
                  <th>Câu đúng</th>
                  <th>Câu sai</th>
                  <th>Thời gian (giây)</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((row) => (
                  <tr key={row.studentUid} data-testid={`report-row-${row.studentUid}`}>
                    <td>{row.studentName}</td>
                    <td data-testid="status">
                      {row.status === 'completed' ? 'Hoàn thành' : 'Chưa làm'}
                    </td>
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
