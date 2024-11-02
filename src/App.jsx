// App.jsx
import Header from './components/Header';
import HomePage from './pages/HomePage';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <Header title="Eternal Light" />
            <HomePage />
        </div>
    );
};

export default App;
