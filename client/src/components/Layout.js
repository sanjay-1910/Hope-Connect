// Layout.tsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Layout.css';
import Dashboard from './Dashboard';
import { Outlet } from 'react-router-dom';


const dummyUser = {
  name: 'John Doe',
  avatar: 'https://via.placeholder.com/40'
};

const dummyNotifications = [
  { id: 1, title: 'Match Found', message: 'Someone matched your report', read: false, timestamp: Date.now(), type: 'match' },
  { id: 2, title: 'Success Story', message: 'A person has been reunited', read: true, timestamp: Date.now(), type: 'success' }
];

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const user = dummyUser;
  const notifications = dummyNotifications;

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    navigate('/');
  };

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Report Missing', href: '/report-missing' },
    { name: 'Report Found', href: '/report-found' },
    { name: 'Resources', href: '/resources' },
    { name: 'Success Stories', href: '/success-stories' },
    { name: 'FAQ', href: '/faq' }
  ];

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo">Hope Connect</Link>

          <div className="nav-links">
            {navigationItems.map(item => (
              <Link
                key={item.name}
                to={item.href}
                className={location.pathname === item.href ? 'nav-link active' : 'nav-link'}>
                {item.name}
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            <button onClick={() => setShowNotifications(!showNotifications)} className="notif-button">
              🔔
              {unreadNotifications > 0 && <span className="notif-count">{unreadNotifications}</span>}
            </button>

            <button onClick={() => setShowUserMenu(!showUserMenu)} className="user-button">
              <img src={user.avatar} alt="user" className="avatar" />
            </button>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="menu-toggle">
              {isMobileMenuOpen ? '✖' : '☰'}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu">
            {navigationItems.map(item => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={location.pathname === item.href ? 'nav-link active' : 'nav-link'}>
                {item.name}
              </Link>
            ))}
          </div>
        )}

        {showNotifications && (
          <div className="notif-box">
            <h4>Notifications</h4>
            {notifications.map(notif => (
              <div key={notif.id} className={`notif-item ${notif.read ? '' : 'unread'}`}>
                <p><strong>{notif.title}</strong></p>
                <p>{notif.message}</p>
              </div>
            ))}
          </div>
        )}

        {showUserMenu && (
          <div className="user-menu">
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        )}
      </nav>
      <main className="main-content">
        <Outlet />
      </main>

    </div>
  );
};

export default Layout;


// i want to fetch the stored notifications in the database to my frontend when a user clicks on bell icon on my frontend 
// in my server.js i am already storing the notificatiosn when a match found now we only need to fetch them 
