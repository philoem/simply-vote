// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract Voting {
  uint256 private idVoteCounter = 0;

  struct VoteStruct {
    uint256 id;
    address admin;
    uint256 startsAt;
    uint256 endsAt;
    uint256 timestamp;
    string title;
    string description;
    string link1;
    string link2;
    uint256 choiceOne;
    uint256 choiceTwo;
  }

  mapping(uint256 => VoteStruct) public voteStructs;
  mapping(uint256 => bool) public voteExist;
  mapping(uint256 => mapping(address => bool)) public voted;
  
  VoteStruct[] public voteStructsArray;

  error TitleEmptyError();
  error DescriptionEmptyError();
  error InvalidStartEndTimesError();
  error OnlyAdminCanUpdateError();
  error VoteNotExistError(uint256 id);
  error TimeOverError();
  error AlreadyVotedError();

  event VoteCreated(uint256 indexed idVote, address indexed owner, uint256 startsAt, uint256 endsAt, string title, string description, string link1, string link2);
  event VoteUpdated(uint256 indexed idVote, address indexed owner, uint256 startsAt, uint256 endsAt, string title, string description, string link1, string link2);
  event VoterHasVoted(uint256 indexed idVote, address indexed voter, uint256 choice);
  
  /**
 * @dev Creates a new voting proposal with the specified details.
 * @param title The title of the voting proposal.
 * @param description The description of the voting proposal.
 * @param startsAt The start time of the voting period.
 * @param endsAt The end time of the voting period.
 * @param link1 The first link related to the voting proposal.
 * @param link2 The second link related to the voting proposal.
 */
  function createVote(
    string memory title,
    string memory description,
    uint256 startsAt,
    uint256 endsAt,
    string memory link1,
    string memory link2
  ) public {
    if (bytes(title).length == 0) {
      revert TitleEmptyError();
    } else if (bytes(description).length == 0) {
      revert DescriptionEmptyError();
    } else if (startsAt >= endsAt) {
      revert InvalidStartEndTimesError();
    }

    VoteStruct memory voteStructsCreated = VoteStruct({
      id: 0,
      admin: address(0),
      title: "",
      description: "",
      startsAt: 0,
      endsAt: 0,
      timestamp: 0,
      link1: "",
      link2: "",
      choiceOne: 0,
      choiceTwo: 0
    });
    voteStructsCreated.id = idVoteCounter += 1;
    voteStructsCreated.admin = msg.sender;
    voteStructsCreated.title = title;
    voteStructsCreated.description = description;
    voteStructsCreated.startsAt = startsAt;
    voteStructsCreated.endsAt = endsAt;
    voteStructsCreated.timestamp = block.number;
    voteStructsCreated.link1 = link1;
    voteStructsCreated.link2 = link2;

    voteStructsArray.push(voteStructsCreated);
    voteExist[voteStructsCreated.id] = true;

    emit VoteCreated(voteStructsCreated.id, msg.sender, voteStructsCreated.startsAt, voteStructsCreated.endsAt, voteStructsCreated.title, voteStructsCreated.description, voteStructsCreated.link1, voteStructsCreated.link2);
  }

  function getVotes() public view returns (VoteStruct[] memory) {
    return voteStructsArray;
  }

  function getDetailsVote(uint256 id) public view returns (VoteStruct memory) {
    return voteStructsArray[id - 1];
  }

  function updateVote(
    uint256 id,
    string memory title,
    string memory description,
    uint256 startsAt,
    uint256 endsAt,
    string memory link1,
    string memory link2
  ) public {
    if (bytes(title).length == 0) {
      revert TitleEmptyError();
    } else if (bytes(description).length == 0) {
      revert DescriptionEmptyError();
    } else if (startsAt >= endsAt) {
      revert InvalidStartEndTimesError();
    } else if (msg.sender != voteStructsArray[id - 1].admin) {
      revert OnlyAdminCanUpdateError();
    }

    voteStructsArray[id - 1].title = title;
    voteStructsArray[id - 1].description = description;
    voteStructsArray[id - 1].startsAt = startsAt;
    voteStructsArray[id - 1].endsAt = endsAt;
    voteStructsArray[id - 1].link1 = link1;
    voteStructsArray[id - 1].link2 = link2;

    emit VoteUpdated(id, msg.sender, startsAt, endsAt, title, description, link1, link2);
  }

  function vote(uint256 idVote, uint8 id, address addressVoter) public {
    if (!voteExist[idVote]) {
      revert VoteNotExistError(voteStructsArray[idVote - 1].id);
    } else if (block.number * 1000 >= voteStructsArray[idVote - 1].endsAt) {
      revert TimeOverError();
    } else if (voted[idVote][addressVoter]) {
      revert AlreadyVotedError();
    }
    
    if (id == 1) {
      voteStructsArray[idVote - 1].choiceOne += 1;
    } else if (id == 2) { 
      voteStructsArray[idVote - 1].choiceTwo += 1;
    }

    voted[idVote][addressVoter] = true;

    emit VoterHasVoted(idVote, addressVoter, id == 1 ? 1 : 2);
  }

  /**
  * @notice Checks if the voter has voted on the proposal
  * @param idVote The ID of the proposal to check for the voter's vote
  * @param addressVoter The address of the voter
  */
  function checkIfVoted(uint256 idVote, address addressVoter) public view returns (bool) {
    return voted[idVote][addressVoter]; 
  }

  /**
   * @notice Returns the winning proposal 
   * @param id The ID of the vote
   */
  function winningProposal(uint256 id) public view returns (VoteStruct memory) {
    return voteStructsArray[id - 1];
  }

}