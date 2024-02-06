import { useCallback, useEffect, useState } from 'react'
import { getVoted, vote } from '../../../services/blockchain'
import toast from "react-hot-toast"

const useVoting = () => {
	const currentTime = Date.now()
	const [voterHasVoted, setVoterHasVoted] = useState<boolean>(false)

	const checkVoterHasVoted = useCallback(async (id: number, address: string) => {
		const voted = await getVoted(id, address)
		setVoterHasVoted(voted)
		return voted
	}, [])

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

	useEffect(() => {
		checkVoterHasVoted
	}, [checkVoterHasVoted])

  const voting = async (id: number, address: string) => {
		await toast.promise(
			new Promise((resolve, reject) => {
				vote(id, address)
					.then((tx) => {
						resolve(tx)
					})
					.catch((error) => {
						reject(error)
						console.log('error :>> ', error)
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
		voterHasVoted
  }
}

export default useVoting