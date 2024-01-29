import './App.css'
import useConnectWallet from './hooks/useConnectWallet'
import Header from './components/Header/index'
import ModalWithActionButton from './components/ModalWithActionButton'
import Homepage from './components/Homepage'
import DisplayVote from './components/DisplayVote'
import ButtonCreateVote from './components/ButtonCreateVote'
import { useRef } from 'react'

function App() {
	const { isConnected, voter } = useConnectWallet()
	const myDialog = useRef<HTMLDialogElement>(null)

	return (
		<div className='w-screen'>
			<div className='w-full h-screen bg-cover bg-[url("./assets/election.jpeg")]'>
				<div className='backdrop-blur-sm bg-white/30'>
					<Homepage />
					{isConnected && (
						<>
							<Header addressWallet={voter} />
							<div className='flex flex-col justify-center items-center h-screen'>
								<ButtonCreateVote ref={myDialog}/>
								<ModalWithActionButton ref={myDialog}/>
								<DisplayVote ref={myDialog}/>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default App
