import { useState, useEffect } from 'react'

/**
 * Simulates a countdown with a specified duration and announces the winner.
 *
 * @param {string} cutStringAfterSecondSpace - The string that will be cut after the second space.
 * @return {object} - An object containing the current count, the winner announcement, and a function to control the countdown.
 */
const useCountDownSimulated = (cutStringAfterSecondSpace: string) => {
	const [count, setCount] = useState(10)
	const [theWinnerIs, setTheWinnerIs] = useState('')
	const [isCountdownActive, setIsCountdownActive] = useState(false)

	useEffect(() => {
		if (isCountdownActive && count === 0) {
			setTheWinnerIs(`The winner is    :    ${cutStringAfterSecondSpace}`)
			return
		}
		if (isCountdownActive) {
			const interval = setInterval(() => {
				setCount((prevCount) => prevCount - 1)
			}, 1000)

			return () => {
				clearInterval(interval)
			}
		}
	}, [count, cutStringAfterSecondSpace, isCountdownActive])

	return { count, theWinnerIs, setIsCountdownActive }
}

export default useCountDownSimulated
