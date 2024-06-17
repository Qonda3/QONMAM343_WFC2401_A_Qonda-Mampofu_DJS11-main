import React from 'react';
import PreviewGrid from './components/PreviewGrid';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className="App">
      <Navbar /> 
      <main>
        <PreviewGrid />
      </main>
    </div>
  );
}