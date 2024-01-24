import { ChangeEvent, FormEvent, RefObject, useState } from 'react'
import { createVote, getVotes } from '../../../services/blockchain'
import toast from 'react-hot-toast'
import { useRecoilState, useRecoilValue } from 'recoil'
import { formState } from '../../../store/form'

const useHandleModalForm = (myDialog: RefObject<HTMLDialogElement>) => {
	const [, setText] = useRecoilState(formState)
	const [fetchVotes, setFetchVotes] = useRecoilState(formState)
	const valuesForm = useRecoilValue(formState)
	const [incrementId, setIncrementId] = useState(1)
	console.log('fetchVotes :>> ', fetchVotes);
	
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

		setIncrementId(prevId => prevId + 1)

		const values = {
			id: incrementId,
			title: valuesForm.title,
			description: valuesForm.description,
			startsAt: Number(bigIntValueStartsAt),
			endsAt: Number(bigIntValueEndsAt),
			link1: valuesForm.link1,
			link2: valuesForm.link2
		}
		console.log('values :>> ', values);

		myDialog.current?.close()
		await toast.promise(
			new Promise((resolve, reject) => {
				createVote(values)
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
		setText((prevText) => ({
			...prevText,
			[name]: value
		}))
	}

	const allVotes = async () => {
		await toast.promise(
			(async () => {
				try {
					const tx = await getVotes()
					setFetchVotes(tx)
					console.log('tx :>> ', tx)
					return tx
				} catch (error) {
					console.log('error :>> ', error)
					throw error
				}
			})(),
			{
				loading: 'En cours...',
				success: 'Votes récupérés!',
				error: `Erreur de récupération des votes`
			}
		)
		// await toast.promise(
		// 	new Promise((resolve, reject) => {
		// 		return getVotes()
		// 			.then((tx) => {
		// 				console.log('tx :>> ', tx)
		// 				resolve(tx)
		// 			})
		// 			.catch((error) => {
		// 				reject(error)
		// 				console.log('error :>> ', error)
		// 			})
		// 	}),
		// 	{
		// 		loading: 'En cours...',
		// 		success: 'Nouveau vote crée!',
		// 		error: `Erreur`
		// 	}
		// )
	}

	return { handleSubmit, handleChange, valuesForm, allVotes }
}

export default useHandleModalForm
