// src/pages/Monitor.tsx
import React, { useEffect, useState } from 'react';
import { useWebSocket } from '../context/WebSocketContext';

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
            <div className="border border-gray-700">
                <div className="flex justify-between p-4 bg-gray-900 font-bold border border-white">
                    <span>Price (USD)</span>
                    <span>Quantity</span>
                    <span>Total (USD)</span>
                </div>
                <div className="h-[50vh] sm:h-[75vh] xl:h-[63vh] overflow-auto stream-list">
                    {orders.length === 0 && !isFetching && (
                        <div className="flex justify-center items-center h-full">
                            <span className="text-lg text-gray-300 text-center">
                                Start streaming by clicking on the green button
                                above!
                            </span>
                        </div>
                    )}
                    {isFetching && (
                        <div className="flex justify-center items-center h-full">
                            <span className="text-lg text-gray-300">
                                Fetching...
                            </span>
                        </div>
                    )}
                    {orders.map((order, index) => (
                        <div
                            key={index}
                            className={`flex justify-between p-4 border-b border-gray-700 ${
                                order.SIDE === 0 ? 'bg-red-600' : 'bg-gray-800'
                            }`}
                        >
                            <div className="flex-1 text-left">
                                <span>{order.P.toFixed(2)}</span>
                            </div>
                            <div className="flex-1 text-center">
                                <span>{order.Q}</span>
                            </div>
                            <div className="flex-1 text-right">
                                <span>{(order.P * order.Q).toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Monitor;
