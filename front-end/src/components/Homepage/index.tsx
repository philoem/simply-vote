import useConnectWallet from '../../hooks/useConnectWallet'
import Button from '../Button'
import Toast from '../Toast'

const Homepage = () => {
	const { isConnected, voter, connectingWallet } = useConnectWallet()

	return (
		<>
			{!isConnected && !voter && (
				<div className='flex justify-center items-center h-screen'>
					<div className='md:container md:mx-auto prose'>
						<h1 className='font-sans text-6xl font-bold mb-4 text-gray-900'>Simply Vote</h1>
						<p className='font-sans text-lg text-gray-800'>
							Système de vote électronique connecté à la blockchain Ethereum.
						</p>
						<p className='font-sans text-lg text-gray-800'>
							Personnalisable, sécurisé et transparent.
						</p>
						<p className='font-sans text-lg mb-4 text-gray-800'>A vous de jouer!</p>
						<Button
							text='Connect your wallet'
							onClick={() => connectingWallet()}
							className='text-base btn btn-primary text-white bg-[#1B5CFE]'
						/>
					</div>
				</div>
			)}
			<Toast />
		</>
	)
}

export default Homepage
