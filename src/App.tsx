import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Monitor from './pages/Monitor';
import Alerts from './pages/Alerts';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <nav className="bg-customOrange shadow-lg py-4 px-12">
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="title text-customLightGreen text-xl font-bold">
                            Crypto Alerts
                        </h1>
                    </div>
                    <ul className="flex space-x-6">
                        <li>
                            <Link
                                to="/"
                                className="text-customBlue hover:bg-customBlue hover:text-customLightGreen px-5 py-3 rounded transition duration-300 ease-in-out"
                            >
                                Monitor
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/alerts"
                                className="text-customBlue hover:bg-customBlue hover:text-customLightGreen px-5 py-3 rounded transition duration-300 ease-in-out"
                            >
                                Alerts
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container mx-auto">
                <Routes>
                    <Route path="/" element={<Monitor />} />
                    <Route path="/alerts" element={<Alerts />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
