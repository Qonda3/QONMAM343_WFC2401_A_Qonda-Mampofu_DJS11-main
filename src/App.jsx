import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PreviewGrid from './components/PreviewGrid';
import ShowDetails from './components/ShowDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<PreviewGrid />} />
          <Route path="/shows/:id" element={<ShowDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;