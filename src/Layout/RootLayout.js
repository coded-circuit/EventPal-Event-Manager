import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './rootlayout.css'
import { useEffect } from 'react';
export default function RootLayout() {
    const [dark,setDark] = useState(false);
// Toggle dark mode by updating the root element's data-theme attribute
// This assumes your CSS uses [data-theme="dark"] and [data-theme="light"] selectors
// to set variable values for dark and light modes.
// Example in CSS:
// :root { --bg: #fff; --text: #000; }
// [data-theme="dark"] { --bg: #181818; --text: #fff; }

// Update the data-theme attribute when dark changes

useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
}, [dark]);

return (
    <div className='root-layout'>
        <header>
            <div className='eventpal'>EventPal</div>
            <nav>
                <NavLink to= '/'>Discover</NavLink>
                <NavLink to = 'createEvents'>Create Event</NavLink>
                <NavLink  to = 'myEvents'>My Events</NavLink>
                <NavLink to = 'calendar'>Calendar</NavLink>
            </nav>
            <div className="mode">
                <button onClick={() => setDark(!dark)}>
                    {dark ? (
                        <svg width="40" height="40" fill="black" viewBox="0 0 25 25">
                            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke="orange" stroke-width="2.5" width="40" height="40">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1.5m0 15V21m9-9h-1.5M4.5 12H3m15.364-6.364l-1.061 1.061M6.697 17.303l-1.061 1.061m12.728 0l-1.061-1.061M6.697 6.697L5.636 5.636M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"/>
</svg>

                    )}
                </button>
            </div>
        </header>
        <main>
            <Outlet/>
        </main>
    </div>
)
}
