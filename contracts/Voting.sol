// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract Voting {
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
  mapping(uint256 => bool) public voteExist;
  mapping(uint256 => mapping(address => bool)) public voted;

  Proposal[] public proposals;
  VoteStruct[] public voteStructsArray;

  error TitleEmptyError();
  error DescriptionEmptyError();
  error InvalidStartEndTimesError();
  error OnlyAdminCanUpdateError();
  error VoteNotExistError(uint256 id);
  error TimeOverError();
  error AlreadyVotedError();

  event VoteCreated(uint256 indexed idVote, address indexed owner, uint256 startsAt, uint256 endsAt, string title, string description, string link1, string link2);
  event VoteUpdated(uint256 indexed idVote, address indexed owner, uint256 startsAt, uint256 endsAt, string title, string description, string link1, string link2);
  event VoterHasVoted(uint256 indexed idVote, address indexed voter, uint256 choice);

  event WinnerIs(address indexed owner, uint256 id, string title, uint256 choice1, uint256 choice2);
  
  /**
 * @dev Creates a new voting proposal with the specified details.
 * @param title The title of the voting proposal.
 * @param description The description of the voting proposal.
 * @param startsAt The start time of the voting period.
 * @param endsAt The end time of the voting period.
 * @param link1 The first link related to the voting proposal.
 * @param link2 The second link related to the voting proposal.
 */
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
    _voteStructs.timestamp = block.number;
    _voteStructs.link1 = link1;
    _voteStructs.link2 = link2;

    voteStructsArray.push(_voteStructs);
    proposals.push(Proposal({voteId: _voteStructs.id, choiceOne: 0, choiceTwo: 0}));
    voteExist[_voteStructs.id] = true;

    emit VoteCreated(_voteStructs.id, msg.sender, _voteStructs.startsAt, _voteStructs.endsAt, _voteStructs.title, _voteStructs.description, _voteStructs.link1, _voteStructs.link2);
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
  ) public {
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

    emit VoteUpdated(_id, msg.sender, _startsAt, _endsAt, _title, _description, _link1, _link2);
  }

  function vote(uint256 _idVote, uint8 _id, address _addressVoter) public {
    if (voteExist[_idVote] == false) {
      revert VoteNotExistError(voteStructsArray[_idVote - 1].id);
    } else if (block.number * 1000 >= voteStructsArray[_idVote - 1].endsAt) {
      revert TimeOverError();
    } else if (voted[_idVote][_addressVoter] == true) {
      revert AlreadyVotedError();
    }

    if (_id == 1) {
      proposals[_idVote - 1].choiceOne += 1;
    } else if (_id == 2) { 
      proposals[_idVote - 1].choiceTwo += 1;
    }

    voted[_idVote][_addressVoter] = true;

    emit VoterHasVoted(_idVote, _addressVoter, _id == 1 ? 1 : 2);
  }

  /**
  * @notice Checks if the voter has voted on the proposal
  * @param _idVote The ID of the proposal to check for the voter's vote
  * @param _addressVoter The address of the voter
  */
  function checkIfVoted(uint256 _idVote, address _addressVoter) public view returns (bool) {
    return voted[_idVote][_addressVoter]; 
  }

  /**
   * @notice Returns the winning proposal 
   * @param _id The ID of the vote
   */
  function winningProposal(uint256 _id) public view returns (Proposal memory) {
    if (voteExist[_id] == false) {
      revert VoteNotExistError(voteStructsArray[_id - 1].id);
    }
    return proposals[_id - 1];
  }

}