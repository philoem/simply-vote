import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		ethereum: any
	}
}

/**
 * Hook for connecting a wallet.
 *
 * @return {Object} An object containing the isConnected flag, the ethereum object,
 *                  and the connectingWallet function.
 */
export default function useConnectWallet() {
	const [voter, setVoter] = useState('')
	const [isConnected, setIsConnected] = useState(false)
	const { ethereum } = window

	const changeAccount = useCallback(() => {
		if (ethereum) {
			if (ethereum.selectedAddress) {
				setVoter(ethereum.selectedAddress)
				setIsConnected(true)
			}
			ethereum.on('accountsChanged', (accounts: string[]) => {
				setVoter(accounts[0])
				setIsConnected(true)
			})
		}
	}, [ethereum])

	const checkIfGoodNetwork = useCallback(async () => {
		if (ethereum) {
			try {
				const chainId = await ethereum.request({ method: 'eth_chainId' })
				const sepoliaTestChainId = '0xaa36a7'
				if (chainId === sepoliaTestChainId) {
					console.log("Bravo!, you are on the correct network")
				} else {
					console.log("oulalal, switch to the correct network")
					await ethereum.request({
						method: "wallet_switchEthereumChain",
						params: [
							{
								chainId: "0xaa36a7" // Sepolia testnet chainId
							}
						]
					})
					location.reload()
				}
			} catch (error) {
				console.log(error)				
			}
		}
	}, [ethereum])

	useEffect(() => {
		changeAccount()	
	}, [changeAccount])

	useEffect(() => {
		checkIfGoodNetwork()
	}, [checkIfGoodNetwork])

	const connectingWallet = async () => {
		try {
			if (!ethereum) {
				toast.error('Veuillez installer Metamask')
				return
			}
			const accounts = await ethereum.request({
				method: 'eth_requestAccounts'
			})
			setVoter(accounts[0])
			setIsConnected(true)
			toast.success('Connecté!')
			location.reload()
		} catch (error) {
			console.log(error)
		}
	}

	const deconnectWallet = async () => {
		try {
			if (!ethereum) {
				toast.error('Veuillez installer Metamask')
				return
			}
			await ethereum.request({
				method: 'wallet_revokePermissions',
				params: [{ eth_accounts: {} }]
			})
			setIsConnected(false)
			toast.success('Déconnecté!')
			location.reload()
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if(ethereum) {
			ethereum.on('chainChanged', () => {
				location.reload()
			})
			ethereum.on('accountsChanged', () => {
				location.reload()
			})
		}
	}, [ethereum])

	return { isConnected, ethereum, voter, connectingWallet, deconnectWallet }
}
