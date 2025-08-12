import React, { useState, useEffect } from 'react';

// The WebSocket URL from your server
const WEBSOCKET_URL = 'ws://localhost:5000';

function ArduinoDataViewer() {
    // State to store the latest data from the Arduino
    const [arduinoData, setArduinoData] = useState({});
    // State to track the connection status
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        console.log('Attempting to connect to WebSocket...');
        
        // Create a new WebSocket instance
        const ws = new WebSocket(WEBSOCKET_URL);

        // Define event handlers
        ws.onopen = () => {
            console.log('✅ WebSocket connection established');
            setIsConnected(true);
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setArduinoData(data);
            } catch (error) {
                console.error('Error parsing JSON from WebSocket:', error);
            }
        };

        ws.onclose = () => {
            console.log('❌ WebSocket connection closed');
            setIsConnected(false);
        };

        ws.onerror = (error) => {
            console.error('WebSocket Error:', error);
            setIsConnected(false);
        };

        // --- Cleanup function ---
        // This function is returned from useEffect and runs when the component unmounts.
        // It's crucial for closing the connection and preventing memory leaks.
        return () => {
            console.log('Closing WebSocket connection...');
            ws.close();
        };

    }, []); // The empty dependency array [] ensures this effect runs only once when the component mounts

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Arduino Real-Time Data</h1>
            <p>
                <strong>Status: </strong>
                {isConnected ? (
                    <span style={{ color: 'green' }}>Connected</span>
                ) : (
                    <span style={{ color: 'red' }}>Disconnected</span>
                )}
            </p>
            <h3>Live Data:</h3>
            <pre style={{ backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '5px' }}>
                <code>
                    {Object.keys(arduinoData).length > 0
                        ? JSON.stringify(arduinoData, null, 2)
                        : 'Waiting for data...'
                    }
                </code>
            </pre>
        </div>
    );
}

export default ArduinoDataViewer;