import { forwardRef } from 'react'
import { formatDate } from '../../utils/formatDate'
import ImageFiller from 'react-image-filler'
import useGetDetailsVote from './hooks/useGetDetailsVote'
import useDisplayAllVotes from './hooks/useDisplayAllVotes'
import useVoting from './hooks/useVoting'

const DisplayVote = forwardRef((props, ref) => {
	const { voting } = useVoting()
	const { openDetails, checkedAdminCurrent } = useGetDetailsVote(ref)
	const { fetchVotes } = useDisplayAllVotes()

	return (
		<div className='container mx-auto h-[370px] fixed bottom-3'>
			<div className='grid grid-cols-1 xl:grid-cols-2 pb-7 gap-[62px] sm:w-2/3 xl:w-5/6 mx-auto'>
				{fetchVotes?.map(({id, admin, title, description, startsAt, endsAt, link1, link2 }) => (
					<div className='card card-side bg-base-100 shadow-xl' key={id}>
						<figure>
							<div className='flex flex-col'>
								{link1 ? (
									<img
										src={link1}
										alt='image vote one'
										className='w-[160px] md:w-full h-[135px] rounded-[22px] mb-3 object-cover pt-[10px] pl-[10px]'
									/>
								) : (
									<div className='w-[160px] md:w-full h-[135px] rounded-[22px] mb-3 pt-[10px] pl-[10px]'>
										<ImageFiller 
											width={160} 
											height={135}
											background="#123456"
											color="#ffffff"
											text="Vote 1"
										/>
									</div>
								)}
								{link2 ? (
									<img
										src={link2}
										alt='image vote two'
										className='w-[160px] md:w-full h-[135px] rounded-[22px] mb-3 object-cover pt-[10px] pl-[10px]'
									/>
								) : (
									<div className='w-[160px] md:w-full h-[135px] rounded-[22px] mb-5 pt-[10px] pl-[10px]'>
										<ImageFiller 
											width={160} 
											height={135}
											background="#123456"
											color="#ffffff"
											text="Vote 2"
										/>
									</div>
								)}
							</div>
						</figure>
						<div className='card-body'>
							<h2 className='card-title text-2xl text-left'>{title}</h2>
							<p className='text-base text-left'>{description}</p>
							<p className='text-base text-left'>Début le: {formatDate(Number(startsAt))}</p>
							<p className='text-base text-left'>Fin le: {formatDate(Number(endsAt))}</p>
							<div className='card-actions justify-end'>
								{admin === checkedAdminCurrent ? (
									<button onClick={() => openDetails(Number(id))} className='btn btn-primary'>
										Modifier le vote
									</button>
								) : (
									<>
										<button onClick={() => voting(Number(id))} className='btn btn-primary'>
											Votez pour {id}
										</button>
										<button onClick={() => voting(Number(id))} className='btn btn-primary'>
											Votez pour {id}
										</button>
									</>
								)}
								
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
})

export default DisplayVote
