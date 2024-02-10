import { forwardRef, useMemo } from 'react'
import { formatDate } from '../../utils/formatDate'
import ImageFiller from 'react-image-filler'
import useGetDetailsVote from './hooks/useGetDetailsVote'
import useDisplayAllVotes from './hooks/useDisplayAllVotes'
import useVoting from './hooks/useVoting'
import useWinnerIs from './hooks/useWinnerIs'

const DisplayVote = forwardRef((_props, ref) => {
	const { voting, checkTimeNotEnded, voterHasVoted, checkVoterHasVoted, verifyAddressVoter, verifyAddressVoterForOwner } = useVoting()
	const { openDetails, checkedAdminCurrent } = useGetDetailsVote(ref)
	const { fetchVotes } = useDisplayAllVotes()
	const { renderingWinner, winner } = useWinnerIs()
	

	const renderVotes = useMemo(() => {
		return (
			<>
				{fetchVotes?.map(({id, admin, title, description, startsAt, endsAt, link1, link2 }) => {
					console.log('startsAt :>> ', startsAt);
					console.log('endsAt :>> ', endsAt);
					renderingWinner(Number(id))
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
												<button
													onClick={() => openDetails(Number(id))}
													className='btn btn-primary'
													disabled={verifyAddressVoterForOwner(Number(id))}
												>
													{verifyAddressVoterForOwner(Number(id)) ? 'Vote en cours' : 'Modifier le vote'}
												</button> 
											) : (
												<h4 className='font-bold text-red-500 text-lg text-right'>
													{winner}
												</h4>
											)}
										</>
									) : (
										<>
											{checkTimeNotEnded(Number(endsAt)) ? (
												<>
													<button
														onClick={() => voting(Number(id), 1, checkedAdminCurrent)}
														className='btn btn-primary'
														disabled={verifyAddressVoter(Number(id), checkedAdminCurrent)}
													>
														Votez pour 1
													</button>
													<button 
														onClick={() => voting(Number(id), 2, checkedAdminCurrent)}
														className='btn btn-primary'
														disabled={verifyAddressVoter(Number(id), checkedAdminCurrent)}
													>
														Votez pour 2
													</button>
												</>
											) : (
												<h4 className='font-bold text-red-500 text-lg text-left'>
													{`Résultat du vote : ${winner}`}
												</h4>
											)}
										</>
									)}
								</div>
							</div>
						</div>
					)
				})}
			</>
		)
	}, [fetchVotes, renderingWinner, checkedAdminCurrent, checkTimeNotEnded, verifyAddressVoterForOwner, winner, verifyAddressVoter, openDetails, voting])


	return (
		<div className='container mx-auto h-[370px] mt-8'>
			<div className='grid grid-cols-1 xl:grid-cols-2 pb-7 gap-[62px] sm:w-2/3 xl:w-5/6 mx-auto'>
				{renderVotes}
			</div>
		</div>
	)
})

export default DisplayVote
