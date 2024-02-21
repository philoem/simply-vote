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
	const myDialog = useRef<HTMLButtonElement>(null)

	return (
		<div className='backdrop-blur-sm'>
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
	)
}

export default App
