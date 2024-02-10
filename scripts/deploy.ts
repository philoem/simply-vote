import { ethers } from "hardhat";
const hre = require("hardhat");

async function main() {
  const voting = await ethers.deployContract("Voting");
  await voting.waitForDeployment();

  console.log(`Voting's smart contract deployed to : ${voting.target}`);
  hre.storageLayout.export();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });