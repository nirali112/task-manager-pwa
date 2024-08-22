import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import Login from './pages/Login';
import Register from './pages/Register';
import EditTask from './pages/EditTask';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit-task/:id" element={<EditTask />} />     
      </Routes>
    </Router>
  );
} 

export default App;