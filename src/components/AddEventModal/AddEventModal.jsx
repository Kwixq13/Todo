
import React, { useState, useEffect } from 'react';
import styles from './AddEventModal.module.scss';

const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

function dateToInputString(date) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0')
  ].join('-');
}

function EventModal({ isOpen, onClose, onAdd }) {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState(dateToInputString(new Date()));
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEventTitle('');
      setEventDate(dateToInputString(new Date()));
      setErrMsg('');
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    const title = eventTitle.trim();
    if (!title) {
      setErrMsg('Title required');
      return;
    }
    setErrMsg('');
    const dateObj = eventDate ? new Date(eventDate + 'T00:00:00') : new Date();
    onAdd({ title, date: dateObj });
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Create event</h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formField}>
            <label htmlFor="event-title" className={styles.fieldLabel}>Title</label>
            <input
              id="event-title"
              type="text"
              className={styles.fieldInput}
              value={eventTitle}
              onChange={e => {
                setEventTitle(e.target.value);
                if (errMsg) setErrMsg('');
              }}
              autoFocus
            />
            {errMsg && <span className={styles.errorMsg}>{errMsg}</span>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="event-date" className={styles.fieldLabel}>Date</label>
            <div className={styles.dateFieldWrap}>
              <input
                id="event-date"
                type="date"
                className={styles.dateInput}
                value={eventDate}
                onChange={e => setEventDate(e.target.value)}
              />
              <span className={styles.iconCalendar}><IconCalendar /></span>
            </div>
          </div>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={!eventTitle.trim()}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default EventModal;
