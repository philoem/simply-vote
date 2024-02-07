import { useCallback, useEffect } from 'react'
import { getVoted, vote } from '../../../services/blockchain'
import toast from "react-hot-toast"
import useLocalStorage from '../../../hooks/useLocalStorage'

const useVoting = () => {
	const currentTime = Date.now()
	const [voterHasVoted, setVoterHasVoted] = useLocalStorage('voterHasVoted', [])

	const checkVoterHasVoted = useCallback(async (id: number, address: string) => {
		const voted = await getVoted(id, address)
		setVoterHasVoted([...voterHasVoted, {address: address, id: id}])
		return voted
	}, [setVoterHasVoted, voterHasVoted])

	// Allow to check and fetch if voter has already voter when the page is refresh. Avoid duplicate vote
	useEffect(() => {
		checkVoterHasVoted
	}, [checkVoterHasVoted])

	// Array iterate to check if voter has already voted
	const verifyAddressVoter = useCallback((address: string, id: number) => {
		const isMatch = voterHasVoted.some((voter: { address: string, id: number }) => voter.address === address && voter.id === id)
		return isMatch
	}, [voterHasVoted])

	useEffect(() => {
		verifyAddressVoter
	}, [verifyAddressVoter])

	const checkTimeNotEnded = useCallback((endsAt: number) => {
		if(currentTime < endsAt) {
			return true
		} else if(currentTime > endsAt) {
			return false
		} 
	}, [currentTime])

	useEffect(() => {
		checkTimeNotEnded
	}, [checkTimeNotEnded])	

    /**
   * A function for conducting a voting process asynchronously.
   *
   * @param {number} id - the ID of the voting process
   * @param {string} address - the address of the voter
   * @param {number} idVote - the ID of the vote
   * @return {Promise<any>} a Promise that resolves to the voting transaction
   */
	const voting = async (id: number, address: string, idVote: number) => {
		await toast.promise(
			new Promise((resolve, reject) => {
				vote(id, address)
					.then((tx) => {
						resolve(tx)
						checkVoterHasVoted(idVote, address)
					})
					.catch((error) => {
						reject(error)
						console.log('error voting :>> ', error)
					})
			}),
			{
				loading: 'En cours...',
				success: `Merci d'avoir voté pour le vote N°${id} !`,
				error: `Erreur lors de votre vote N°${id}`
			}
		)
	}

  return {
    voting,
		checkTimeNotEnded,
		verifyAddressVoter
  }
}

export default useVoting