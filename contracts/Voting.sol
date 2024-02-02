// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import './Ownable.sol';

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
  mapping(uint256 => VoteStruct) public voteStructs;
  mapping(uint256 => bool) voteExist;
  uint256 votesCount;
  VoteStruct[] public voteStructsArray;

  error TitleEmptyError();
  error DescriptionEmptyError();
  error InvalidStartEndTimesError();
  error OnlyAdminCanUpdateError();

  event VoteCreated(
    uint256 id,
    address admin,
    string title,
    string description,
    uint256 startsAt,
    uint256 endsAt,
    string link1,
    string link2
  );

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
    votesCount++;
    voteExist[_voteStructs.id] = true;

    emit VoteCreated(
    _voteStructs.id,
    _voteStructs.admin,
    _voteStructs.title,
    _voteStructs.description,
    _voteStructs.startsAt,
    _voteStructs.endsAt,
    _voteStructs.link1,
    _voteStructs.link2);
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
  ) onlyowner public {
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

}