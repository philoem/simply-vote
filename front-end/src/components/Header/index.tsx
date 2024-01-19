import useConnectWallet from '../../hooks/useConnectWallet'
import Button from '../Button'

const Header = ({ addressWallet }: { addressWallet: string }) => {
	const { voter, connectingWallet } = useConnectWallet()

	return (
		<div className='container mx-auto'>
			<nav className='h-[80px] flex justify-between items-center border border-gray-400 px-3 rounded-full fixed top-2 w-5/6'>
				<h1 className='font-sans text-4xl text-center font-bold pl-2 text-gray-900'>Simply Vote</h1>
				{voter ? (
					<Button
						disabled
						text={`${addressWallet?.substring(0, 7)}...${addressWallet?.substring(
							addressWallet.length - 3
						)} connecté`}
						className='w-2/12 px-3 rounded-full text-sm bg-[#1B5CFE]'
					/>
				) : (
					<Button
						text='Connect your wallet'
						className='w-2/12 px-3 rounded-full text-sm bg-[#1B5CFE]'
						onClick={() => connectingWallet()}
					/>
				)}
			</nav>
		</div>
	)
}

export default Header
