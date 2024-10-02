import React from 'react';

const Main: React.FC = () => {
    return (
        <div className="pt-32 md:pt-48 px-10 flex flex-col justify-center text-white text-center">
            <h1 className="text-5xl mb-12 leading-snug">
                Welcome to the{' '}
                <span className="text-customOrange font-bold">
                    Crypto Alerts
                </span>{' '}
                system!
            </h1>
            <h3 className="text-[1.5rem] mb-6 text-customLightGreen italic">
                You can follow <b className="not-italic">Binance BTC/USDT</b>{' '}
                trading data live here.
            </h3>
            <p className="text-xl leading-9">
                Please navigate to the{' '}
                <a href="/monitor" className="text-customOrange font-bold">
                    "Monitor"
                </a>{' '}
                subpage and click <br></br>{' '}
                <span className="text-customLightGreen font-bold">
                    "Start Stream"
                </span>{' '}
                button to view the data.
            </p>
        </div>
    );
};

export default Main;
