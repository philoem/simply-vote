import { ChangeEvent, FormEvent, RefObject } from 'react'
import { createVote } from '../../../services/blockchain'
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
	 * Handles the form submission event.
	 *
	 * @param {FormEvent} e - The form event.
	 * @return {Promise<void>} A promise that resolves when the submission is complete.
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
			
		const startsAt = String(valuesForm.startsAt)
		const timestampStartsAt = Date.parse(startsAt)
		const bigIntValueStartsAt = BigInt(timestampStartsAt)
		const endsAt = String(valuesForm.endsAt)
		const timestampEndsAt = Date.parse(endsAt)
		const bigIntValueEndsAt = BigInt(timestampEndsAt)

		const values = {
			title: valuesForm.title,
			description: valuesForm.description,
			startsAt: Number(bigIntValueStartsAt),
			endsAt: Number(bigIntValueEndsAt),
			link1: valuesForm.link1,
			link2: valuesForm.link2
		}

		ref.current?.close()
		await toast.promise(
			new Promise((resolve, reject) => {
				createVote(values)
					.then((tx) => {
						console.log('tx :>> ', tx)
						resolve(tx)
						return allVotes()
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
		setText((prevText) => ({
			...prevText,
			[name]: value
		}))
	}

	return { handleSubmit, handleChange, valuesForm, fetchVoteId, editedForm, checkAdminCurrent }
}

export default useHandleModalForm
