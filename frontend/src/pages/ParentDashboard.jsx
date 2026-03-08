/**
 * ParentDashboard.jsx
 * US05: Phụ huynh theo dõi tiến độ học tập của con
 * AC: Dashboard tổng quan (thời gian online, tiến độ môn học hàng tuần)
 */
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function ParentDashboard() {
  const { user, userProfile } = useAuth();
  const [overview, setOverview] = useState(null);
  const [weeklyProgress, setWeeklyProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const token = await user.getIdToken();
      const headers = { Authorization: `Bearer ${token}` };

      const [overviewRes, weeklyRes] = await Promise.all([
        fetch('/api/progress/overview', { headers }),
        fetch('/api/progress/weekly', { headers }),
      ]);

      if (overviewRes.ok) setOverview(await overviewRes.json());
      if (weeklyRes.ok) setWeeklyProgress(await weeklyRes.json());
    } catch (err) {
      console.error('Lỗi tải dashboard:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p data-testid="loading">Đang tải...</p>;

  return (
    <div className="parent-dashboard" data-testid="parent-dashboard">
      <h1>Tiến độ học tập của con</h1>

      {/* Tổng quan */}
      {overview && (
        <section className="overview-cards" data-testid="overview-section">
          <div className="card" data-testid="card-online-time">
            <h3>Thời gian online tuần này</h3>
            <p className="metric">
              {Math.floor(overview.weeklyOnlineMinutes / 60)}h {overview.weeklyOnlineMinutes % 60}m
            </p>
          </div>
          <div className="card" data-testid="card-games-played">
            <h3>Game đã chơi tuần này</h3>
            <p className="metric">{overview.gamesPlayedThisWeek}</p>
          </div>
          <div className="card" data-testid="card-avg-score">
            <h3>Điểm trung bình</h3>
            <p className="metric">{overview.averageScore?.toFixed(1) ?? '-'}</p>
          </div>
          <div className="card" data-testid="card-assignments">
            <h3>Bài tập hoàn thành</h3>
            <p className="metric">
              {overview.completedAssignments} / {overview.totalAssignments}
            </p>
          </div>
        </section>
      )}

      {/* Tiến độ theo môn học hàng tuần */}
      <section data-testid="weekly-progress-section">
        <h2>Tiến độ môn học 7 ngày qua</h2>
        {weeklyProgress.length === 0 ? (
          <p>Chưa có dữ liệu trong tuần này.</p>
        ) : (
          <table data-testid="weekly-table">
            <thead>
              <tr>
                <th>Môn học</th>
                <th>Số lần chơi</th>
                <th>Tổng thời gian</th>
                <th>Điểm TB</th>
                <th>Xu hướng</th>
              </tr>
            </thead>
            <tbody>
              {weeklyProgress.map((row) => (
                <tr key={row.subject} data-testid={`progress-row-${row.subject}`}>
                  <td>{row.subjectLabel}</td>
                  <td>{row.sessionsCount}</td>
                  <td>{Math.floor(row.totalMinutes)}p</td>
                  <td>{row.averageScore?.toFixed(1)}</td>
                  <td>
                    <span className={`trend trend-${row.trend}`}>
                      {row.trend === 'up' ? '↑ Tốt hơn' : row.trend === 'down' ? '↓ Cần cải thiện' : '→ Ổn định'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
