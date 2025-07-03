
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './create-events.css'
export default function CreateEvents() {
  const navigate = useNavigate();

const [event,setEvent] = useState({eventName:'',date_time:'',desc:'',category :'',EventType:'',location:''})
const[events,setEvents] = useState([]);
const handleChange = (e)=>{
  const name =e.target.name;
  const value = e.target.value;
  setEvent({...event,[name]:value})

}
useEffect(() => {
  const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
  setEvents(storedEvents);
}, []);

const handleSubmit = (e)=>{
  
  e.preventDefault()
  if(event.eventName && event.date_time&& event.desc && event.category && event.eventType && event.location){
    const newEvent = {...event,id :  Date.now(),status : "Attend"}
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    //local storage
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    // console.log(newEvent);
    setEvent({eventName:'',date_time:'',desc:'',category :'',eventType:'',location:''})
      
    navigate('/');
  }
}






  return (
    <div className="create-event">
      <div className="form-details">
        <h2>Create a New Event</h2>
        <p>Fill out the form below to share your event with the community.</p>
        <form>
        <label htmlFor='eventName'>Event Title</label>
        <input type='text'id = 'eventName'name = 'eventName' value = {event.eventName} onChange={handleChange}/>
        <label htmlFor='date_time'>Date & Time</label>
        <input type='date' id='date_time' name = 'date_time' value={event.date_time} onChange={handleChange}/>
        <label htmlFor='desc'>Description</label>
        <textarea style={{ width: '97%', height: '120px', fontSize: '16px', padding: '10px' }} id='desc' name = 'desc' value = {event.desc} onChange={handleChange}/>
        <div>
          <div>
            <label htmlFor='category'>Category</label>
            <select id="category" name="category" value={event.category}onChange={handleChange}>
              <option value="">Category</option>
              <option value="Tech">Tech</option>
              <option value="Culture">Culture</option>
              <option value="Sports">Sports</option>
              <option value="Acads">Acads</option>
            </select>
          </div>
          <div>
            <label htmlFor='eventType'>Event Type</label>
            <select id="eventType" name="eventType" value={event.eventType} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Offline">Offline</option>
              <option value="Online">Online</option>
            </select>
          </div>
        </div>
        <label htmlFor='location'>Location/URL</label>
        <input type= 'text' placeholder='eg. Lecture Hall,New Sac,etc.' id ='location' name='location' value={event.location} onChange={handleChange}/>
        <button onClick={handleSubmit}>Create Event</button>
        </form>
      </div>
        
    </div>
  )
}




