import { useEffect, useState } from 'react'

type ButtonProps = {
	text: string
	onClick: () => void
	className?: string
	disabled?: boolean
}

/**
 * Renders a button component with the given text, onClick handler, className, and disabled state.
 *
 * @param {ButtonProps} text - The text to display on the button.
 * @param {ButtonProps} onClick - The function to be called when the button is clicked.
 * @param {ButtonProps} className - The CSS class name(s) to apply to the button.
 * @param {ButtonProps} disabled - A boolean value indicating whether the button is disabled.
 * @return {JSX.Element} The rendered button component.
 */
const Button = ({ text, onClick, className, disabled }: ButtonProps): JSX.Element => {
	const [, setHover] = useState(false)

	useEffect(() => {
		setHover(false)
	}, [disabled])

	return (
		<button
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			className={className}
			onClick={onClick}
			disabled={disabled}
		>
			{text}
		</button>
	)
}

export default Button