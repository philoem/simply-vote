import toast from 'react-hot-toast'
import { getDetailsVote } from '../../../services/blockchain'
import { useRecoilState } from 'recoil'
import { editingForm, formState } from '../../../store/form'
import { RefObject } from 'react'

const useGetDetailsVote = (ref: RefObject<HTMLDialogElement>) => {
	const [, setFetchVoteId] = useRecoilState(formState)
	const [, setEditForm] = useRecoilState(editingForm)

	const openDetails = (id: number) => {
		getDetails(id)
		if(ref && ref.current) ref?.current?.showModal()
	}

	const getDetails = async (id: number) => {
		await toast.promise(
			new Promise((resolve, reject) => {
				getDetailsVote(id)
					.then((tx) => {
						console.log('tx :>> ', tx)
						setFetchVoteId(tx)
						setEditForm(true)
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
		openDetails
	}
}

export default useGetDetailsVote
