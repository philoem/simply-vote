import { vote } from '../../../services/blockchain'
import toast from "react-hot-toast"

const useVoting = () => {

  const voting = async (id: number) => {
		await toast.promise(
			new Promise((resolve, reject) => {
				vote(id)
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
    voting
  }
}

export default useVoting