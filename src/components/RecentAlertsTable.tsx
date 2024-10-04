import React from 'react';

interface Alert {
    alertMessage: string;
    price: number;
    quantity: number;
    total: number;
    timestamp: number;
}

interface RecentAlertsTableProps {
    alerts: Alert[];
    isFetching: boolean;
}

const RecentAlertsTable: React.FC<RecentAlertsTableProps> = ({
    alerts,
    isFetching,
}) => {
    return (
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
            <div className="h-[65vh] xl:h-[47.5vh] overflow-auto stream-list">
                {alerts.length === 0 && !isFetching && (
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
    );
};

export default RecentAlertsTable;
