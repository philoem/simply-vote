import { FormEvent, forwardRef } from 'react'
import Button from '../Button'
import useHandleModalForm from './hooks/useHandleModalForm'
import { formattedDate } from '../../utils/formatDate'

const ModalWithActionButton = forwardRef((props, ref) => {
	const { handleChange, handleSubmit, fetchVoteId, editedForm, checkAdminCurrent, voteData } = useHandleModalForm(ref)
	
	return (
		<>
			<dialog
				ref={ref}
				id='my_modal_5'
				className='modal modal-bottom sm:modal-middle z-50 w-full h-full'
			>
				<div className='modal-box'>
					<h3 className='font-bold text-lg text-left mb-7'>
						{editedForm ? `Modification du vote n°${voteData.id}` : 'Création d\'un nouveau vote'}
					</h3>
					<form
						method='dialog'
						className='flex flex-col justify-center items-start rounded-xl mt-5 mb-5'
					>
						<button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
						<input
							type='text'
							name='title'
							value={voteData.title}
							placeholder='Titre'
							onChange={handleChange}
							className='input input-bordered input-sm w-full max-w-lg rounded-lg mb-3'
							required
						/>
						<textarea
							placeholder='Description'
							name='description'
							value={voteData.description}
							onChange={handleChange}
							className='textarea textarea-bordered textarea-sm w-full max-w-lg rounded-lg mb-3'
							required
						/>
						<div className='flex flex-row w-full'>
							<input
								type='datetime-local'
								name='startsAt'
								value={!editedForm ? voteData.startsAt : formattedDate(Number(voteData.startsAt)) ?? ''}
								placeholder='Début'
								onChange={handleChange}
								className='input input-bordered input-sm w-full max-w-lg rounded-lg mb-3 mr-2'
								required
							/> 
							<input
								type='datetime-local'
								name='endsAt'
								value={!editedForm ? voteData.endsAt : formattedDate(Number(voteData.endsAt)) ?? ''}
								placeholder='Fin'
								onChange={handleChange}
								className='input input-bordered input-sm w-full max-w-lg rounded-lg mb-3'
								required
							/>
						</div>
						<input
							type='url'
							name='link1'
							value={voteData.link1}
							accept='image/*'
							placeholder="Url de l'image 1"
							onChange={handleChange}
							className='input input-bordered input-sm w-full max-w-lg rounded-lg mb-3 mr-2'
						/>
						<input
							type='url'
							name='link2'
							value={voteData.link2}
							accept='image/*'
							placeholder="Url de l'image 2"
							onChange={handleChange}
							className='input input-bordered input-sm w-full max-w-lg rounded-lg mb-3'
						/>
						{voteData.link1 && (
							<img
								src={voteData.link1}
								alt='image'
								className='w-[160px] md:w-full h-[135px] rounded-lg mb-3 object-cover'
							/>
						)}
						{voteData.link2 && (
							<img
								src={voteData.link2}
								alt='image'
								className='w-[160px] md:w-full h-[135px] rounded-lg mb-3 object-cover'
							/>
						)}
					</form>
					<Button
						text={fetchVoteId.admin === checkAdminCurrent && editedForm ?'Modifier le vote' : 'Créer le vote'}
						className='btn btn-primary w-full'
						onClick={(e: FormEvent<Element>) => handleSubmit(e) }
					/>	
				</div>
			</dialog>
		</>
	)
})

export default ModalWithActionButton
