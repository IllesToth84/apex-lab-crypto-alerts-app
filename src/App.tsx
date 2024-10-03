// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { WebSocketProvider } from './context/WebSocketContext';
import Navbar from './components/Navbar';

import Main from './pages/Main';
import Monitor from './pages/Monitor';
import Alerts from './pages/Alerts';

const App: React.FC = () => {
    return (
        <WebSocketProvider>
            <Router>
                <Navbar />

                <div className="main-content container-fluid mx-auto">
                    <Routes>
                        <Route
                            path="/apex-lab-crypto-alerts-app"
                            element={<Main />}
                        />
                        <Route path="/monitor" element={<Monitor />} />
                        <Route path="/alerts" element={<Alerts />} />
                    </Routes>
                </div>
            </Router>
        </WebSocketProvider>
    );
};

export default App;
