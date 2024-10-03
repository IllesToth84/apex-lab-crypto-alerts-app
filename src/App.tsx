// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { WebSocketProvider } from './context/WebSocketContext';
import Navbar from './components/Navbar';

import Main from './pages/Main';
import Monitor from './pages/Monitor';
import Alerts from './pages/Alerts';

const App: React.FC = () => {
    const apexLabCryptoAlertsPath = '/apex-lab-crypto-alerts-app';

    return (
        <WebSocketProvider>
            <Router>
                <Navbar cryptoAlertsPath={apexLabCryptoAlertsPath} />

                <div className="main-content container-fluid mx-auto">
                    <Routes>
                        <Route
                            path={apexLabCryptoAlertsPath}
                            element={<Main />}
                        />
                        <Route
                            path={`${apexLabCryptoAlertsPath}/monitor`}
                            element={<Monitor />}
                        />
                        <Route
                            path={`${apexLabCryptoAlertsPath}/alerts`}
                            element={<Alerts />}
                        />
                    </Routes>
                </div>
            </Router>
        </WebSocketProvider>
    );
};

export default App;
