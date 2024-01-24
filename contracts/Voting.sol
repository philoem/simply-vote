// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {

  struct VoteStruct {
    uint256 id;
    string title;
    string description;
    uint256 startsAt;
    uint256 endsAt;
    uint256 timestamp;
    string link1;
    string link2;
  }
  mapping(uint256 => VoteStruct) public voteStructs;
  mapping(uint256 => bool) voteExist;
  VoteStruct[] public voteStructsArray;
  uint256 votesCount;

  event VoteCreated(
    uint256 id,
    string title,
    string description,
    uint256 startsAt,
    uint256 endsAt,
    string link1,
    string link2
  );

  function createVote(
    uint256 id,
    string memory title,
    string memory description,
    uint256 startsAt,
    uint256 endsAt,
    string memory link1,
    string memory link2
  ) public {
    require(bytes(title).length > 0, "Title cannot be empty");
    require(bytes(description).length > 0, "Description cannot be empty");
    require(startsAt < endsAt, "StartsAt must be before EndsAt");

    VoteStruct memory _voteStructs;
    _voteStructs.id = id;
    _voteStructs.title = title;  
    _voteStructs.description = description;
    _voteStructs.startsAt = startsAt;
    _voteStructs.endsAt = endsAt;
    _voteStructs.timestamp = (block.timestamp * 1000) + 1000;
    _voteStructs.link1 = link1;
    _voteStructs.link2 = link2;

    voteStructsArray.push(_voteStructs);
    votesCount++;

    emit VoteCreated(_voteStructs.id, _voteStructs.title, _voteStructs.description, _voteStructs.startsAt, _voteStructs.endsAt, _voteStructs.link1, _voteStructs.link2);
  }

  function getVotes() public view returns (VoteStruct[] memory) {
    return voteStructsArray;
  }

}