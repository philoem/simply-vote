import { ethers } from 'hardhat';
import { expect } from 'chai';

describe("Voting", function () {
  let owner: any;
  let voter: any;

  // To test the createVote function
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

  // To test the getDetailsVote function
  it("Should get the details of a specific vote", async () => {
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();
    
    await voting.createVote("Title", "Description", 1707419520000, 1707419700000, "link1", "link2");
    const voteDetails = await voting.getDetailsVote(1);
    expect(voteDetails.title).to.equal("Title");
    expect(voteDetails.description).to.equal("Description");
  });

  // To test the updateVote function
  it("Should update the details of a specific vote", async function () {
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();
    await voting.createVote("Title", "Description", 1707419520000, 1707419700000, "link1", "link2");
    
    await voting.updateVote(1, "New Title", "New Description", 1707419520000, 1707419700000, "newLink1", "newLink2");
    const updatedDetails = await voting.getDetailsVote(1);
    expect(updatedDetails.title).to.equal("New Title");
    expect(updatedDetails.description).to.equal("New Description");
  });

  // To test the vote function
  it("should vote to increment choiceOne when _id is 1 and an another vote with different address and same vote with the same address", async function () {
    const Voting = await ethers.getContractFactory("Voting");
    [owner, voter] = await ethers.getSigners();
    const voting = await Voting.deploy();
    await voting.createVote("Title", "Description", 1707419520000, 1707999999999, "link1", "link2");
    await voting.vote(1, 1, owner.address);
    const choiceOne = (await voting.voteStructsArray(0)).choiceOne;
    expect(choiceOne).to.equal(1);

    // Second vote to same index of vote with an another address voter
    await voting.vote(1, 1, voter.address);
    const choiceOneBis = (await voting.voteStructsArray(0)).choiceOne;
    expect(choiceOneBis).to.equal(2);
    
    // Second vote to same index of vote with the same address voter expected to reverted with custom error
    expect(voting.vote(1, 1, voter.address)).to.be.revertedWithCustomError(voting, "AlreadyVotedError");
  });

  // To test the vote function
  it("should vote to increment choiceTwo when _id is 2 and an another vote with different address and same vote with the same address", async function () {
    const Voting = await ethers.getContractFactory("Voting");
    [owner, voter] = await ethers.getSigners();
    const voting = await Voting.deploy();
    await voting.createVote("Title", "Description", 1707419520000, 1707999999999, "link1", "link2");
    await voting.vote(1, 2, owner.address);
    const choiceTwo = (await voting.voteStructsArray(0)).choiceTwo;
    expect(choiceTwo).to.equal(1);

    // Second vote to same index of vote with an another address voter
    await voting.vote(1, 2, voter.address);
    const choiceTwoBis = (await voting.voteStructsArray(0)).choiceTwo;
    expect(choiceTwoBis).to.equal(2);

    // Second vote to same index of vote with the same address voter expected to reverted with custom error
    expect(voting.vote(1, 2, voter.address)).to.be.revertedWithCustomError(voting, "AlreadyVotedError");
  });

  // To test the checkIfVoted function
  it("Should check if a specific voter has cast a vote for a given proposal", async function () {
    const Voting = await ethers.getContractFactory("Voting");
    const [voter] = await ethers.getSigners();
    const voting = await Voting.deploy();
    await voting.createVote("Title", "Description", 1707419520000, 1707999999999, "link1", "link2");
    await voting.vote(1, 1, voter.address);

    expect(await voting.checkIfVoted(1, voter.address)).to.equal(true);
  });

  // To test the winningProposal function
  it('should return winning proposal', async function () {
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();
    
    await voting.createVote("Title", "Description", 1707576420000, 1707580020000, "link1", "link2");
    const [voter] = await ethers.getSigners();
    await voting.vote(1, 1, voter.address);
    
    const result = await voting.winningProposal(1);
    expect(result.choiceOne).to.equal(1);
    expect(result.choiceTwo).to.equal(0);
  });
});