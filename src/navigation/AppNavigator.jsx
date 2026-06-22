import { NavLink, Outlet, Route, Routes } from 'react-router-dom';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import DetailScreen from '../screens/DetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TasksScreen from '../screens/TasksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import './AppNavigator.css';

const TABS = [
  { to: '/', label: 'Home', emoji: '🏠', end: true },
  { to: '/explore', label: 'Explore', emoji: '🔍', end: false },
  { to: '/profile', label: 'Profile', emoji: '👤', end: true },
  { to: '/tasks', label: 'Tasks', emoji: '✅', end: true },
  { to: '/settings', label: 'Settings', emoji: '⚙️', end: true },
];

function TabBar() {
  return (
    <nav className="tab-bar" aria-label="Primary">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            isActive ? 'tab-item tab-item-active' : 'tab-item'
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={
                  isActive
                    ? 'tab-icon-wrap tab-icon-wrap-active'
                    : 'tab-icon-wrap'
                }
                aria-hidden="true"
              >
                <span
                  className={isActive ? 'tab-emoji' : 'tab-emoji tab-emoji-inactive'}
                >
                  {tab.emoji}
                </span>
              </span>
              <span className="tab-label">{tab.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

function TabsLayout() {
  return (
    <div className="app-shell">
      <main className="app-main">
        <Outlet />
      </main>
      <TabBar />
    </div>
  );
}

export default function AppNavigator() {
  return (
    <Routes>
      <Route element={<TabsLayout />}>
        <Route index element={<HomeScreen />} />
        <Route path="explore" element={<ExploreScreen />} />
        <Route path="explore/:id" element={<DetailScreen />} />
        <Route path="profile" element={<ProfileScreen />} />
        <Route path="tasks" element={<TasksScreen />} />
        <Route path="settings" element={<SettingsScreen />} />
      </Route>
    </Routes>
  );
}
