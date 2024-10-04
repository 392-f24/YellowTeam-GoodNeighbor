import { useAuthState } from './utilities/firebase';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SignInPage from './SignIn.jsx';
import './App.css';

import Navbar from './components/Navigation';
import HomePage from './components/pages/HomePage';
import RequestsPage from './components/pages/RequestsPage';
import ProfilePage from './components/pages/ProfilePage';
import RequestForm from './components/RequestForm'; 

import AuthButton from './components/Buttons'; 

const App = () => {
  const [user, loading, error] = useAuthState(); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Handle error if authentication fails
  }

  return (
    <Router>
      <div className="App-header">
        {/* If user is authenticated, show Navbar and Routes, else show SignInPage */}
        {!user ? (
          <SignInPage />  // Show sign-in page if not authenticated
        ) : (
          <>
            <div className="flex-grow"> 
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/requests" element={<RequestsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/requestform" element={<RequestForm />} />

                
              </Routes>
            </div>
            <div>
              <Navbar /> 
            </div>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
