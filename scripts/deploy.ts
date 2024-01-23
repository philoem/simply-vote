import { ethers } from "hardhat";

async function main() {
  const voting = await ethers.deployContract("Voting");
  await voting.waitForDeployment();

  console.log(`Voting's smart contract deployed to : ${voting.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });