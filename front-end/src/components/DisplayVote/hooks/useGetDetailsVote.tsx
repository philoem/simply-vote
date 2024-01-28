import toast from 'react-hot-toast'
import { getDetailsVote } from '../../../services/blockchain'

const useGetDetailsVote = () => {
	const getDetails = async (id: number) => {
		await toast.promise(
			new Promise((resolve, reject) => {
				getDetailsVote(id)
					.then((tx) => {
						console.log('tx :>> ', tx)
						resolve(tx)
					})
					.catch((error) => {
						reject(error)
						console.log('error :>> ', error)
					})
			}),
			{
				loading: 'En cours...',
				success: `Réupération du vote N°${id} reussie!`,
				error: `Erreur pour afficher le vote N°${id}`
			}
		)
	}

	return {
		getDetails
	}
}

export default useGetDetailsVote
