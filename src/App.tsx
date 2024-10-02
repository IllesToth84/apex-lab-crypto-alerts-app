// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { WebSocketProvider, useWebSocket } from './WebSocketContext';
import { NavLink } from 'react-router-dom';
import Monitor from './pages/Monitor';
import Alerts from './pages/Alerts';
import './App.css';

const WebSocketControls: React.FC = () => {
    const { isStreaming, startStream, stopStream } = useWebSocket();

    return (
        <div className="flex items-center gap-8">
            <button
                onClick={isStreaming ? stopStream : startStream}
                className={`px-4 py-2 rounded ${
                    isStreaming ? 'bg-red-500' : 'bg-green-500'
                } text-white`}
            >
                {isStreaming ? 'Stop Stream' : 'Start Stream'}
            </button>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <WebSocketProvider>
            <Router>
                <nav className="bg-customOrange shadow-lg py-4 px-12">
                    <div className="container mx-auto flex justify-between items-center">
                        <h2 className="title text-white text-xl font-bold">
                            <a href="/"> Crypto Alerts</a>
                        </h2>
                        <WebSocketControls />
                        <ul className="flex space-x-4">
                            <li>
                                <NavLink
                                    to="/monitor"
                                    className={({ isActive }) =>
                                        `text-white ${
                                            isActive
                                                ? 'bg-gray-900'
                                                : 'hover:bg-gray-600'
                                        } px-5 py-3 rounded transition duration-300 ease-in-out`
                                    }
                                >
                                    Monitor
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/alerts"
                                    className={({ isActive }) =>
                                        `text-white ${
                                            isActive
                                                ? 'bg-gray-900'
                                                : 'hover:bg-gray-600'
                                        } px-5 py-3 rounded transition duration-300 ease-in-out`
                                    }
                                >
                                    Alerts
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="main-content container-fluid mx-auto">
                    <Routes>
                        <Route path="/monitor" element={<Monitor />} />
                        <Route path="/alerts" element={<Alerts />} />
                    </Routes>
                </div>
            </Router>
        </WebSocketProvider>
    );
};

export default App;
