# Voting









## Methods

### checkIfVoted

```solidity
function checkIfVoted(uint256 _id, address _voter) external view returns (bool)
```



*Checks if a specific voter has cast a vote for a given proposal.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _id | uint256 | The unique identifier of the proposal. |
| _voter | address | The address of the voter to check. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | True if the voter has cast a vote, otherwise false. |

### createVote

```solidity
function createVote(string title, string description, uint256 startsAt, uint256 endsAt, string link1, string link2) external nonpayable
```



*Creates a new voting proposal with the specified details.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| title | string | The title of the voting proposal. |
| description | string | The description of the voting proposal. |
| startsAt | uint256 | The start time of the voting period. |
| endsAt | uint256 | The end time of the voting period. |
| link1 | string | The first link related to the voting proposal. |
| link2 | string | The second link related to the voting proposal. |

### getDetailsVote

```solidity
function getDetailsVote(uint256 _id) external view returns (struct Voting.VoteStruct)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _id | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | Voting.VoteStruct | undefined |

### getVoterHasVoted

```solidity
function getVoterHasVoted(uint256 _id) external view returns (struct Voting.HasVoted)
```



*Retrieves the voting status of a specific voter for a given proposal.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _id | uint256 | The unique identifier of the proposal. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | Voting.HasVoted | The HasVoted struct containing the voter&#39;s status for the proposal. |

### getVotes

```solidity
function getVotes() external view returns (struct Voting.VoteStruct[])
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | Voting.VoteStruct[] | undefined |

### getWinner

```solidity
function getWinner(uint256 _id) external view returns (struct Voting.Proposal)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _id | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | Voting.Proposal | undefined |

### hasVoted

```solidity
function hasVoted(uint256) external view returns (uint256 id, address voter)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| id | uint256 | undefined |
| voter | address | undefined |

### logWinnerIs

```solidity
function logWinnerIs(uint256 _id) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _id | uint256 | undefined |

### owner

```solidity
function owner() external view returns (address)
```



*Returns the address of the current owner.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### proposals

```solidity
function proposals(uint256) external view returns (uint256 voteId, uint256 choiceOne, uint256 choiceTwo)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| voteId | uint256 | undefined |
| choiceOne | uint256 | undefined |
| choiceTwo | uint256 | undefined |

### renounceOwnership

```solidity
function renounceOwnership() external nonpayable
```



*Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner.*


### transferOwnership

```solidity
function transferOwnership(address newOwner) external nonpayable
```



*Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| newOwner | address | undefined |

### updateVote

```solidity
function updateVote(uint256 _id, string _title, string _description, uint256 _startsAt, uint256 _endsAt, string _link1, string _link2) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _id | uint256 | undefined |
| _title | string | undefined |
| _description | string | undefined |
| _startsAt | uint256 | undefined |
| _endsAt | uint256 | undefined |
| _link1 | string | undefined |
| _link2 | string | undefined |

### vote

```solidity
function vote(uint256 _id, address _voter) external nonpayable
```



*Allows a voter to cast their vote for a specific proposal.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _id | uint256 | The unique identifier of the proposal to vote for. |
| _voter | address | The address of the voter casting the vote. |

### voteStructs

```solidity
function voteStructs(uint256) external view returns (uint256 id, address admin, uint256 startsAt, uint256 endsAt, uint256 timestamp, string title, string description, string link1, string link2)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| id | uint256 | undefined |
| admin | address | undefined |
| startsAt | uint256 | undefined |
| endsAt | uint256 | undefined |
| timestamp | uint256 | undefined |
| title | string | undefined |
| description | string | undefined |
| link1 | string | undefined |
| link2 | string | undefined |

### voteStructsArray

```solidity
function voteStructsArray(uint256) external view returns (uint256 id, address admin, uint256 startsAt, uint256 endsAt, uint256 timestamp, string title, string description, string link1, string link2)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| id | uint256 | undefined |
| admin | address | undefined |
| startsAt | uint256 | undefined |
| endsAt | uint256 | undefined |
| timestamp | uint256 | undefined |
| title | string | undefined |
| description | string | undefined |
| link1 | string | undefined |
| link2 | string | undefined |



## Events

### OwnershipTransferred

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| previousOwner `indexed` | address | undefined |
| newOwner `indexed` | address | undefined |

### WinnerIs

```solidity
event WinnerIs(address indexed owner, uint256 id, string title, uint256 choice1, uint256 choice2)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| owner `indexed` | address | undefined |
| id  | uint256 | undefined |
| title  | string | undefined |
| choice1  | uint256 | undefined |
| choice2  | uint256 | undefined |



## Errors

### AlreadyVotedError

```solidity
error AlreadyVotedError()
```






### DescriptionEmptyError

```solidity
error DescriptionEmptyError()
```






### InvalidStartEndTimesError

```solidity
error InvalidStartEndTimesError()
```






### OnlyAdminCanUpdateError

```solidity
error OnlyAdminCanUpdateError()
```






### OwnableInvalidOwner

```solidity
error OwnableInvalidOwner(address owner)
```



*The owner is not a valid owner account. (eg. `address(0)`)*

#### Parameters

| Name | Type | Description |
|---|---|---|
| owner | address | undefined |

### OwnableUnauthorizedAccount

```solidity
error OwnableUnauthorizedAccount(address account)
```



*The caller account is not authorized to perform an operation.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | undefined |

### TimeOfVoteNotEndedError

```solidity
error TimeOfVoteNotEndedError()
```






### TimeOverError

```solidity
error TimeOverError(uint256 endsAt)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| endsAt | uint256 | undefined |

### TitleEmptyError

```solidity
error TitleEmptyError()
```






### VoteNotExistError

```solidity
error VoteNotExistError(uint256 id)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| id | uint256 | undefined |


