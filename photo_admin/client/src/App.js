import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/layouts/Header';
import NavBar from './components/layouts/NavBar';
import Footer from './components/layouts/Footer';
import Snaps from './components/Snaps';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AddSnap from './components/AddSnap';
import Snap from './components/Snap';
import EditSnap from './components/EditSnap';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4080/snaps')
      .then((res) => setPosts(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Snaps posts={posts} />} />
        <Route path="/snap/:id" element={ <Snap /> }/>
        <Route path="/update/:id" element={<EditSnap />}/>
        <Route path="/add-snap" element={<AddSnap />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
