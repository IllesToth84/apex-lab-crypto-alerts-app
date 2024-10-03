import React from 'react';

interface AlertCountersProps {
    cheapOrderCount: number;
    solidOrderCount: number;
    bigBiznisCount: number;
}

const AlertCounters: React.FC<AlertCountersProps> = ({
    cheapOrderCount,
    solidOrderCount,
    bigBiznisCount,
}) => {
    return (
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
    );
};

export default AlertCounters;
