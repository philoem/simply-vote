import { useCallback, useEffect } from 'react'
import { getVoted, vote } from '../../../services/blockchain'
import toast from "react-hot-toast"
import useLocalStorage from '../../../hooks/useLocalStorage'

const useVoting = () => {
	const currentTime = Date.now()
	const [voterHasVoted, setVoterHasVoted] = useLocalStorage('voterHasVoted', [])

	const checkVoterHasVoted = useCallback(async (idVote: number, address: string) => {
		const voted = await getVoted(idVote, address)
		setVoterHasVoted([...voterHasVoted, {idVote: idVote, address: address}])
		return voted
	}, [setVoterHasVoted, voterHasVoted])

	useEffect(() => {
		checkVoterHasVoted
	}, [checkVoterHasVoted])	

	// Array iterate to check if voter has already voted
	const verifyAddressVoter = useCallback((idVote: number, address: string ) => {
		const isMatch = voterHasVoted.some((voter: { idVote: number, address: string }) => 
			Number(voter.idVote) === idVote && voter.address === address
		)
		return isMatch
	}, [voterHasVoted])

	// Array iterate to check if voter has already voted for owner
	const verifyAddressVoterForOwner = useCallback((idVote: number) => {
		const isMatch = voterHasVoted.some((voter: { idVote: number}) => 
			Number(voter.idVote) === idVote
		)
		return isMatch
	}, [voterHasVoted])

	useEffect(() => {
		verifyAddressVoterForOwner
	}, [verifyAddressVoterForOwner])

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

	const displayWinner = (choiceOne: number, choiceTwo: number) => {
		if(choiceOne > choiceTwo) {
			return 'Vote 1 gagnant'
		} else if(choiceOne < choiceTwo) {
			return 'Vote 2 gagnant'
		} else {
			return 'Egalité entre les 2 votes'
		}
	}

    /**
   * A function for conducting a voting process asynchronously.
   *
   * @param {number} id - the ID of the voting process
   * @param {string} address - the address of the voter
   * @param {number} idVote - the ID of the vote
   * @return {Promise<any>} a Promise that resolves to the voting transaction
   */
	const voting = async (idVote: number, id: number, address: string) => {
		await toast.promise(
			new Promise((resolve, reject) => {
				vote(idVote, id, address)
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
		verifyAddressVoter,
		verifyAddressVoterForOwner,
		displayWinner
  }
}

export default useVoting