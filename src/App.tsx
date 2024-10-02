// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { WebSocketProvider } from './WebSocketContext';
import Nav from './components/Nav';

import Main from './pages/Main';
import Monitor from './pages/Monitor';
import Alerts from './pages/Alerts';

const App: React.FC = () => {
    return (
        <WebSocketProvider>
            <Router>
                <Nav />

                <div className="main-content container-fluid mx-auto">
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/monitor" element={<Monitor />} />
                        <Route path="/alerts" element={<Alerts />} />
                    </Routes>
                </div>
            </Router>
        </WebSocketProvider>
    );
};

export default App;
