import React, { useState } from 'react';
import './Sidebar.css';

const pages = [
  { name: 'Home', icon: '🏠' },
  { name: 'Profile', icon: '👤' },
  { name: 'Dashboard', icon: '📊' },
  { name: 'Settings', icon: '⚙️' },
  { name: 'Help', icon: '❓' },
  { name: 'Logout', icon: '🚪' },
];

function Sidebar({ darkMode, setDarkMode }) {
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [active, setActive] = useState('Home');

  const filteredPages = pages.filter(page =>
    page.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`sidebar${open ? ' open' : ''}${darkMode ? ' dark' : ''}`}>
      <div className="sidebar-header">
        <button className="sidebar-toggle" onClick={() => setOpen(!open)}>
          {open ? '⏪' : '⏩'}
        </button>
        <span className="sidebar-title">Menu</span>
        <button
          className="sidebar-darkmode"
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? '🌙' : '☀️'}
        </button>
      </div>
      {open && (
        <>
          <input
            type="text"
            className="sidebar-search"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <ul className="sidebar-list">
            {filteredPages.length === 0 && (
              <li className="sidebar-item empty">No results</li>
            )}
            {filteredPages.map(page => (
              <li
                key={page.name}
                className={`sidebar-item${active === page.name ? ' active' : ''}`}
                onClick={() => setActive(page.name)}
              >
                <span className="sidebar-icon">{page.icon}</span>
                <span className="sidebar-label">{page.name}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Sidebar;
