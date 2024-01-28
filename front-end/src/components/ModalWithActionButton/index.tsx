import { FormEvent, useRef } from 'react'
import Button from '../Button'
import useHandleModalForm from './hooks/useHandleModalForm'

const ModalWithActionButton = () => {
	const myDialog = useRef<HTMLDialogElement>(null)
	const { handleChange, handleSubmit, valuesForm } = useHandleModalForm(myDialog)

	return (
		<>
			<Button
				text='Créer un nouveau vote'
				className='rounded-full text-base px-3 btn btn-outline btn-primary'
				onClick={() => myDialog.current?.showModal()}
			/>
			<dialog
				ref={myDialog}
				id='my_modal_5'
				className='modal modal-bottom sm:modal-middle z-50 w-full h-full'
			>
				<div className='modal-box'>
					<h3 className='font-bold text-lg text-left mb-7'>Création d'un nouveau vote</h3>
					<form
						method='dialog'
						className='flex flex-col justify-center items-start rounded-xl mt-5 mb-5'
					>
						<button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
						<input
							type='text'
							name='title'
							value={valuesForm?.title ?? ''}
							placeholder='Titre'
							onChange={handleChange}
							className='input input-bordered input-sm w-full max-w-lg rounded-lg mb-3'
							required
						/>
						<textarea
							placeholder='Description'
							name='description'
							value={valuesForm?.description ?? ''}
							onChange={handleChange}
							className='textarea textarea-bordered textarea-sm w-full max-w-lg rounded-lg mb-3'
							required
						/>
						<div className='flex flex-row w-full'>
							<input
								type='datetime-local'
								name='startsAt'
								value={valuesForm?.startsAt ?? ''}
								placeholder='Début'
								onChange={handleChange}
								className='input input-bordered input-sm w-full max-w-lg rounded-lg mb-3 mr-2'
								required
							/>
							<input
								type='datetime-local'
								name='endsAt'
								value={valuesForm?.endsAt ?? ''}
								placeholder='Fin'
								onChange={handleChange}
								className='input input-bordered input-sm w-full max-w-lg rounded-lg mb-3'
								required
							/>
						</div>
						<input
							type='url'
							name='link1'
							value={valuesForm?.link1 ?? ''}
							accept='image/*'
							placeholder="Url de l'image 1"
							onChange={handleChange}
							className='input input-bordered input-sm w-full max-w-lg rounded-lg mb-3 mr-2'
						/>
						<input
							type='url'
							name='link2'
							value={valuesForm?.link2 ?? ''}
							accept='image/*'
							placeholder="Url de l'image 2"
							onChange={handleChange}
							className='input input-bordered input-sm w-full max-w-lg rounded-lg mb-3'
						/>
						{valuesForm?.link1 && (
							<img
								src={valuesForm?.link1 ?? ''}
								alt='image'
								className='w-[160px] md:w-full h-[135px] rounded-lg mb-3 object-cover'
							/>
						)}
						{valuesForm?.link2 && (
							<img
								src={valuesForm?.link2 ?? ''}
								alt='image'
								className='w-[160px] md:w-full h-[135px] rounded-lg mb-3 object-cover'
							/>
						)}
					</form>
					<Button
						text='Créer le vote'
						className='btn btn-primary w-full'
						onClick={(e: FormEvent<Element>) => handleSubmit(e)}
					/>
				</div>
			</dialog>
		</>
	)
}

export default ModalWithActionButton
