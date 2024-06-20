import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PreviewGrid from './components/PreviewGrid';
import ShowDetails from './components/ShowDetails';
import Sidebar from './components/Sidebar';
import Favorites from './components/Favorites';
import Login from './components/Login';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="flex">
                <Sidebar />
                <div className="flex-1">
                  <PreviewGrid />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/show/:id"
          element={
            <ProtectedRoute>
              <ShowDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;