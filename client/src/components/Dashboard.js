import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div>Loading...</div>;

  const { user, stats, quickActions, recentActivity, notifications } = data;

  return (
    <div className="dashboard-container">
      <div className="welcome-section">
        <h1>Welcome back, {user.name}</h1>
        <p>Your efforts are making a difference in reuniting families</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.name} className="stat-card">
            <div className="stat-left">
              <p className="stat-title">{stat.name}</p>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-trend">{stat.trend}</p>
            </div>
            <div className="stat-icon">{stat.icon}</div>
          </div>
        ))}
      </div>

      <div className="main-section">
        <div className="actions-section">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            {quickActions.map((action) => (
              <Link key={action.name} to={action.href} className="action-card">
                <div className="action-icon">{action.icon}</div>
                <div>
                  <h3>{action.name}</h3>
                  <p>{action.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="activity-section">
            <h2>Recent Activity</h2>
            {recentActivity.map((activity) => (
              <div key={activity.id} className="activity-card">
                <div className="activity-icon">{activity.icon}</div>
                <div>
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                  <span>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="notifications-section">
          <h2>Notifications</h2>
          {notifications.length === 0 ? (
            <p>No notifications at this time</p>
          ) : (
            notifications.slice(0, 3).map((n) => (
              <div key={n.id} className="notification-card">
                <h3>{n.title}</h3>
                <p>{n.message}</p>
                <span>{new Date(n.timestamp).toLocaleDateString()}</span>
              </div>
            ))
          )}

          <div className="resources-box">
            <h2>Need Help?</h2>
            <p>Access resources and support for families of missing persons</p>
            <Link to="/resources" className="resource-link">View Resources</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
