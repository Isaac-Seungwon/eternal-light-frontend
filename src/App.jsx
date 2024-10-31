// App.jsx
import Header from './components/Header';
import Homepage from './pages/Homepage';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <Header title="My Scheduling App" />
            <Homepage />
        </div>
    );
};

export default App;
