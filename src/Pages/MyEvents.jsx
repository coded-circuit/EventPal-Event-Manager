import './my-events.css'
import { useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
export default function MyEvents() {
   const events = useLoaderData();
const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-IN", {
    weekday: "long",   // e.g., Saturday
    day: "numeric",    // e.g., 5
    month: "long",     // e.g., July
    year: "numeric",   // e.g., 2025
    hour: "numeric",   // e.g., 2
    minute: "2-digit", // e.g., 30
    hour12: true       // 12-hour format (like 2:30 PM)
  });
};
const [data,setData] = useState([]);
 useEffect(()=>{
    setData(events)
 },[events])

 //adding data from localStorage
   useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setData(prevData => [...prevData, ...storedEvents]);
  }, []);
//Toggle status
 const handleToggle = (id) => {
    const updated = data.map((item) =>
      item.id === id
        ? { ...item, status: item.status === 'Attend' ? 'Cancel' : 'Attend' }
        : item
    );
      setData(updated);
 };


  const cancelledEvents = data.filter(event => event.status === 'Cancel');

  return (
    <div className='my-events'>
        <h1>My Saved Events</h1>
        <h4>Here are the events you've bookmarked or plan to attend.</h4>
        <div className="data">
          {cancelledEvents.length === 0 ? (
            <div className='error'>You haven't saved any events yet. Go discover some!</div>
          ) : (
            cancelledEvents.map((event) => (
              <div className="card" key={event.id}>
                  <div className="main">
                      <p>{event.category}-{event.eventType}</p> 
                      <h6>{event.eventName}</h6>
                      <p>{formatDateTime(event.date_time)}</p>
                      <p>{event.location}</p>
                      <div>{event.desc}</div>
                  </div>
                  <div className="attend">
                      <button onClick={() => handleToggle(event.id)} className={event.status === 'Attend' ? 'attend-btn' : 'cancel-btn'}  style={{
                        padding: '8px',
                        backgroundColor: event.status === 'Attend' ? 'var(--bg-primary)' : '#dc3545',
                        color: 'var(--text-primary)',
                        fontSize:'16px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}>{event.status}</button>
                  </div>
              </div>
            ))
          )}
        </div>
    </div>
  )
}
//loader-data
export const eventsloader = async () => {
    const res = await fetch('http://localhost:4000/events')
    return res.json()
};
