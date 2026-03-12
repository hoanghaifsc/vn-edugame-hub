import { useAuth } from '../hooks/useAuth';
import { useLang } from '../hooks/useLang';
import { mockDB } from '../services/mockData';

export default function ParentDashboard() {
  const { userProfile } = useAuth();
  const { t } = useLang();
  const overview = mockDB.getOverview();
  const weeklyProgress = mockDB.getWeeklyProgress();

  return (
    <div className="parent-dashboard" data-testid="parent-dashboard">
      <h1>{t('parent.title')} — {userProfile?.displayName}</h1>

      <section className="overview-cards" data-testid="overview-section">
        <div className="card" data-testid="card-online-time">
          <h3>{t('parent.onlineTime')}</h3>
          <p className="metric">{Math.floor(overview.weeklyOnlineMinutes / 60)}h {overview.weeklyOnlineMinutes % 60}m</p>
        </div>
        <div className="card" data-testid="card-games-played">
          <h3>{t('parent.gamesPlayed')}</h3>
          <p className="metric">{overview.gamesPlayedThisWeek}</p>
        </div>
        <div className="card" data-testid="card-avg-score">
          <h3>{t('parent.avgScore')}</h3>
          <p className="metric">{overview.averageScore?.toFixed(1) ?? '-'}</p>
        </div>
        <div className="card" data-testid="card-assignments">
          <h3>{t('parent.assignments')}</h3>
          <p className="metric">{overview.completedAssignments} / {overview.totalAssignments}</p>
        </div>
      </section>

      <section data-testid="weekly-progress-section">
        <h2>{t('parent.weeklyTitle')}</h2>
        {weeklyProgress.length === 0 ? (
          <p>{t('parent.noData')}</p>
        ) : (
          <table data-testid="weekly-table">
            <thead>
              <tr>
                <th>{t('col.subject')}</th>
                <th>{t('col.sessions')}</th>
                <th>{t('col.totalTime')}</th>
                <th>{t('col.avgScore')}</th>
                <th>{t('col.trend')}</th>
              </tr>
            </thead>
            <tbody>
              {weeklyProgress.map(row => (
                <tr key={row.subject} data-testid={`progress-row-${row.subject}`}>
                  <td>{t(`subject.${row.subject}`)}</td>
                  <td>{row.sessionsCount}</td>
                  <td>{Math.floor(row.totalMinutes)}p</td>
                  <td>{row.averageScore?.toFixed(1) ?? '-'}</td>
                  <td>
                    <span className={`trend trend-${row.trend}`}>
                      {t(`trend.${row.trend}`)}
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
