import React from 'react';
import styles from './Main.module.scss';
import Calendar from '../Calendar/Calendar';
import WeekView from '../Calendar/WeekView';
import DayView from '../Calendar/DayView';
import AddEventModal from '../AddEventModal/AddEventModal';

const AddIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="10" />
    <line x1="11" y1="6" x2="11" y2="16" />
    <line x1="6" y1="11" x2="16" y2="11" />
  </svg>
);

function MainSection({ events, activeView, isModalOpen, onOpenModal, onCloseModal, onAddEvent, onDeleteEvent }) {
  function getViewContent() {
    switch (activeView) {
      case 'month':
        return <Calendar events={events} onDeleteEvent={onDeleteEvent} />;
      case 'week':
        return <WeekView events={events} onDeleteEvent={onDeleteEvent} />;
      case 'day':
        return <DayView events={events} onDeleteEvent={onDeleteEvent} />;
      default:
        return (
          <div className={styles.placeholderView}>
            {activeView.charAt(0).toUpperCase() + activeView.slice(1)} view coming soon...
          </div>
        );
    }
  }

  return (
    <section className={styles.mainContainer}>
      {getViewContent()}
      <button
        type="button"
        className={styles.actionButton}
        onClick={onOpenModal}
        aria-label="Create event"
      >
        <AddIcon />
      </button>
      <AddEventModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        onAdd={onAddEvent}
      />
    </section>
  );
}

export default MainSection;
