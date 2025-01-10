const hre = require("hardhat");

async function main() {
  // Deploy ArtBlockNFT
  const ArtBlockNFT = await hre.ethers.getContractFactory("ArtBlockNFT");
  const artBlockNFT = await ArtBlockNFT.deploy();
  await artBlockNFT.waitForDeployment();

  const address = await artBlockNFT.getAddress();
  console.log("ArtBlockNFT deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});