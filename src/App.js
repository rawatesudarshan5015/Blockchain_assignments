import React, { useState } from 'react';
import { ethers } from 'ethers';
import WavePortalABI from './WavePortal.json';
import { WAVE_PORTAL_ADDRESS } from './utils/constants';
import WaveList from './components/WaveList';


const App = () => {
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false); // Track transaction status
    const [error, setError] = useState(null); // Track errors

    const sendWave = async () => {
        if (!window.ethereum) {
            setError("MetaMask is not installed. Please install MetaMask and try again.");
            return;
        }

        if (!message.trim()) {
            setError("Message cannot be empty.");
            return;
        }

        setError(null);
        setIsSending(true);

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const wavePortalContract = new ethers.Contract(
                WAVE_PORTAL_ADDRESS,
                WavePortalABI.abi,
                signer
            );

            console.log("Sending wave...");
            const waveTxn = await wavePortalContract.wave(message);
            console.log("Mining...", waveTxn.hash);
            await waveTxn.wait();
            console.log("Mined -- ", waveTxn.hash);

            setMessage(""); // Clear the message field
        } catch (error) {
            console.error("Error sending wave:", error);
            setError("Failed to send wave. Please try again.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Wave at Me!</h1>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your wave message"
                rows={3}
                cols={30}
                disabled={isSending}
                style={{
                    padding: "10px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                    width: "100%",
                    maxWidth: "400px",
                }}
            />
            <br />
            <button
                onClick={sendWave}
                disabled={isSending}
                style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    backgroundColor: isSending ? "#ddd" : "#007BFF",
                    color: "white",
                    border: "none",
                    cursor: isSending ? "not-allowed" : "pointer",
                }}
            >
                {isSending ? "Sending..." : "Send Wave"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <WaveList />
        </div>
    );
};

export default App;
