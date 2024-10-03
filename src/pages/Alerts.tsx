import React, { useEffect, useState } from 'react';
import { useWebSocket } from '../context/WebSocketContext';
import AlertCounters from '../components/AlertCounters';
import RecentAlertsTable from '../components/RecentAlertsTable';

interface Alert {
    alertMessage: string;
    price: number;
    quantity: number;
    total: number;
    timestamp: number; // Add a timestamp field to the alert object
}

const Alerts: React.FC = () => {
    const { socket, isStreaming, startStream, isFetching, setIsFetching } =
        useWebSocket();
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
    }, [socket, isStreaming, startStream, isFetching, setIsFetching]);

    // Effect to check if the alerts list is empty and set loading accordingly
    useEffect(() => {
        if (alerts.length > 0) {
            setIsFetching(false); // Stop loading when the first alert appears
        }
    }, [alerts, setIsFetching]); // Include setIsFetching in the dependency arrays

    return (
        <div className="py-8 md:py-6 px-4 md:p-12 text-white">
            <h1 className="text-4xl text-center font-bold pb-8 md:pb-5 border-b-2 border-b-customOrange">
                Alerts
            </h1>

            {/* Alert Counters component */}
            <AlertCounters
                cheapOrderCount={cheapOrderCount}
                solidOrderCount={solidOrderCount}
                bigBiznisCount={bigBiznisCount}
            />

            {/* Recent Alerts Table component */}
            <RecentAlertsTable alerts={alerts} isFetching={isFetching} />
        </div>
    );
};

export default Alerts;
