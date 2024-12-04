import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FamilyProvider } from './context/FamilyContext';
import { Navigation } from './components/Navigation';
import { ManageFamilies } from './pages/ManageFamilies';
import { SendInvitations } from './pages/SendInvitations';

function App() {
  return (
    <Router>
      <FamilyProvider>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <Routes>
            <Route path="/" element={<ManageFamilies />} />
            <Route path="/invitations" element={<SendInvitations />} />
          </Routes>
        </div>
      </FamilyProvider>
    </Router>
  );
}

export default App;