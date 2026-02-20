
import React, { useState, useMemo } from 'react';
import styles from './Calendar.module.scss';

function dateKey(date) {
    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()).padStart(2, '0')
    ].join('-');
}

function WeekView({ events = [], onDeleteEvent }) {
    const [viewDate, setViewDate] = useState(new Date());

    const weekDays = useMemo(() => {
        const startOfWeek = new Date(viewDate);
        const day = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Начинаем с понедельника
        startOfWeek.setDate(diff);

        const days = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(startOfWeek);
            d.setDate(startOfWeek.getDate() + i);
            days.push(d);
        }
        return days;
    }, [viewDate]);

    const groupedEvents = useMemo(() => {
        const map = {};
        for (const event of events) {
            const key = event.date instanceof Date ? dateKey(event.date) : event.date;
            if (!map[key]) map[key] = [];
            map[key].push(event);
        }
        return map;
    }, [events]);

    const handlePrevWeek = () => {
        const newDate = new Date(viewDate);
        newDate.setDate(viewDate.getDate() - 7);
        setViewDate(newDate);
    };

    const handleNextWeek = () => {
        const newDate = new Date(viewDate);
        newDate.setDate(viewDate.getDate() + 7);
        setViewDate(newDate);
    };

    const isToday = (date) => {
        const now = new Date();
        return date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear();
    };

    const weekRangeLabel = () => {
        const start = weekDays[0];
        const end = weekDays[6];
        const options = { month: 'short', day: 'numeric' };
        return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}, ${end.getFullYear()}`;
    };

    return (
        <div className={styles.container}>
            <div className={styles.monthNav}>
                <button type="button" className={styles.navBtn} onClick={handlePrevWeek}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15,18 9,12 15,6" />
                    </svg>
                </button>
                <span className={styles.monthYear}>{weekRangeLabel()}</span>
                <button type="button" className={styles.navBtn} onClick={handleNextWeek}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9,18 15,12 9,6" />
                    </svg>
                </button>
            </div>

            <div className={styles.gridWrap}>
                <div className={styles.weekdays}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                        <div key={day} className={styles.weekday}>{day}</div>
                    ))}
                </div>
                <div className={styles.days}>
                    {weekDays.map((date) => {
                        const key = dateKey(date);
                        const evts = groupedEvents[key] || [];
                        const today = isToday(date);
                        return (
                            <div key={key} className={`${styles.cell} ${styles.weekCell} ${today ? styles.today : ''}`}>
                                <div className={styles.cellHeader}>
                                    <span className={styles.dayNum}>{date.getDate()}</span>
                                </div>
                                <div className={styles.events}>
                                    {evts.map(ev => (
                                        <div key={ev.id} className={styles.eventPill}>
                                            <span className={styles.eventTitle}>{ev.title}</span>
                                            <button
                                                className={styles.deleteEvent}
                                                onClick={() => onDeleteEvent(ev.id)}
                                            >×</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default WeekView;
