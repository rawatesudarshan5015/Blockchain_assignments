// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WavePortal {
    // Struct to store details of a wave
    struct Wave {
        address waver;    // Address of the user who waved
        string message;   // Message sent with the wave
        uint256 timestamp; // Timestamp when the wave was sent
    }

    // Array to store all waves
    Wave[] public waves;

    // Event to emit when a new wave is received
    event NewWave(address indexed from, string message, uint256 timestamp);

    // Function to send a wave
    function wave(string memory _message) public {
        // Store the wave details in the array
        waves.push(Wave(msg.sender, _message, block.timestamp));

        // Emit the NewWave event
        emit NewWave(msg.sender, _message, block.timestamp);
    }

    // Function to get the total number of waves
    function getTotalWaves() public view returns (uint256) {
        return waves.length;
    }

    // Function to get all waves
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
}
