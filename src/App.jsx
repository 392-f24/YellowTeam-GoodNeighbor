import { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navigation from './components/Navigation.jsx';
import SignInPage from './SignIn.jsx';
import './App.css';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <HashRouter>
    <div className="App">
      <header className="App-header">
        <SignInPage/>
      </header>
    </div>
    </HashRouter>
  );
};

export default App;
