import { useAuthState } from './utilities/firebase';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SignInPage from './components/pages/SignIn.jsx';
import './App.css';

import Navigationbar from './components/Navigation';
import HomePage from './components/pages/HomePage';
import RequestsPage from './components/pages/RequestsPage';
import ProfilePage from './components/pages/ProfilePage';
import RequestFormPage from './components/pages/RequestForm'; 
import Header from './components/Header';

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
      <div className="App">
        {/* If user is authenticated, show Header, Navbar, and Routes, else show SignInPage */}
        {!user ? (
          <SignInPage />  // Show sign-in page if not authenticated
        ) : (
          <>
            <Header />

            <div className="content flex-grow"> 
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/requests" element={<RequestsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/requestform" element={<RequestFormPage />} />
              </Routes>
            </div>

            <Navigationbar />
          </>
        )}        
      </div>
    </Router>
  );
};

export default App;
