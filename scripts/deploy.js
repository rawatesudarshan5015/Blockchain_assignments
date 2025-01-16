async function main() {
    // Get the contract to deploy
    const WavePortal = await hre.ethers.getContractFactory("WavePortal");

    // Deploy the contract and log the transaction
    const wavePortal = await WavePortal.deploy();
    console.log("Deploying contract...");

    // Wait for the contract to be mined
    await wavePortal.deployTransaction.wait();

    // Now we know the contract is deployed, log the address
    console.log("WavePortal deployed to:", wavePortal.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
