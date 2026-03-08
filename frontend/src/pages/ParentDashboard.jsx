/**
 * ParentDashboard.jsx — PROTOTYPE MODE
 * US05: Theo dõi tiến độ (mock data, không cần API)
 */
import { useAuth } from '../hooks/useAuth';
import { mockDB } from '../services/mockData';

export default function ParentDashboard() {
  const { userProfile } = useAuth();
  const overview = mockDB.getOverview();
  const weeklyProgress = mockDB.getWeeklyProgress();

  return (
    <div className="parent-dashboard" data-testid="parent-dashboard">
      <h1>Tiến độ học tập của con — {userProfile?.displayName}</h1>

      <section className="overview-cards" data-testid="overview-section">
        <div className="card" data-testid="card-online-time">
          <h3>Thời gian online tuần này</h3>
          <p className="metric">{Math.floor(overview.weeklyOnlineMinutes / 60)}h {overview.weeklyOnlineMinutes % 60}m</p>
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
          <p className="metric">{overview.completedAssignments} / {overview.totalAssignments}</p>
        </div>
      </section>

      <section data-testid="weekly-progress-section">
        <h2>Tiến độ môn học 7 ngày qua</h2>
        <table data-testid="weekly-table">
          <thead>
            <tr><th>Môn học</th><th>Số lần chơi</th><th>Tổng thời gian</th><th>Điểm TB</th><th>Xu hướng</th></tr>
          </thead>
          <tbody>
            {weeklyProgress.map((row) => (
              <tr key={row.subject} data-testid={`progress-row-${row.subject}`}>
                <td>{row.subjectLabel}</td>
                <td>{row.sessionsCount}</td>
                <td>{Math.floor(row.totalMinutes)}p</td>
                <td>{row.averageScore?.toFixed(1) ?? '-'}</td>
                <td>
                  <span className={`trend trend-${row.trend}`}>
                    {row.trend === 'up' ? '↑ Tốt hơn' : row.trend === 'down' ? '↓ Cần cải thiện' : '→ Ổn định'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
