import { Toaster } from 'react-hot-toast'

/**
 * Renders a Toast component.
 *
 * @return {JSX.Element} The rendered Toast component.
 */
const Toast = (): JSX.Element => {
	return (
		<Toaster
			toastOptions={{
				success: {
					style: {
						background: 'green'
					}
				},
				error: {
					style: {
						background: 'red'
					}
				}
			}}
		/>
	)
}

export default Toast
