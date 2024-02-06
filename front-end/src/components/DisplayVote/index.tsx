import { forwardRef } from 'react'
import { formatDate } from '../../utils/formatDate'
import ImageFiller from 'react-image-filler'
import useGetDetailsVote from './hooks/useGetDetailsVote'
import useDisplayAllVotes from './hooks/useDisplayAllVotes'
import useVoting from './hooks/useVoting'
import useWinnerIs from './hooks/useWinnerIs'

const DisplayVote = forwardRef((_props, ref) => {
	const { voting, checkTimeNotEnded, voterHasVoted } = useVoting()
	const { openDetails, checkedAdminCurrent } = useGetDetailsVote(ref)
	const { fetchVotes } = useDisplayAllVotes()
	// const { getWinnerIs } = useWinnerIs()
	// console.log('getWinnerIs :>> ', getWinnerIs(3));

	return (
		<div className='container mx-auto h-[370px] fixed bottom-3'>
			<div className='grid grid-cols-1 xl:grid-cols-2 pb-7 gap-[62px] sm:w-2/3 xl:w-5/6 mx-auto'>
				{fetchVotes?.map(({id, admin, title, description, startsAt, endsAt, link1, link2 }) => {
					return (
						<div className='card card-side bg-base-100 shadow-xl' key={id}>
							<figure>
								<div className='flex flex-col'>
									{link1 ? (
										<img
											src={link1}
											alt='image vote one'
											className='w-[160px] h-[135px] rounded-[22px] mb-3 object-cover pt-0 pl-0 ml-1.5 mt-2'
										/>
									) : (
										<div className='w-[160px] h-[135px] rounded-[22px] mb-3'>
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
											className='w-[160px] h-[135px] rounded-[22px] mb-3 object-cover pt-0 pl-0 ml-1.5 mt-2'
										/>
									) : (
										<div className='w-[160px] h-[135px] rounded-[22px] mt-3'>
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
										<>
											{checkTimeNotEnded(Number(endsAt)) ? (
												<button onClick={() => openDetails(Number(id))} className='btn btn-primary' disabled={false}>
													Modifier le vote
												</button>
											) : (
												<h3 className='font-bold text-red-500 text-lg text-right'>Le vote est terminé</h3>
											)}
										</>
									) : (
										<>
											{checkTimeNotEnded(Number(endsAt)) ? (
												<>
													<button
														onClick={() => voting(1, checkedAdminCurrent)}
														className='btn btn-primary'
														disabled={voterHasVoted}
													>
														Votez pour 1
													</button>
													<button 
														onClick={() => voting(2, checkedAdminCurrent)}
														className='btn btn-primary'
														disabled={voterHasVoted}
													>
														Votez pour 2
													</button>
												</>
											) : (
												<h3 className='font-bold text-red-500 text-lg text-right'>Le vote est terminé</h3>
											)}
										</>
									)}
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
})

export default DisplayVote
