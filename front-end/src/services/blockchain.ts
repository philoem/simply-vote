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
		const contract = new ethers.Contract('0x4eA9477F846D25728Ff2Ca5372aCf6294F26926d', abi, signer)
		return contract
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
		const { id, title, description, startsAt, endsAt, link1, link2 } = data
		const tx = await contract?.createVote(id, title, description, startsAt, endsAt, link1, link2)
		await tx.wait()
		return Promise.resolve(tx)
	} catch (error) {
		console.log(error)
		return Promise.reject(error)
	}
}

const getVotes = async () => {
	const contract = await getContractEthereum()
	const votesPromise = contract?.getVotes()
  const votes = await votesPromise || []
  return structVotes(votes)
}

const getDetailsVote = async (id: number): Promise<VoteStruct> => {
	const contract = await getContractEthereum()
	const votePromise = contract?.getVote(id)
  const vote = await votePromise || {}
  return structVotes([vote])[0]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const structVotes = (votes: any[]): VoteStruct[] => {
	return votes
		.map((vote) => ({
			id: vote.id,
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

const formatDate = (timestamp: number) => {
	const date = new Date(timestamp * 1000)
	const day = date.getDate()
	const month = date.getMonth() + 1
	const year = date.getFullYear()
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	return `${day}/${month}/${year} à ${hours}:${minutes}`
}

export { createVote, getDetailsVote, getVotes, formatDate }
