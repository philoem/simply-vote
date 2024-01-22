import './App.css'
import useConnectWallet from './hooks/useConnectWallet'
import Header from './components/Header/index'
import ModalWithActionButton from './components/ModalWithActionButton'
import Homepage from './components/Homepage'
import DisplayVote from './components/DisplayVote'
import arrayVotesMock from './mocks/votes'

function App() {
	const { isConnected, voter } = useConnectWallet()

	return (
		<div className='w-screen'>
			<div className='w-full h-screen bg-cover bg-[url("./assets/election.jpeg")]'>
				<div className='backdrop-blur-sm bg-white/30'>
					<Homepage />
					{isConnected && (
						<>
							<Header addressWallet={voter} />
							<div className='flex flex-col justify-center items-center h-screen'>
								<ModalWithActionButton />
								<DisplayVote votes={arrayVotesMock} />
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default App
