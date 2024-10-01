import { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import './App.css';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <HashRouter>
    <div className="App">
      <header className="App-header">
        <Navigation/>
      </header>
    </div>
    </HashRouter>
  );
};

export default App;
