// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PreviewGrid from './components/PreviewGrid';
import ShowDetails from './components/ShowDetails';
import Sidebar from './components/Sidebar';
import Favorites from './components/Favorites';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route exact path="/" element={<PreviewGrid />} />
            <Route path="/shows/:id" element={<ShowDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;