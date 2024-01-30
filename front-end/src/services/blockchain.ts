import { ethers } from 'ethers'
import { ModalParams, VoteStruct } from '../utils/types'
import Contract from '../../../artifacts/contracts/Voting.sol/Voting.json'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ethereum: any
if (typeof window !== 'undefined') {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	ethereum = window.ethereum
}

/**
 * Retrieves the Ethereum contract if the ethereum object is available.
 *
 * @return {ethers.Contract} The Ethereum contract, or undefined if the ethereum object is not available.
 */
const getContractEthereum = async () => {
	if (ethereum) {
		const provider = new ethers.BrowserProvider(ethereum)
		const signer = await provider.getSigner()
		const abi = Contract.abi
		const contract = new ethers.Contract('0xe29fe5f4c784BE4538416F78a71B390266435CA1', abi, signer)
		return contract
	}
}

/**
 * Asynchronous function to retrieve the address using the ethereum object.
 *
 * @return {Promise<string>} The address retrieved from the ethereum object.
 */
const getAddressCurrent = async () => {
	if (ethereum) {
		const provider = new ethers.BrowserProvider(ethereum)
		const signer = await provider.getSigner()
		return signer.address
	}
}

/**
 * Creates a vote using the provided data.
 *
 * @param {ModalParams} data - The data needed to create the vote.
 * @return {Promise} A promise that resolves with the transaction object if successful, or rejects with an error if not.
 */
const createVote = async (data: ModalParams) => {
	try {
		const contract = await getContractEthereum()
		const { title, description, startsAt, endsAt, link1, link2 } = data
		const tx = await contract?.createVote(title, description, startsAt, endsAt, link1, link2)
		await tx.wait()
		return Promise.resolve(tx)
	} catch (error) {
		console.log(error)
		return Promise.reject(error)
	}
}

/**
 * Asynchronously retrieves votes from the Ethereum contract and returns a structured
 * version of the votes.
 *
 * @return {Array} structured votes
 */
const getVotes = async () => {
	const contract = await getContractEthereum()
	const votesPromise = contract?.getVotes()
  const votes = await votesPromise || []
  return structVotes(votes)
}

/**
 * Retrieves details of a vote by its ID.
 *
 * @param {number} id - The ID of the vote
 * @return {Promise<VoteStruct>} The details of the vote
 */
const getDetailsVote = async (id: number): Promise<VoteStruct> => {
	const contract = await getContractEthereum()
	const vote = contract?.getDetailsVote(id)
	return vote
}

/**
 * Update a vote with the provided data.
 *
 * @param {number} id - The ID of the vote to update
 * @param {ModalParams} data - The data to update the vote with
 * @return {Promise<VoteStruct>} A promise that resolves to the updated vote
 */
const updateVote = async (id: number, data: ModalParams): Promise<VoteStruct> => {
	try {
		const contract = await getContractEthereum()
		const { title, description, startsAt, endsAt, link1, link2 } = data
		const tx = await contract?.updateVote(id, title, description, startsAt, endsAt, link1, link2)
		await tx.wait()		
		return Promise.resolve(tx)
	} catch (error) {
		console.log(error)
		return Promise.reject(error)
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const structVotes = (votes: any[]): VoteStruct[] => {
	return votes
		.map((vote) => ({
			id: vote.id,
			admin: vote.admin,
			title: vote.title,
			description: vote.description,
			startsAt: Number(vote.startsAt),
			endsAt: Number(vote.endsAt),
			timestamp: Number(vote.timestamp),
			link1: vote.link1,
			link2: vote.link2
		}))
		.sort((a, b) => b.timestamp - a.timestamp)
}

export { createVote, getDetailsVote, getVotes, updateVote, getAddressCurrent }
