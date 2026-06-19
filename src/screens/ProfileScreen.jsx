import ScreenLayout from '../components/ScreenLayout';
import Card from '../components/Card';
import './ProfileScreen.css';

const STATS = [
  { label: 'Sessions', value: '12' },
  { label: 'Tasks Done', value: '48' },
  { label: 'Streak', value: '5 days' },
];

export default function ProfileScreen() {
  return (
    <ScreenLayout scroll>
      <Card className="profile-card">
        <div className="profile-avatar">
          <span className="profile-avatar-text">LK</span>
        </div>
        <p className="profile-name">Guest User</p>
        <p className="profile-email">guest@helloapp.dev</p>
      </Card>

      <h2 className="profile-section-title">Your Stats</h2>
      <div className="profile-stats-row">
        {STATS.map((stat) => (
          <Card key={stat.label} className="profile-stat-card">
            <p className="profile-stat-value">{stat.value}</p>
            <p className="profile-stat-label">{stat.label}</p>
          </Card>
        ))}
      </div>

      <h2 className="profile-section-title">About</h2>
      <Card>
        <p className="profile-about-text">
          This profile screen shows how multiple UI sections can live on one
          tab. Use the bottom navigation to switch between Home, Explore,
          Profile, and Settings.
        </p>
      </Card>
    </ScreenLayout>
  );
}
