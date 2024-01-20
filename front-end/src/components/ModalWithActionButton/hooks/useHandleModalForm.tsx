import { ChangeEvent, FormEvent, RefObject, useState } from 'react'
import { ModalParams } from '../../../utils/types'
import { createVote } from '../../../services/blockchain'
import toast from 'react-hot-toast'

const useHandleModalForm = (myDialog: RefObject<HTMLDialogElement>) => {
	const [modalParams, setModalParams] = useState<ModalParams>({
		title: '',
		description: '',
		startsAt: '',
		endsAt: '',
		link1: '',
		link2: ''
	})
	// Only for test images
	// const imgs = [
	// 	'https://images.radio-canada.ca/w_1250,h_703/v1/ici-tele/16x9/trouver-nemo-5.jpg',
	// 	'https://ultramarina.com/thumb/ar__x/f__jpg/h__288/q__60/w__420/zc__1/src/fichier/p_item/101307/item_img_fr_bahamas_plongee_bimini_requin_marteau_shutterstock_martin_p_332671040.jpg',
	// ];

	/**
	 * Handles the form submission event.
	 *
	 * @param {FormEvent} e - The form event.
	 * @return {Promise<void>} A promise that resolves when the submission is complete.
	 */
	const handleSubmit = async (e: FormEvent): Promise<void> => {
		e.preventDefault()
		if (
			!modalParams.title ||
			!modalParams.description ||
			!modalParams.startsAt ||
			!modalParams.endsAt
		)
			return

		modalParams.startsAt = new Date(modalParams.startsAt).getTime().toString()
		modalParams.endsAt = new Date(modalParams.endsAt).getTime().toString()

		myDialog.current?.close()
		await toast.promise(
			new Promise((resolve, reject) => {
				createVote(modalParams)
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
				success: 'Nouveau vote crée!',
				error: `Erreur`
			}
		)
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setModalParams({
			...modalParams,
			[name]: value
		})
	}

	return { handleSubmit, handleChange, modalParams }
}

export default useHandleModalForm
