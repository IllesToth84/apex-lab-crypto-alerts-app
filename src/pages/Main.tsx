import React from 'react';

const Main: React.FC = () => {
    return (
        <div className="pt-12 md:pt-36 px-10 flex flex-col justify-center text-white text-center">
            <h1 className="text-5xl mb-12 leading-snug">
                Welcome to the{' '}
                <span className="text-customOrange font-bold">
                    Crypto Alerts
                </span>{' '}
                system!
            </h1>
            <h3 className="text-[1.5rem] mb-12 text-customLightGreen italic">
                You can follow Binance BTC/USDT trading data live here.
            </h3>
            <p className="text-xl leading-9 mb-4">
                Please click the{' '}
                <span className="text-customLightGreen font-bold">
                    "Start Stream"
                </span>{' '}
                button to start streaming<br></br>
                and navigate to the{' '}
                <a href="/monitor" className="text-green-600 font-bold">
                    "Monitor"
                </a>{' '}
                page to view the data.
            </p>
            <p className="text-xl leading-9">
                On the{' '}
                <a href="/alerts" className="text-red-500 font-bold">
                    "Alerts"
                </a>{' '}
                subpage, you can see real-time alerts <br></br> for important
                trading events.
            </p>
        </div>
    );
};

export default Main;
