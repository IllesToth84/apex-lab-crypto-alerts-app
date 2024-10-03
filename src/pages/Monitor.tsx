// src/pages/Monitor.tsx
import React, { useEffect, useState } from 'react';
import { useWebSocket } from '../context/WebSocketContext';
import MonitorTable from '../components/MonitorTable';

const Monitor: React.FC = () => {
    const { socket, isFetching, setIsFetching } = useWebSocket();
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        if (socket) {
            let buffer: any[] = [];

            const handleSocketMessage = (event: MessageEvent) => {
                const message = JSON.parse(event.data);

                if (message.TYPE === '8') {
                    buffer.push(message);

                    // Limit the size of the buffer
                    if (buffer.length > 500) {
                        buffer = buffer.slice(-500);
                    }
                }
            };

            socket.addEventListener('message', handleSocketMessage);

            // Update the orders every 500 ms
            const intervalId = setInterval(() => {
                if (buffer.length > 0) {
                    setOrders((prevOrders) =>
                        [...prevOrders, ...buffer].slice(-500)
                    );
                    buffer = []; // Clear the buffer after each update
                }
            }, 500); // Update the state every 500 ms

            return () => {
                clearInterval(intervalId);
                socket.removeEventListener('message', handleSocketMessage);
            };
        }
    }, [socket]);

    // Effect to check if the orders list is empty and set loading accordingly
    useEffect(() => {
        if (orders.length > 0) {
            setIsFetching(false); // Stop loading when the first order appears
        }
    }, [orders, setIsFetching]); // Include setIsFetching in the dependency arrays

    return (
        <div className="py-8 md:py-6 px-4 md:p-12 text-white">
            <h1 className="text-4xl text-center font-bold pb-8 md:pb-5">
                Live Binance Orders
            </h1>
            {/* MonitorTable component */}
            <MonitorTable orders={orders} isFetching={isFetching} />
        </div>
    );
};

export default Monitor;
