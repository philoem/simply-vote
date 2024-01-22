// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import './Ownable.sol';
import './MerkleTreeProof.sol';
import { Hashing } from './Library/HashingLibrary.sol';


contract Voting is Ownable {

  struct Voter {
    bool voted; 
    uint vote;
    bool committed;
    bytes32 encryptedVote;
  }

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

  mapping(address => Voter) public voters;
  mapping(uint256 => uint256) public voteCount;
  mapping(address => bytes32) public commitHashes;

  string[] public winnerIs;

  bytes32 private merkleTreeRoot;

  event WinnerIs(string candidate);
  
  constructor(bytes32 _merkleTreeProofInstance, bytes32[] memory _proof, bytes32 _leaf) {
    MerkleTreeProof merkleTreeProofInstance = new MerkleTreeProof(_merkleTreeProofInstance);
    if(!merkleTreeProofInstance.verify(_proof, _leaf)) {
      revert("You're not on the list, you can't vote");
    }
  }

  function createVote(
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
    require(bytes(link1).length > 0, "Link cannot be empty");
    require(bytes(link2).length > 0, "Link cannot be empty");

    VoteStruct memory _voteStructs;
    _voteStructs.title = title;  
    _voteStructs.description = description;
    _voteStructs.startsAt = startsAt;
    _voteStructs.endsAt = endsAt;
    _voteStructs.timestamp = (block.timestamp * 1000) + 1000;
    _voteStructs.link1 = link1;
    _voteStructs.link2 = link2;

    voteStructs[_voteStructs.id] = _voteStructs;
    voteExist[_voteStructs.id] = true;
  }

  function getVotes() public view returns (VoteStruct[] memory _voteStructs) {
    uint256 _count = 0;
    for(uint256 i = 0; i < _voteStructs.length; i++) {
      if(voteExist[i]) {
        _voteStructs[_count] = voteStructs[i];
        _count++;
      }
    }
    return _voteStructs;
  }

  function getVote(uint256 _id) public view returns (VoteStruct memory) {
    require(voteExist[_id], "Vote does not exist");
    return voteStructs[_id];
  }

  function commitVote(address voterAuthorized, string calldata _candidate) internal onlyvoterAuthorized returns (bytes32) {
    require(!voters[voterAuthorized].committed, "Vote has already been committed");

    bytes32 commitHash = keccak256(abi.encodePacked(_candidate, Hashing.generatedSaltToCommitHash()));
    require(commitHashes[voterAuthorized] == commitHash, "Invalid commit hash");
    voters[voterAuthorized].committed = true;

    return commitHash;
  }

  function vote(string calldata _candidate) public onlyvoterAuthorized returns(uint256) {    
    require(!voters[voterAuthorized].voted, "Voter has already voted");

    // Commit-reveal system
    commitVote(voterAuthorized, _candidate);
    require(voters[voterAuthorized].committed);

    uint uintegerString = Hashing.stringToUint(_candidate);
    
    voters[voterAuthorized].voted = true;
    voters[voterAuthorized].vote = uintegerString;
    
    return voteCount[uintegerString] += 1;
  }

  function revealVote(string calldata _answer) public {
    require(commitVote(msg.sender, _answer) == commitHashes[msg.sender], "You are an imposter");
    winnerIs.push(_answer);
  }

  function isWinner() public {
    emit WinnerIs(winnerIs[0]);
  }

}