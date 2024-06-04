import './App.css'
import Home from './components/Home'
import NavBar from './components/NavBar'
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Register from './components/Register'
function App() {

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login/:userType" element={<Login/>}/>
          <Route path="/register/:userType" element={<Register/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
