import { ChangeEvent, FormEvent, RefObject } from 'react'
import { createVote, updateVote } from '../../../services/blockchain'
import { useRecoilState, useRecoilValue } from 'recoil'
import { adminAddressCurrent, editingForm, formState } from '../../../store/form'
import toast from 'react-hot-toast'
import useDisplayAllVotes from '../../DisplayVote/hooks/useDisplayAllVotes'

const useHandleModalForm = (ref: RefObject<HTMLDialogElement>) => {
	const [, setText] = useRecoilState(formState)
	const valuesForm = useRecoilValue(formState)
	const fetchVoteId = useRecoilValue(formState)
	const editedForm = useRecoilValue(editingForm)
	const checkAdminCurrent = useRecoilValue(adminAddressCurrent)
	const { allVotes } = useDisplayAllVotes()
	
		/**
	 * Handle the form submission and perform various operations based on the form values.
	 *
	 * @param {FormEvent} e - the form event object
	 * @return {Promise<void>} a promise that resolves to void
	 */
	const handleSubmit = async (e: FormEvent): Promise<void> => {
		e.preventDefault()
		if (
			!valuesForm.title ||
			!valuesForm.description ||
			!valuesForm.startsAt ||
			!valuesForm.endsAt
		)
			return
			
		let values: {
			title: string
			description: string
			startsAt: number
			endsAt: number
			link1?: string | undefined
			link2?: string | undefined
		}
		let valuesUpdated: {
			id: number
			title: string
			description: string
			startsAt: number
			endsAt: number
			link1?: string | undefined
			link2?: string | undefined
		}

		if(!editedForm) {	
			const startsAt = String(valuesForm.startsAt)
			const timestampStartsAt = Date.parse(startsAt)
			const bigIntValueStartsAt = BigInt(timestampStartsAt)
			const endsAt = String(valuesForm.endsAt)
			const timestampEndsAt = Date.parse(endsAt)
			const bigIntValueEndsAt = BigInt(timestampEndsAt)

			values = {
				title: valuesForm.title,
				description: valuesForm.description,
				startsAt: Number(bigIntValueStartsAt),
				endsAt: Number(bigIntValueEndsAt),
				link1: valuesForm.link1,
				link2: valuesForm.link2
			}
		} else {
			valuesUpdated = {
				id: Number(valuesForm.id),
				title: valuesForm.title,
				description: valuesForm.description,
				startsAt: Number(valuesForm.startsAt),
				endsAt: Number(valuesForm.endsAt),
				link1: valuesForm.link1,
				link2: valuesForm.link2
			}		
		}

		ref.current?.close()
		await toast.promise(
			new Promise((resolve, reject) => {
				if(!editedForm) { 
					createVote(values)
						.then((tx) => {
							resolve(tx)
							return allVotes()
						})
						.catch((error) => {
							reject(error)
							console.log('error :>> ', error)
						})
				} else {
					updateVote(valuesUpdated)
						.then((tx) => {
							resolve(tx)
							return allVotes()
						})
						.catch((error) => {
							reject(error)
							console.log('error update :>> ', error)
						})
				}
			}),
			{
				loading: 'En cours...',
				success: !editedForm ? 'Nouveau vote crée!' : 'Modification du vote reussie!',
				error: `Erreur`
			}
		)
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setText((prevText) => ({
			...prevText,
			[name]: value
		}))
	}

	return { handleSubmit, handleChange, valuesForm, fetchVoteId, editedForm, checkAdminCurrent }
}

export default useHandleModalForm
