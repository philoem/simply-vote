import { useRecoilValue } from 'recoil'
import { formatDate } from '../../services/blockchain'
import { VoteStruct } from '../../utils/types'
import useGetDetailsVote from './hooks/useGetDetailsVote'
import { formState } from '../../store/form'

const DisplayVote = ({ votes }: { votes: VoteStruct[] }) => {
	const { getDetails } = useGetDetailsVote()
	const valuesForm = useRecoilValue(formState)
	console.log('valuesForm DisplayVote :>> ', valuesForm);

	return (
		<div className='container mx-auto h-[370px] fixed bottom-3'>
			<div className='grid grid-cols-1 xl:grid-cols-2 pb-7 gap-[62px] sm:w-2/3 xl:w-5/6 mx-auto'>
				{votes?.map((vote, index) => (
				<div className='card card-side bg-base-100 shadow-xl' key={index}>
						<figure>
							<div className='flex flex-col'>
								<img
									src={vote.link1}
									alt='Movie'
									className='w-[160px] md:w-full h-[135px] rounded-[22px] mb-3 object-cover pt-[10px] pl-[10px]'
								/>
								<img
									src={vote.link2}
									alt='Movie'
									className='w-[160px] md:w-full h-[135px] rounded-[22px] mb-3 object-cover pt-[10px] pl-[10px]'
								/>
							</div>
						</figure>
						<div className='card-body'>
							<h2 className='card-title text-2xl text-left'>{vote.title}</h2>
							<p className='text-base text-left'>{vote.description}</p>
							<p className='text-base text-left'>Début le: {formatDate(Number(vote.startsAt))}</p>
							<p className='text-base text-left'>Fin le: {formatDate(Number(vote.endsAt))}</p>
							<div className='card-actions justify-end'>
								<button onClick={() => getDetails(Number(valuesForm?.id))} className='btn btn-primary'>
									Voir les détails
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default DisplayVote
