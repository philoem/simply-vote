/**
 * Returns the first two words of a string, separated by a space.
 *
 * @param {string} str - The input string.
 * @return {string} - The modified string with only the first two words.
 */
const useCutStringAfterSecondSpace = (str: string): string => {
	const words = str.split(' ')
	if (words.length > 2) {
		return words.slice(0, 2).join(' ')
	}
	return str
}

export default useCutStringAfterSecondSpace
