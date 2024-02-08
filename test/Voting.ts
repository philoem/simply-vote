import { ethers } from 'hardhat';
import { expect } from 'chai';

describe("Voting", function () {
  let owner: any;
  let otherAccount: any;

  // beforeEach(async function () {
  //   [owner, otherAccount] = await ethers.getSigners();
  // });

  it("Should create a new voting proposal with the specified details", async () =>{
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();

    const title = "Test Vote";
    const description = "Test Description";
    const startsAt = 1707419520000;
    const endsAt = 1707419700000;
    const link1 = "https://example.com/link1";
    const link2 = "https://example.com/link2";
    await voting.createVote(title, description, startsAt, endsAt, link1, link2);

    await expect(voting.createVote("", description, startsAt, endsAt, link1, link2)).to.be.revertedWithCustomError(voting, "TitleEmptyError");
    await expect(voting.createVote(title, "", startsAt, endsAt, link1, link2)).to.be.revertedWithCustomError(voting, "DescriptionEmptyError");
    await expect(voting.createVote(title, description, startsAt, 0, link1, link2)).to.be.revertedWithCustomError(voting, "InvalidStartEndTimesError");
  });

  it("Should get the details of a specific vote", async () => {
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();
    
    await voting.createVote("Title", "Description", 1707419520000, 1707419700000, "link1", "link2");
    const voteDetails = await voting.getDetailsVote(1);
    expect(voteDetails.title).to.equal("Title");
    expect(voteDetails.description).to.equal("Description");
  });

  it("Should update the details of a specific vote", async function () {
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();
    await voting.createVote("Title", "Description", 1707419520000, 1707419700000, "link1", "link2");
    
    await voting.updateVote(1, "New Title", "New Description", 1707419520000, 1707419700000, "newLink1", "newLink2");
    const updatedDetails = await voting.getDetailsVote(1);
    expect(updatedDetails.title).to.equal("New Title");
    expect(updatedDetails.description).to.equal("New Description");
  });

  it("Should register a vote for a specific proposal", async function () {
    const Voting = await ethers.getContractFactory("Voting");
    [owner] = await ethers.getSigners();
    const voting = await Voting.deploy();
    await voting.createVote("Title", "Description", 1707419520000, 1707999999999, "link1", "link2");
    console.log('voting :>> ', voting);

    await voting.vote(1, 1, voting.target);
    // await expect(voting.proposals(1)).to.be(true);
  });

  // it("Should check if a specific voter has cast a vote for a given proposal", async function () {
  //   const Voting = await ethers.getContractFactory("Voting");
  //   const [owner, voter] = await ethers.getSigners();
  //   const voting = await Voting.deploy(owner.address);
  //   await voting.createVote("Title", "Description", 10, 20, "link1", "link2");
  //   await voting.vote(1, 1, voter.address);

  //   const hasVoted = await voting.checkIfVoted(1, 1, voter.address);
  //   expect(hasVoted).to.equal(true);
  // });

  // it("Should log the winner of a specific vote", async function () {
  //   const Voting = await ethers.getContractFactory("Voting");
  //   const [owner, voter] = await ethers.getSigners();
  //   const voting = await Voting.deploy(owner.address);
  //   await voting.createVote("Title", "Description", 10, 20, "link1", "link2");
  //   await voting.vote(1, 1, voter.address);
  //   await ethers.provider.send("evm_increaseTime", [100000]);
  //   await ethers.provider.send("evm_mine");

  //   await expect(voting.logWinnerIs(1)).to.emit(voting, "WinnerIs");
  // });

  // it("Should return the winning proposal for a specific vote", async function () {
  //   const Voting = await ethers.getContractFactory("Voting");
  //   const [owner, voter] = await ethers.getSigners();
  //   const voting = await Voting.deploy(owner.address);
  //   await voting.createVote("Title", "Description", 10, 20, "link1", "link2");
  //   await voting.vote(1, 1, voter.address);
  //   await ethers.provider.send("evm_increaseTime", [100000]);
  //   await ethers.provider.send("evm_mine");

  //   const winningProposal = await voting.winningProposal(1);
  //   expect(winningProposal).to.equal(1);
  // });
});