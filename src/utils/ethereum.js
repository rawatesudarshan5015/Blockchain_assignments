import { ethers } from "ethers";

// Constants
const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const CONTRACT_ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "message",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "NewWave",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "getAllWaves",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "waver",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "message",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct WavePortal.Wave[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTotalWaves",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_message",
          "type": "string"
        }
      ],
      "name": "wave",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "waves",
      "outputs": [
        {
          "internalType": "address",
          "name": "waver",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "message",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

// Get the Contract instance
export const getContract = async () => {
  try {
    // Check if the Ethereum provider is available
    if (!window.ethereum) {
      console.error("Ethereum provider not found!");
      return null;
    }

    // Create a provider and signer
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Return the contract instance
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    return contract;
  } catch (error) {
    console.error("Error getting contract instance:", error);
    return null;
  }
};

// Check if a wallet is connected
export const checkIfWalletIsConnected = async () => {
  try {
    if (!window.ethereum) {
      console.error("No Ethereum provider detected.");
      return false;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    if (accounts.length === 0) {
      console.log("No connected accounts.");
      return false;
    }

    console.log("Wallet is connected:", accounts[0]);
    return true;
  } catch (error) {
    console.error("Error checking wallet connection:", error);
    return false;
  }
};

// Connect wallet
export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return null;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    console.log("Connected account:", accounts[0]);
    return accounts[0];
  } catch (error) {
    console.error("Error connecting wallet:", error);
    return null;
  }
};

// Get all waves (example function, update as per your contract logic)
export const getAllWaves = async () => {
  try {
    const contract = await getContract();
    if (!contract) return [];

    const waves = await contract.getAllWaves(); // Adjust based on your contract's method
    console.log("Fetched waves:", waves);
    return waves;
  } catch (error) {
    console.error("Error fetching waves:", error);
    return [];
  }
};

// Wave function (example function, update as per your contract logic)
export const wave = async (message) => {
  try {
    const contract = await getContract();
    if (!contract) return false;

    const tx = await contract.wave(message); // Adjust based on your contract's method
    console.log("Transaction sent:", tx);
    await tx.wait(); // Wait for transaction confirmation
    console.log("Transaction confirmed:", tx);
    return true;
  } catch (error) {
    console.error("Error waving:", error);
    return false;
  }
};
