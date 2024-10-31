// App.jsx
import React, { useState } from 'react';
import Homepage from './pages/Homepage';
import Quickmenu from './components/Quickmenu';
import './App.css';

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="App">
            <Homepage />
            <Quickmenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
    );
};

export default App;
