// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

contract Ownable {
  address public owner;

  function ownable() public {
    owner = msg.sender;
  }

  modifier onlyowner() {
    require(msg.sender == owner, "Only the owner can modify this vote");
    _;
  }
}