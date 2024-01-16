// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract Ownable {
  address public voterAuthorized;

  function ownable() public {
    voterAuthorized = msg.sender;
  }

  modifier onlyvoterAuthorized() {
    require(msg.sender == voterAuthorized, "Only the voterAuthorized can call this function");
    _;
  }
}