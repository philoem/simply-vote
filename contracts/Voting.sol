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