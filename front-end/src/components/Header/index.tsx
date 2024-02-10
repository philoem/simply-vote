import useConnectWallet from '../../hooks/useConnectWallet'
import Button from '../Button'

const Header = ({ addressWallet }: { addressWallet: string }) => {
	const { voter, connectingWallet, deconnectWallet } = useConnectWallet()

	return (
		<nav className='h-[80px] flex justify-between items-center border border-gray-400 px-4 rounded-full fixed top-2 w-[96%] ml-[2%]'>
			<h1 className='font-sans text-4xl text-center font-bold pl-2 text-gray-900'>Simply Vote</h1>
			{voter ? (
				<>
				<Button
					text='Deconnect your wallet'
					className='w-auto px-1 rounded-full text-sm lg:text-base bg-[#1B5CFE] h-[50px] tracking-wide pl-[10px] pr-[10px]'
					onClick={deconnectWallet}
				/>
					<Button
						disabled
						text={`${addressWallet?.substring(0, 7)}...${addressWallet?.substring(
							addressWallet.length - 3
						)}, connecté`}
						className='w-auto px-1 rounded-full text-sm lg:text-base bg-white h-[50px] border hover:border-white text-[#1B5CFE] tracking-wide pl-[10px] pr-[10px]'
					/>
				</>
			) : (
				<Button
					text='Connect your wallet'
					className='w-auto px-1 rounded-full text-sm lg:text-base bg-[#1B5CFE] h-[50px] tracking-wide pl-[10px] pr-[10px]'
					onClick={connectingWallet}
				/>
			)}
		</nav>
	)
}

export default Header
