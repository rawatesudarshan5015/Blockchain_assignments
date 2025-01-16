import React from "react";
import { connectWallet } from "../utils/ethereum";

const ConnectWalletButton = ({ setCurrentAccount }) => {
    const handleConnect = async () => {
        const account = await connectWallet();
        if (account) setCurrentAccount(account);
    };

    return (
        <button className="waveButton" onClick={handleConnect}>
            Connect Wallet
        </button>
    );
};

export default ConnectWalletButton;
