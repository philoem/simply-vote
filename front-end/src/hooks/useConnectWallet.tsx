import { useState } from 'react'
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

	const connectingWallet = async () => {
		try {
			if (!ethereum) {
				toast.error('Get MetaMask!')
				return
			}
			const accounts = await ethereum.request({
				method: 'eth_requestAccounts'
			})
			setVoter(accounts[0])
			setIsConnected(true)
			toast.success('Connected!')
		} catch (error) {
			console.log(error)
		}
	}

	return { isConnected, ethereum, voter, connectingWallet }
}
