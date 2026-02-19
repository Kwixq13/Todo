
import React, { useState, useMemo } from 'react';
import styles from './Calendar.module.scss';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function dateKey(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('-');
}

function CalendarView({ events = [], onDeleteEvent }) {
  const [viewDate, setViewDate] = useState(new Date());
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysCount = lastDay.getDate();

  let weekStart = firstDay.getDay() - 1;
  if (weekStart < 0) weekStart = 6;

  const groupedEvents = useMemo(() => {
    const map = {};
    for (const event of events) {
      const key = event.date instanceof Date ? dateKey(event.date) : event.date;
      if (!map[key]) map[key] = [];
      map[key].push(event);
    }
    return map;
  }, [events]);

  function handlePrevMonth() {
    setViewDate(new Date(year, month - 1, 1));
  }
  function handleNextMonth() {
    setViewDate(new Date(year, month + 1, 1));
  }

  function isToday(day) {
    const now = new Date();
    return day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
  }

  function renderCells() {
    const cells = [];
    const prevMonthDays = new Date(year, month, 0).getDate();

    for (let i = 0; i < weekStart; i++) {
      const day = prevMonthDays - weekStart + i + 1;
      const date = new Date(year, month - 1, day);
      const key = dateKey(date);
      const evts = groupedEvents[key] || [];
      cells.push(
        <div key={`prev-${i}`} className={styles.cell}>
          <span className={styles.otherMonth}>{day}</span>
          {evts.length > 0 && (
            <div className={styles.events}>
              {evts.map(ev => (
                <div key={ev.id} className={styles.eventPill}>
                  <span className={styles.eventTitle}>{ev.title}</span>
                  <button
                    className={styles.deleteEvent}
                    onClick={() => onDeleteEvent(ev.id)}
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    for (let day = 1; day <= daysCount; day++) {
      const date = new Date(year, month, day);
      const key = dateKey(date);
      const evts = groupedEvents[key] || [];
      const today = isToday(day);
      cells.push(
        <div key={day} className={`${styles.cell} ${today ? styles.today : ''}`}>
          <span className={styles.dayNum}>{day}</span>
          {evts.length > 0 && (
            <div className={styles.events}>
              {evts.map(ev => (
                <div key={ev.id} className={styles.eventPill}>
                  <span className={styles.eventTitle}>{ev.title}</span>
                  <button
                    className={styles.deleteEvent}
                    onClick={() => onDeleteEvent(ev.id)}
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    const total = weekStart + daysCount;
    const fill = total % 7 === 0 ? 0 : 7 - (total % 7);
    for (let i = 0; i < fill; i++) {
      const day = i + 1;
      const date = new Date(year, month + 1, day);
      const key = dateKey(date);
      const evts = groupedEvents[key] || [];
      cells.push(
        <div key={`next-${i}`} className={styles.cell}>
          <span className={styles.otherMonth}>{day}</span>
          {evts.length > 0 && (
            <div className={styles.events}>
              {evts.map(ev => (
                <div key={ev.id} className={styles.eventPill}>
                  <span className={styles.eventTitle}>{ev.title}</span>
                  <button
                    className={styles.deleteEvent}
                    onClick={() => onDeleteEvent(ev.id)}
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return cells;
  }

  return (
    <div className={styles.container}>
      <div className={styles.monthNav}>
        <button type="button" className={styles.navBtn} onClick={handlePrevMonth}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6" />
          </svg>
        </button>
        <span className={styles.monthYear}>{MONTH_NAMES[month]} {year}</span>
        <button type="button" className={styles.navBtn} onClick={handleNextMonth}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6" />
          </svg>
        </button>
      </div>
      <div className={styles.gridWrap}>
        <div className={styles.weekdays}>
          {WEEKDAYS.map(day => (
            <div key={day} className={styles.weekday}>{day}</div>
          ))}
        </div>
        <div className={styles.days}>{renderCells()}</div>
      </div>
    </div>
  );
}

export default CalendarView;
