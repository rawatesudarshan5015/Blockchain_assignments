import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { WAVE_PORTAL_ADDRESS, contractABI } from '../utils/constants';
import WavePortalABI from '../WavePortal.json';

const WaveList = () => {
    const [waves, setWaves] = useState([]);

    const fetchWaves = async () => {
        try {
            if (!window.ethereum) {
                console.error("MetaMask is not installed.");
                return;
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const wavePortalContract = new ethers.Contract(
                WAVE_PORTAL_ADDRESS,
                WavePortalABI.abi,
                provider
            );

            const waves = await wavePortalContract.getAllWaves();
            setWaves(waves.map(wave => ({
                message: wave.message,
                address: wave.waver,
                timestamp: new Date(wave.timestamp.toNumber() * 1000).toLocaleString(),
            })));
        } catch (error) {
            console.error("Error fetching waves:", error);
        }
    };

    useEffect(() => {
        fetchWaves();
    }, []);

    return (
        <div>
            <h2>Wave Messages</h2>
            {waves.length > 0 ? (
                waves.map((wave, index) => (
                    <div key={index} style={{ border: '1px solid #ddd', margin: '10px 0', padding: '10px' }}>
                        <p><strong>Message:</strong> {wave.message}</p>
                        <p><strong>From:</strong> {wave.address}</p>
                        <p><strong>At:</strong> {wave.timestamp}</p>
                    </div>
                ))
            ) : (
                <p>No waves yet. Be the first to wave!</p>
            )}
        </div>
    );
};

export default WaveList;
