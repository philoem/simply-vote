import { ethers } from 'ethers'
import { ModalParams } from '../utils/types'
import Contract from '../../../artifacts/contracts/Voting.sol/Voting.json'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ethereum: any
if (typeof window !== 'undefined') {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	ethereum = window.ethereum
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let contract: any

/**
 * Creates a vote using the provided data.
 *
 * @param {ModalParams} data - The data needed to create the vote.
 * @return {Promise} A promise that resolves with the transaction object if successful, or rejects with an error if not.
 */
const createVote = async (data: ModalParams) => {
	if (ethereum) {
		const provider = new ethers.BrowserProvider(ethereum)
		const signer = await provider.getSigner()
		const abi = Contract.abi
		contract = new ethers.Contract(signer.address, abi, signer)
	}
	try {
		const { title, description, startsAt, endsAt, link1, link2 } = data
		const tx = await contract?.createVote(title, description, startsAt, endsAt, link1, link2)
		await tx.wait()
		return Promise.resolve(tx)
	} catch (error) {
		console.log(error)
		return Promise.reject(error)
	}
}

export { createVote }
