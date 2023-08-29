import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Route, Routes, Navigate } from "react-router-dom";

import Home from './pages/Home';
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      
      </Routes>
    </div>
  );
}

export default App;
