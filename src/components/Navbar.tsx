// src/pages/Alerts.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useWebSocket } from '../context/WebSocketContext';

interface NavbarProps {
    cryptoAlertsPath: string; // A prop típusa
}

const Navbar: React.FC<NavbarProps> = ({ cryptoAlertsPath }) => {
    const [isOpen, setIsOpen] = useState(false); // State for managing hamburger menu

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-customOrange shadow-lg py-4 px-6 md:px-12">
            <div className="container nav-container mx-auto grid-cols-3 grid gap-3 md:flex justify-between items-center">
                {/* Site Title */}
                <div className="flex-1 text-left">
                    <h2 className="title text-white text-base md:text-xl font-bold">
                        <a href={cryptoAlertsPath}>Crypto Alerts</a>
                    </h2>
                </div>
                {/* Web Socket Controls */}
                <div className="flex flex-1 justify-center">
                    <WebSocketControls />
                </div>
                {/* Hamburger Menu */}
                <div className="flex flex-1 justify-end md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none"
                    >
                        {isOpen ? '✖️' : '☰'}{' '}
                    </button>
                </div>
                {/* Navigation Links */}
                <div
                    className={`${
                        isOpen ? 'flex border-t border-t-white' : 'hidden'
                    } col-span-3 justify-center md:flex flex-1 md:justify-end pt-6 md:pt-0`}
                >
                    <ul className="flex flex-col md:flex-row gap-6">
                        <li className="text-center">
                            <NavLink
                                to={`${cryptoAlertsPath}/monitor`}
                                className={({ isActive }) =>
                                    `text-white ${
                                        isActive ? 'bg-gray-900' : ''
                                    } hover:bg-gray-600 px-5 py-3 rounded transition duration-300 ease-in-out`
                                }
                            >
                                Monitor
                            </NavLink>
                        </li>
                        <li className="text-center">
                            <NavLink
                                to={`${cryptoAlertsPath}/alerts`}
                                className={({ isActive }) =>
                                    `text-white ${
                                        isActive ? 'bg-gray-900' : ''
                                    } hover:bg-gray-600 px-5 py-3 rounded transition duration-300 ease-in-out`
                                }
                            >
                                Alerts
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

const WebSocketControls: React.FC = () => {
    const { isStreaming, startStream, stopStream } = useWebSocket();

    return (
        <div className="flex items-center gap-8">
            <button
                onClick={isStreaming ? stopStream : startStream}
                className={`w-32 py-3 rounded ${
                    isStreaming
                        ? 'bg-red-600 hover:bg-red-500'
                        : 'bg-green-600 hover:bg-green-500'
                } text-white`}
            >
                {isStreaming ? 'Stop Stream' : 'Start Stream'}
            </button>
        </div>
    );
};

export default Navbar;
