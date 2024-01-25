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
  uint256 votesCount;
  VoteStruct[] public voteStructsArray;

  error TitleEmptyError(string message);
  error DescriptionEmptyError(string message);
  error InvalidStartEndTimesError(string message);

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
    if (bytes(title).length == 0) {
      revert TitleEmptyError("Title cannot be empty");
    } else if (bytes(description).length == 0) {
      revert DescriptionEmptyError("Description cannot be empty");
    } else if (startsAt >= endsAt) {
      revert InvalidStartEndTimesError("StartsAt must be before EndsAt");
    }

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

  function getDetailsVote(uint256 _id) public view returns (VoteStruct memory) {
    return voteStructs[_id];
  }

}