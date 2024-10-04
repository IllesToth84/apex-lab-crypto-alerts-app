// src/components/MonitorTable.tsx
import React from 'react';

interface Order {
    P: number; // Price
    Q: number; // Quantity
    SIDE: number; // Side (0 = sell, 1 = buy)
}

interface MonitorTableProps {
    orders: Order[];
    isFetching: boolean;
}

const MonitorTable: React.FC<MonitorTableProps> = ({ orders, isFetching }) => {
    return (
        <div className="border border-gray-700">
            <div className="flex justify-between p-4 bg-gray-900 font-bold border border-white">
                <span>Price (USD)</span>
                <span>Quantity</span>
                <span>Total (USD)</span>
            </div>
            <div className="h-[75vh] xl:h-[63vh] overflow-auto stream-list">
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
    );
};

export default MonitorTable;
