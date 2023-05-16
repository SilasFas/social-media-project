import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar';

//Pages
import { Login } from './Pages/Login';
import { Home } from './Pages/Home';
import { CreatePost } from './Pages/create-post/CreatePost';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createpost' element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
