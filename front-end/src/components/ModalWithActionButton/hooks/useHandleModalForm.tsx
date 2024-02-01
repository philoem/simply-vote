import { ChangeEvent, FormEvent, RefObject, useEffect, useState } from 'react'
import { createVote, updateVote } from '../../../services/blockchain'
import { useRecoilValue } from 'recoil'
import { adminAddressCurrent, editingForm, formState } from '../../../store/form'
import { ModalParams } from '../../../utils/types'
import useDisplayAllVotes from '../../DisplayVote/hooks/useDisplayAllVotes'
import toast from 'react-hot-toast'

const useHandleModalForm = (ref: RefObject<HTMLDialogElement>) => {
	const valuesForm = useRecoilValue(formState)
	const fetchVoteId = useRecoilValue(formState)
	const editedForm = useRecoilValue(editingForm)
	const checkAdminCurrent = useRecoilValue(adminAddressCurrent)
	const { allVotes } = useDisplayAllVotes()
	const [voteData, setVoteData] = useState<ModalParams>({
		id: '',
		title: '',
		description: '',
		startsAt: '',
		endsAt: '',
		link1: '',
		link2: ''
	})

	useEffect(() => {
		if(editedForm) {
			setVoteData({
				id: fetchVoteId.id ?? '',
				title: fetchVoteId.title ?? '',
				description: fetchVoteId.description ?? '',
				startsAt: fetchVoteId.startsAt ?? '',
				endsAt: fetchVoteId.endsAt ?? '',
				link1: fetchVoteId.link1 ?? '',
				link2: fetchVoteId.link2 ?? ''
			})
		} else {
			setVoteData({
				id: '',
				title: '',
				description: '',
				startsAt: '',
				endsAt: '',
				link1: '',
				link2: ''
			})
		}
	}, [editedForm, fetchVoteId])
	
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
			const startsAt = String(voteData.startsAt)
			const timestampStartsAt = Date.parse(startsAt)
			const bigIntValueStartsAt = BigInt(timestampStartsAt)
			const endsAt = String(voteData.endsAt)
			const timestampEndsAt = Date.parse(endsAt)
			const bigIntValueEndsAt = BigInt(timestampEndsAt)

			values = {
				title: voteData.title,
				description: voteData.description,
				startsAt: Number(bigIntValueStartsAt),
				endsAt: Number(bigIntValueEndsAt),
				link1: voteData.link1,
				link2: voteData.link2
			}
		} else {
			valuesUpdated = {
				id: Number(voteData.id),
				title: voteData.title,
				description: voteData.description,
				startsAt: Number(voteData.startsAt),
				endsAt: Number(voteData.endsAt),
				link1: voteData.link1,
				link2: voteData.link2
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
		setVoteData((prevText) => ({
			...prevText,
			[name]: value
		}))
	}

	return { handleSubmit, handleChange, fetchVoteId, editedForm, checkAdminCurrent, voteData }
}

export default useHandleModalForm
