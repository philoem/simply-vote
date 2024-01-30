import { RefObject } from 'react'
import { getDetailsVote } from '../../../services/blockchain'
import { useRecoilState } from 'recoil'
import { editingForm, formState } from '../../../store/form'
import toast from 'react-hot-toast'
import useCheckAdminWithAddress from '../../../hooks/useCheckAdminWithAddress'

const useGetDetailsVote = (ref: RefObject<HTMLDialogElement>) => {
	const { setCheckedAdmin, checkedAdminCurrent } = useCheckAdminWithAddress()
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
						setFetchVoteId(tx)
						setEditForm(true)
						setCheckedAdmin(tx?.admin ?? '')
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
		openDetails,
		checkedAdminCurrent,
	}
}

export default useGetDetailsVote
