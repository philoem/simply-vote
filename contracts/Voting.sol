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

  mapping(uint256 => VoteStruct) public voteStructs;
  mapping(uint256 => bool) voteExist;
  mapping(uint256 => mapping(address => bool)) voted;

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

  event WinnerIs(address indexed owner, uint256 id, string title, uint256 winnerId);

  constructor(address initialOwner) Ownable(initialOwner) {
    initialOwner = msg.sender;
  }
  
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

  function vote(uint256 _id, address _voter) public {
    if (voteExist[_id] == false) {
      revert VoteNotExistError(voteStructsArray[_id - 1].id);
    } else if (block.timestamp * 1000 > voteStructsArray[_id - 1].endsAt) {
      revert TimeOverError(voteStructsArray[_id - 1].endsAt);
    } else if (voted[_id][_voter] == true) {
      revert AlreadyVotedError();
    }

    if (_id == 1) {
      proposals[_id - 1].choiceTwo = proposals[_id - 1].choiceTwo + 1;
    } else {
      proposals[_id - 1].choiceOne = proposals[_id - 1].choiceOne + 1;
    }

    voted[_id][_voter] = true;
  }

  function checkIfVoted(uint256 _id, address _voter) public view returns (bool) {
    return voted[_id][_voter];
  }

  function winnerIs(uint256 _id) public returns (Proposal memory) {
    if (block.timestamp * 1000 < voteStructsArray[_id - 1].endsAt) {
      revert TimeOfVoteNotEndedError();
    } else if (voteExist[_id] == false) {
      revert VoteNotExistError(voteStructsArray[_id - 1].id);
    }

    if(proposals[_id].choiceOne > proposals[_id].choiceTwo) {
      emit WinnerIs(msg.sender, voteStructsArray[_id - 1].id, voteStructsArray[_id - 1].title, proposals[_id].choiceOne);
    } else {
      emit WinnerIs(msg.sender, voteStructsArray[_id - 1].id, voteStructsArray[_id - 1].title, proposals[_id].choiceTwo);
    }

    return proposals[_id];
  }

}