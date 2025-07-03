import './index.css'
import './discover.css'
import { useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
export default function Discover() {
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

const [searchTerm, setSearchTerm] = useState('');
const [data,setData] = useState([]);
 useEffect(()=>{
    setData(events)
 },[events])

 //adding data from localStorage
   useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setData(prevData => [...prevData, ...storedEvents]);
  }, []);

const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    // No need to manually show/hide cards here.
    // The filtering should be handled in the render by mapping over filteredEvents instead of events.
};

let filteredEvents;
if (searchTerm) {
    // Check if searchTerm matches any category in the data
    const categories = Array.from(new Set(events.map(event => event.category.toLowerCase())));
    const eventTypes = Array.from( new Set(events.map(event => event.eventType.toLowerCase())));
    if (categories.includes(searchTerm.toLowerCase())) {
        filteredEvents = data.filter(event =>
            event.category.toLowerCase().includes(searchTerm.toLowerCase())
        );

    }else if(eventTypes.includes(searchTerm.toLowerCase())){
        filteredEvents= data.filter(event=> event.eventType.toLowerCase().includes(searchTerm.toLowerCase())
    );
    }
     else if(searchTerm) {
        filteredEvents = data.filter(event =>
            event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
} else {
    filteredEvents = data;
}
//Toggle status
 const handleToggle = (id) => {
    const updated = filteredEvents.map((item) =>
      item.id === id
        ? { ...item, status: item.status === 'Attend' ? 'Cancel' : 'Attend' }
        : item
    );
      setData(updated);
 };


 return (
    <div className="discover">
        <h1>Discover Your Next Event</h1>
        <br></br>
        <h4>Explore workshops, meetups, and webinars happening near you and online. Use the filters to find the perfect event for you.</h4>
        <div className="filter">
            <input type='text' placeholder='Search by event title...' onChange={handleSearch}/>
            <div className="button">
                <button onClick={() => setSearchTerm('')}>All</button>
                <div className="button1">
                    <button onClick={() => setSearchTerm('Tech')}>Tech</button>
                    <button onClick={() => setSearchTerm('Acads')}>Acads</button>
                    <button onClick={() => setSearchTerm('Culture')}>Culture</button>
                    <button onClick={() => setSearchTerm('Sports')}>Sports</button>
                </div>   
            </div>
            <div className="button">
                <button onClick={() => setSearchTerm('')}>All types</button>
                <div className="button1">
                    <button onClick={()=>setSearchTerm('online')}>Online</button>
                    <button onClick={()=> setSearchTerm('offline')}>Offline</button>
                </div>  
            </div>
        </div>
        <div className="data">
           {filteredEvents.map((event)=>(
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
           ))}
        
        </div>
    </div>
  )
}


//loader-data
export const eventsloader = async () => {
    const res = await fetch('http://localhost:4000/events')
    return res.json()
};
