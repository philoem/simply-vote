import { useState, useId } from 'react'
import './App.css'
import useConnectWallet from './hooks/useConnectWallet'
import useCutStringAfterSecondSpace from './hooks/useCutStringAfterSecondSpace'
import useCountDownSimulated from './hooks/useCountDownSimulated'
import Contract from '../../artifacts/contracts/Voting.sol/Voting.json'
import Button from './components/Button/index'
import Header from './components/Header/index'
import { ethers } from 'ethers'
import ModalWithActionButton from './components/ModalWithActionButton'
import Homepage from './components/Homepage'

function App() {
	const id = useId()
	const { isConnected, ethereum, voter } = useConnectWallet()
	const [responseVoter, setResponseVoter] = useState('')
	const cutStringAfterSecondSpace = useCutStringAfterSecondSpace(responseVoter)
	const { count, theWinnerIs, setIsCountdownActive } =
		useCountDownSimulated(cutStringAfterSecondSpace)

	const [isVoted, setIsVoted] = useState(false)
	const [nbrOfStarWArs, setNbrOfStarWArs] = useState(0)
	const [nbrStarTrek, setNbrStarTrek] = useState(0)

	/**
	 * Checks if a user has voted based on the given choice.
	 *
	 * @param {string} choice - The user's choice for voting.
	 * @return {Promise<void>} - A Promise that resolves to nothing.
	 */
	const hasVoted = async (choice: string): Promise<void> => {
		console.log('choice :>> ', choice)
		let signer
		let contract
		let voted
		if (ethereum) {
			const provider = new ethers.BrowserProvider(ethereum)
			signer = await provider.getSigner()
			const abi = Contract.abi
			contract = new ethers.Contract(signer.address, abi, signer)
			await contract.vote({
				gasLimit: 300000,
				gasPrice: ethers.parseUnits('100', 'gwei')
			})
			voted = await contract.vote('Star Wars', {
				gasLimit: 300000,
				gasPrice: ethers.parseUnits('100', 'gwei')
			})
		} else {
			console.log('ethereum is not defined')
		}
		switch (choice) {
			case 'choiceOne':
				console.log('contract :>> ', contract)
				console.log('signer?.address :>> ', signer?.address)
				console.log('voted :>> ', voted)
				// voted = await contract.vote('Star Wars', {
				//   gasLimit: 300000,
				//   gasPrice: ethers.parseUnits('100', 'gwei'),
				// })
				setNbrOfStarWArs(nbrOfStarWArs + 1)
				setIsVoted(true)
				setResponseVoter(`Star Wars ${id}`)
				setIsCountdownActive(true)
				break
			case 'choiceTwo':
				setNbrStarTrek(nbrStarTrek + 1)
				setIsVoted(true)
				setResponseVoter(`Star Trek ${id}`)
				setIsCountdownActive(true)
				break
		}
	}

	const reloadPage = () => {
		window.location.reload()
	}

	return (
		<div className='w-screen'>
			<div className='w-full h-screen bg-cover bg-[url("./assets/election.jpeg")]'>
				<div className='backdrop-blur-sm bg-white/30'>
					<Homepage />
					{isConnected && (
						<>
							<Header addressWallet={voter} />
							<ModalWithActionButton />
							{isVoted && (
								<>
									<p>Thank you for voting !</p>
									{count !== 0 && (
										<>
											<p>The result of the vote is coming soon</p>
											<div className='card-countdown'>
												<div className='dot-elastic'></div>
											</div>
										</>
									)}
									{count === 0 && (
										<>
											<Button
												text='Go to new vote'
												className='reload'
												onClick={() => reloadPage()}
											/>
											<h2
												className={`${
													nbrOfStarWArs > nbrStarTrek
														? 'font-winner-star-wars'
														: 'font-winner-star-trek'
												}`}
											>
												{theWinnerIs}
											</h2>
										</>
									)}
								</>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default App
