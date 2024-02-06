// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

abstract contract Ownable {
  address public owner;

  constructor() {
    owner = msg.sender;
  }

  function ownerable() public view virtual returns (address) {
    return owner;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only the owner can modify this vote");
    _;
  }
}