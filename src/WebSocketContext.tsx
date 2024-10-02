import React, { createContext, useContext, useEffect, useState } from 'react';

interface WebSocketContextType {
    socket: WebSocket | null;
    isStreaming: boolean;
    startStream: () => void;
    stopStream: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
    undefined
);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isStreaming, setIsStreaming] = useState(false);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const API_KEY = process.env.REACT_APP_API_KEY;

    const startStream = () => {
        // Close existing socket if already streaming
        if (isStreaming && socket) {
            console.log('Closing existing socket...');
            stopStream(); // Ensure the current connection is closed
        }

        const newSocket = new WebSocket(
            `wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`
        );

        newSocket.onopen = () => {
            console.log('WebSocket connected');

            newSocket.send(
                JSON.stringify({
                    action: 'SubAdd',
                    subs: ['8~Binance~BTC~USDT'],
                })
            );
            setIsStreaming(true); // Set isStreaming to true after connection is established
        };

        newSocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
        };

        newSocket.onclose = (event) => {
            console.log('WebSocket closed with code:', event.code);
            setIsStreaming(false);
            setSocket(null); // Ensure socket state is reset
        };

        newSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        setSocket(newSocket);
    };

    const stopStream = () => {
        if (isStreaming && socket) {
            console.log('WebSocket connection closing...'); // Log closure
            socket.close(); // Close the socket
        }
    };

    useEffect(() => {
        return () => {
            stopStream(); // Clean up by stopping the stream when unmounting
        };
    }, []);

    return (
        <WebSocketContext.Provider
            value={{ socket, isStreaming, startStream, stopStream }}
        >
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
