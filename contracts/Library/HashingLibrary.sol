// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

  function hashingVote(bytes32 _candidate) pure returns (uint256) {
    bytes memory candidat = abi.encodePacked(_candidate);
    uint hash = uint(keccak256(candidat));
    return hash;
  }

  library Hashing {
    function stringToUint(string calldata _str) public pure returns (uint256) {
      bytes memory strBytes = bytes(_str);
      bytes32 hash = keccak256(strBytes);
      uint256 result = uint256(hashingVote(hash));
      return result;
    }

    function generatedSaltToCommitHash() public view returns(bytes32) {
      return keccak256(abi.encodePacked(block.timestamp, msg.sender));
    }
  }