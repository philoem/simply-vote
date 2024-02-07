// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {
  uint256 private _idVoteCounter=0;

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
  }
  struct Proposal {
    uint256 voteId;
    uint256 choiceOne;
    uint256 choiceTwo;
  }
  struct HasVoted {
    uint256 id;
    address voter;
  }

  mapping(uint256 => VoteStruct) public voteStructs;
  mapping(uint256 => bool) voteExist;
  mapping(uint256 => mapping(address => bool)) voted;
  mapping(uint256 => HasVoted) public hasVoted;
  mapping(uint256 => mapping(address => bool)) hasVotedBool;

  Proposal[] public proposals;
  VoteStruct[] public voteStructsArray;

  error TitleEmptyError();
  error DescriptionEmptyError();
  error InvalidStartEndTimesError();
  error OnlyAdminCanUpdateError();
  error VoteNotExistError(uint256 id);
  error TimeOverError(uint256 endsAt);
  error AlreadyVotedError();
  error TimeOfVoteNotEndedError();

  event WinnerIs(address indexed owner, uint256 id, string title, uint256 choice1, uint256 choice2);

  constructor(address initialOwner) Ownable(initialOwner) {
    initialOwner = msg.sender;
  }
  
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

    VoteStruct memory _voteStructs;
    _voteStructs.id = _idVoteCounter += 1;
    _voteStructs.admin = msg.sender;
    _voteStructs.title = title;  
    _voteStructs.description = description;
    _voteStructs.startsAt = startsAt;
    _voteStructs.endsAt = endsAt;
    _voteStructs.timestamp = (block.timestamp * 1000) + 1000;
    _voteStructs.link1 = link1;
    _voteStructs.link2 = link2;

    voteStructsArray.push(_voteStructs);
    proposals.push(Proposal({voteId: _voteStructs.id, choiceOne: 0, choiceTwo: 0}));
    voteExist[_voteStructs.id] = true;
  }

  function getVotes() public view returns (VoteStruct[] memory) {
    return voteStructsArray;
  }

  function getDetailsVote(uint256 _id) public view returns (VoteStruct memory) {
    return voteStructsArray[_id - 1];
  }

  function updateVote(
    uint256 _id,
    string memory _title,
    string memory _description,
    uint256 _startsAt,
    uint256 _endsAt,
    string memory _link1,
    string memory _link2
  ) onlyOwner public {
    if (bytes(_title).length == 0) {
      revert TitleEmptyError();
    } else if (bytes(_description).length == 0) {
      revert DescriptionEmptyError();
    } else if (_startsAt >= _endsAt) {
      revert InvalidStartEndTimesError();
    } else if (msg.sender != voteStructsArray[_id - 1].admin) {
      revert OnlyAdminCanUpdateError();
    }

    voteStructsArray[_id - 1].title = _title;
    voteStructsArray[_id - 1].description = _description;
    voteStructsArray[_id - 1].startsAt = _startsAt;
    voteStructsArray[_id - 1].endsAt = _endsAt;
    voteStructsArray[_id - 1].link1 = _link1;
    voteStructsArray[_id - 1].link2 = _link2;
  }

  /**
 * @dev Allows a voter to cast their vote for a specific proposal.
 * @param _id The unique identifier of the proposal to vote for.
 * @param _voter The address of the voter casting the vote.
 */
  function vote(uint256 _id, address _voter) public {
    if (voteExist[_id] == false) {
      revert VoteNotExistError(voteStructsArray[_id - 1].id);
    } else if (block.timestamp * 1000 > voteStructsArray[_id - 1].endsAt) {
      revert TimeOverError(voteStructsArray[_id - 1].endsAt);
    } else if (hasVotedBool[_id][_voter] == true) {
      revert AlreadyVotedError();
    }

    if (_id == 1) {
      proposals[_id - 1].choiceTwo = proposals[_id - 1].choiceTwo + 1;
    } else {
      proposals[_id - 1].choiceOne = proposals[_id - 1].choiceOne + 1;
    }

    hasVoted[_id].id = _id;
    hasVoted[_id].voter = _voter;
    hasVotedBool[_id][_voter] = true;

  }

  /**
 * @dev Retrieves the voting status of a specific voter for a given proposal.
 * @param _id The unique identifier of the proposal.
 * @return The HasVoted struct containing the voter's status for the proposal.
 */
  function getVoterHasVoted(uint256 _id) public view returns (HasVoted memory) {
    return hasVoted[_id];
  }

  /**
 * @dev Checks if a specific voter has cast a vote for a given proposal.
 * @param _id The unique identifier of the proposal.
 * @param _voter The address of the voter to check.
 * @return True if the voter has cast a vote, otherwise false.
 */
  function checkIfVoted(uint256 _id, address _voter) public view returns (bool) {
    bool voterHasVoted = hasVotedBool[_id][_voter];
    bool voterVoted = voted[_id][_voter];

    if (voterHasVoted == voterVoted) {
      return true;
    }
    return false;
  }

  function logWinnerIs(uint256 _id) public {
    if (block.timestamp * 1000 < voteStructsArray[_id - 1].endsAt) {
      revert TimeOfVoteNotEndedError();
    } else if (voteExist[_id] == false) {
      revert VoteNotExistError(voteStructsArray[_id - 1].id);
    }
    
    if (block.timestamp * 1000 >= voteStructsArray[_id - 1].endsAt) { 
      emit WinnerIs(msg.sender, voteStructsArray[_id - 1].id, voteStructsArray[_id - 1].title, proposals[_id].choiceOne, proposals[_id].choiceTwo);
    }
  }

  function getWinner(uint256 _id) public view returns (Proposal memory) {
    return proposals[_id];
  }

}