// src/App.jsx
import React from 'react';
import PreviewGrid from './components/PreviewGrid';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Podcast Previews</h1>
      </header>
      <main>
        <PreviewGrid />
      </main>
    </div>
  );
}

export default App;