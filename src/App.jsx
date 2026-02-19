import { useState } from 'react'
import "./styles/generalStyle.scss"
import Main from './components/Main/Main'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function App() {
  // тестовые события для примера
  const [events, setEvents] = useState([
    { id: '1', title: 'hfgdh', date: new Date(2026, 1, 12) },
    { id: '2', title: 'home', date: new Date(2026, 1, 12) },
  ])
  const [isModalOpen, setModalOpen] = useState(false)
  const [activeView, setActiveView] = useState('month')

  const handleAddEvent = ({ title, date }) => {
    const newEvent = {
      id: Date.now().toString(),
      title: title,
      date: date
    }
    setEvents([...events, newEvent])
  }

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id))
  }

  return (
    <>
      <Header activeView={activeView} onViewChange={setActiveView} />
      <Main
        events={events}
        activeView={activeView}
        isModalOpen={isModalOpen}
        onOpenModal={() => setModalOpen(true)}
        onCloseModal={() => setModalOpen(false)}
        onAddEvent={handleAddEvent}
        onDeleteEvent={handleDeleteEvent}
      />
      <Footer />
    </>
  )
}

export default App
