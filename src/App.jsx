// App.jsx
import React, { useState } from 'react';
import Homepage from './pages/Homepage';
import Sidebar from './components/Sidebar';
import './App.css';

const App = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="App">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
                <Homepage />
            </div>
        </div>
    );
};

export default App;
