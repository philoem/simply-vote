/**
 * Formats a number with a leading zero if it is less than 10.
 *
 * @param {number} value - The number to be formatted
 * @return {string} The formatted number as a string
 */
const formatWithLeadingZero = (value: number): string => {
  return value < 10 ? `0${value}` : `${value}`;
};

/**
 * Formats a timestamp into a string representing the date and time.
 *
 * @param {number} timestamp - The timestamp to be formatted
 * @return {string} The formatted date and time string
 */
export const formatDate = (timestamp: number): string => {
	const date = new Date(timestamp)
	const day = formatWithLeadingZero(date.getDate())
	const month = formatWithLeadingZero(date.getMonth() + 1)
	const year = date.getFullYear()
	const hours = formatWithLeadingZero(date.getHours());
  const minutes = formatWithLeadingZero(date.getMinutes());
	return `${day}/${month}/${year} à ${hours}:${minutes}`
}