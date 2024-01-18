import Button from '../Button'

const Header = ({
	addressWallet,
	isConnected
}: { addressWallet: string; isConnected: boolean }) => {
	return (
		<div className='container mx-auto'>
			{isConnected && (
				<nav className='h-[80px] flex justify-between items-center border border-gray-400 px-3 rounded-full fixed top-2 w-11/12'>
					<h1 className='font-sans text-4xl text-center font-bold pl-2 text-gray-900'>
						Simply Vote
					</h1>
					<Button
						disabled
						text={`${addressWallet?.substring(0, 7)}...${addressWallet?.substring(
							addressWallet.length - 3
						)}, vous êtes connecté`}
						className='w-2/12 px-3 rounded-full text-sm bg-[#1B5CFE]'
					/>
				</nav>
			)}
		</div>
	)
}

export default Header
