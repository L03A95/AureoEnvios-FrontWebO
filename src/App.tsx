import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';
import refresh from './services/refresh';
import Profile from './components/Profile';

// Creamos la store con los parámetros adecuados :)
const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
  refresh: refresh
});

function App() {
  return (
    <Router>
      {/* TODA LA APLICACIÓN AHORA ESTÁ CUBIERTA POR REACT AUTH KIT */}
      <AuthProvider store={store}>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login/:userType" element={<Login/>}/>
            <Route path="/register/:userType" element={<Register/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App;