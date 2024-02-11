# Voting









## Methods

### checkIfVoted

```solidity
function checkIfVoted(uint256 _idVote, address _voter) external view returns (bool)
```

Checks if the voter has voted on the proposal



#### Parameters

| Name | Type | Description |
|---|---|---|
| _idVote | uint256 | The ID of the proposal to check for the voter&#39;s vote |
| _voter | address | The address of the voter |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

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

### getVotes

```solidity
function getVotes() external view returns (struct Voting.VoteStruct[])
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | Voting.VoteStruct[] | undefined |

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
function vote(uint256 _idVote, uint8 _id, address _voter) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _idVote | uint256 | undefined |
| _id | uint8 | undefined |
| _voter | address | undefined |

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

### winningProposal

```solidity
function winningProposal(uint256 _id) external view returns (struct Voting.Proposal)
```

Returns the winning proposal 



#### Parameters

| Name | Type | Description |
|---|---|---|
| _id | uint256 | The ID of the proposal |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | Voting.Proposal | undefined |



## Events

### VoteCreated

```solidity
event VoteCreated(uint256 indexed idVote, address indexed owner, uint256 startsAt, uint256 endsAt, string title, string description, string link1, string link2)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| idVote `indexed` | uint256 | undefined |
| owner `indexed` | address | undefined |
| startsAt  | uint256 | undefined |
| endsAt  | uint256 | undefined |
| title  | string | undefined |
| description  | string | undefined |
| link1  | string | undefined |
| link2  | string | undefined |

### VoteUpdated

```solidity
event VoteUpdated(uint256 indexed idVote, address indexed owner, uint256 startsAt, uint256 endsAt, string title, string description, string link1, string link2)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| idVote `indexed` | uint256 | undefined |
| owner `indexed` | address | undefined |
| startsAt  | uint256 | undefined |
| endsAt  | uint256 | undefined |
| title  | string | undefined |
| description  | string | undefined |
| link1  | string | undefined |
| link2  | string | undefined |

### VoterHasVoted

```solidity
event VoterHasVoted(uint256 indexed idVote, address indexed voter, uint256 choice)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| idVote `indexed` | uint256 | undefined |
| voter `indexed` | address | undefined |
| choice  | uint256 | undefined |

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






### TimeOverError

```solidity
error TimeOverError()
```






### TitleEmptyError

```solidity
error TitleEmptyError()
```






### VoteNotExistError

```solidity
error VoteNotExistError()
```







