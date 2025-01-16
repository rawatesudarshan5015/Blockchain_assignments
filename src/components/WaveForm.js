import React, { useState } from "react";
import { wave } from "../utils/ethereum";


const WaveForm = ({ currentAccount, setWaves }) => {
    const [message, setMessage] = useState("");

    const handleWave = async () => {
        const waveData = await wave(currentAccount, message);
        if (waveData) setWaves((prev) => [waveData, ...prev]);
        setMessage("");
    };

    return (
        <div>
            <textarea
                placeholder="Your wave message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button className="waveButton" onClick={handleWave}>
                Wave at Me
            </button>
        </div>
    );
};

export default WaveForm;
