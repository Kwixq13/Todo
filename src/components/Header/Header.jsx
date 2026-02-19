
import React from 'react';
import styles from './Header.module.scss';

const icons = {
  month: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="4" width="5" height="5" rx="0.5" />
      <rect x="9" y="4" width="5" height="5" rx="0.5" />
      <rect x="16" y="4" width="5" height="5" rx="0.5" />
      <rect x="2" y="11" width="5" height="5" rx="0.5" />
      <rect x="9" y="11" width="5" height="5" rx="0.5" />
      <rect x="16" y="11" width="5" height="5" rx="0.5" />
      <rect x="2" y="18" width="5" height="5" rx="0.5" />
      <rect x="9" y="18" width="5" height="5" rx="0.5" />
      <rect x="16" y="18" width="5" height="5" rx="0.5" />
    </svg>
  ),
  week: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="8" width="20" height="4" rx="0.5" />
      <rect x="2" y="14" width="20" height="4" rx="0.5" />
    </svg>
  ),
  day: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="6" width="12" height="12" rx="1" />
    </svg>
  ),
};

function CalendarHeader({ activeView, onViewChange }) {
  const tabList = [
    { id: 'month', label: 'Month' },
    { id: 'week', label: 'Week' },
    { id: 'day', label: 'Day' },
  ];

  return (
    <div className={styles.headerBar}>
      <span className={styles.title}>Task Calendar</span>
      <nav className={styles.tabsNav}>
        {tabList.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={
              `${styles.tabBtn} ${activeView === tab.id ? styles.activeTab : ''}`
            }
            onClick={() => onViewChange(tab.id)}
          >
            {icons[tab.id]}
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default CalendarHeader;
