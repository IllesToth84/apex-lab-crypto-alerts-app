import React, { useEffect, useState } from 'react';
import { useWebSocket } from '../context/WebSocketContext';

interface Alert {
    alertMessage: string;
    price: number;
    quantity: number;
    total: number;
    timestamp: number; // Add a timestamp field to the alert object
}

const AlertsPage: React.FC = () => {
    const { socket, isStreaming, startStream, setIsFetching } = useWebSocket();
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [cheapOrderCount, setCheapOrderCount] = useState(0);
    const [solidOrderCount, setSolidOrderCount] = useState(0);
    const [bigBiznisCount, setBigBiznisCount] = useState(0);

    useEffect(() => {
        const alertBuffer: Alert[] = [];

        const handleWebSocketMessage = (event: MessageEvent) => {
            const message = JSON.parse(event.data);

            if (message.TYPE === '8') {
                const price = parseFloat(message.P);
                const quantity = parseFloat(message.Q);
                const total = price * quantity;

                let alertMessage = '';

                if (price < 50000) {
                    alertMessage = 'Cheap order';
                    setCheapOrderCount((prev) => prev + 1);
                } else if (quantity > 10) {
                    alertMessage = 'Solid order';
                    setSolidOrderCount((prev) => prev + 1);
                } else if (total > 1000000) {
                    alertMessage = 'Big biznis here';
                    setBigBiznisCount((prev) => prev + 1);
                }

                if (alertMessage) {
                    const newAlert: Alert = {
                        alertMessage,
                        price,
                        quantity,
                        total,
                        timestamp: Date.now(),
                    };

                    alertBuffer.push(newAlert);

                    // Only show alerts from the last 1 minute
                    const now = Date.now();
                    const recentAlerts = alertBuffer.filter(
                        (alert) => now - alert.timestamp < 60000
                    );
                    setAlerts(recentAlerts);
                }
            }
        };

        if (socket) {
            socket.addEventListener('message', handleWebSocketMessage);
        }

        return () => {
            if (socket) {
                socket.removeEventListener('message', handleWebSocketMessage);
            }
        };
    }, [socket, isStreaming, startStream, setIsFetching]);

    return (
        <div className="py-8 md:py-6 px-4 md:p-12 text-white">
            <h1 className="text-4xl text-center font-bold pb-8 md:pb-5 border-b-2 border-b-customOrange">
                Alerts
            </h1>

            {/* Alert Counters */}
            <div className="grid grid-cols-3 gap-4 mb-2">
                <div className="bg-gray-900 p-3 md:p-5 text-center rounded flex flex-col justify-between">
                    <h2 className="font-bold mb-3 md:mb-0">Cheap Orders</h2>
                    <span className="text-3xl text-green-600">
                        {cheapOrderCount}
                    </span>
                </div>
                <div className="bg-gray-900 p-3 md:p-5 text-center rounded flex flex-col justify-between">
                    <h2 className="font-bold mb-3 md:mb-0">Solid Orders</h2>
                    <span className="text-3xl text-green-600">
                        {solidOrderCount}
                    </span>
                </div>
                <div className="bg-gray-900 p-3 md:p-5 text-center rounded flex flex-col justify-between">
                    <h2 className="font-bold mb-3 md:mb-0">Big Biznis</h2>
                    <span className="text-3xl text-green-600">
                        {bigBiznisCount}
                    </span>
                </div>
            </div>

            {/* Recent Alerts Table */}
            <div className="border border-gray-700">
                <div className="stream-header flex p-4 bg-gray-900 font-bold border border-white">
                    <div className="flex-1 text-left">
                        <span>Alert Message</span>
                    </div>
                    <div className="flex-1 text-center">
                        <span>Price (USD)</span>
                    </div>
                    <div className="flex-1 text-center">
                        <span>Quantity</span>
                    </div>
                    <div className="flex-1 text-right">
                        <span>Total (USD)</span>
                    </div>
                </div>
                <div className="h-[40vh] sm:h-[65vh] xl:h-[47.5vh] overflow-auto stream-list">
                    {alerts.map((alert, index) => (
                        <div
                            key={index}
                            className="stream-row flex p-4 border-b border-gray-700 bg-gray-800"
                        >
                            <div className="flex-1 text-left">
                                <span>{alert.alertMessage}</span>
                            </div>
                            <div className="flex-1 text-center">
                                <span>{alert.price.toFixed(2)}</span>
                            </div>
                            <div className="flex-1 text-center">
                                <span>{alert.quantity.toFixed(2)}</span>
                            </div>
                            <div className="flex-1 text-right">
                                <span>{alert.total.toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AlertsPage;
