
import React, { useState, useMemo } from 'react';
import styles from './Calendar.module.scss';

function dateKey(date) {
    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()).padStart(2, '0')
    ].join('-');
}

function DayView({ events = [], onDeleteEvent }) {
    const [viewDate, setViewDate] = useState(new Date());

    const currentEvents = useMemo(() => {
        const key = dateKey(viewDate);
        return events.filter(ev => {
            const evKey = ev.date instanceof Date ? dateKey(ev.date) : ev.date;
            return evKey === key;
        });
    }, [events, viewDate]);

    const handlePrevDay = () => {
        const newDate = new Date(viewDate);
        newDate.setDate(viewDate.getDate() - 1);
        setViewDate(newDate);
    };

    const handleNextDay = () => {
        const newDate = new Date(viewDate);
        newDate.setDate(viewDate.getDate() + 1);
        setViewDate(newDate);
    };

    const formattedDate = viewDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className={styles.container}>
            <div className={styles.monthNav}>
                <button type="button" className={styles.navBtn} onClick={handlePrevDay}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15,18 9,12 15,6" />
                    </svg>
                </button>
                <span className={styles.monthYear}>{formattedDate}</span>
                <button type="button" className={styles.navBtn} onClick={handleNextDay}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9,18 15,12 9,6" />
                    </svg>
                </button>
            </div>

            <div className={styles.dayViewContent}>
                {currentEvents.length > 0 ? (
                    <div className={styles.dayEventsList}>
                        {currentEvents.map(ev => (
                            <div key={ev.id} className={styles.dayEventItem}>
                                <div className={styles.eventInfo}>
                                    <span className={styles.eventDot}></span>
                                    <span className={styles.dayEventTitle}>{ev.title}</span>
                                </div>
                                <button
                                    className={styles.deleteEventBtn}
                                    onClick={() => onDeleteEvent(ev.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.noEvents}>
                        <p>No events scheduled for this day</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DayView;
