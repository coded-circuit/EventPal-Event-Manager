import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'
import RootLayout from './Layout/RootLayout';
import Discover, { eventsloader } from './Pages/Discover';
import CreateEvents from './Pages/CreateEvents';
import Calendar from './Pages/Calendar';
import MyEvents from './Pages/MyEvents';
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path ='/' element = {<RootLayout/>} >
        <Route index element={<Discover/>} loader={eventsloader} />
        <Route path ='createEvents' element={<CreateEvents/>}  />
        <Route path ='myEvents' element={<MyEvents/>} loader={eventsloader} />
        <Route path ='calendar' element={<Calendar/>} />
      </Route>
    )
  )
  return (
    <div className="App">
      <RouterProvider router = {router}/>
    </div>
  );
}

export default App;
