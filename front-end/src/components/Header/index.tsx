import './index.css'

const Header = ({
	addressWallet,
	isConnected
}: { addressWallet: string; isConnected: boolean }) => {
	return (
		<>
			{isConnected && (
				<header className='header'>
					<div className='content-header'>
						<h1 className='title-header'>Simply Vote</h1>
						<div className='address-header'>
							{`${addressWallet?.substring(0, 8)}...${addressWallet?.substring(
								addressWallet.length - 3
							)}, vous êtes connecté`}
						</div>
					</div>
				</header>
			)}
		</>
	)
}

export default Header
