import { ethers } from "hardhat";

async function main() {
  const voting = await ethers.deployContract("Voting", ['0xC1AEe6f2Af1974BA4cfC02c1306a5855427C4478']);
  await voting.waitForDeployment();

  console.log(`Voting's smart contract deployed to : ${voting.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });