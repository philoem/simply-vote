import { useCallback, useEffect } from "react"
import { useRecoilState } from "recoil"
import { adminAddressCurrent } from "../store/form"
import { getAddressCurrent } from "../services/blockchain"
import toast from "react-hot-toast"

const useCheckAdminWithAddress = () => {
	const [checkedAdminCurrent, setCheckedAdminCurrent] = useRecoilState(adminAddressCurrent)

	const getAddressOfSignerCurrent = useCallback(async () => {
		(async () => {
			try {
				const tx = await getAddressCurrent()
				setCheckedAdminCurrent(tx)
				return tx
			} catch (error) {
				toast.error('Erreur de récupération de l\'adresse')
				console.log('error :>> ', error)
				throw error
			}
		})()
	}, [setCheckedAdminCurrent])

	useEffect(() => {
		getAddressOfSignerCurrent()
	}, [getAddressOfSignerCurrent])

  return {
    checkedAdminCurrent,
  }
  
}

export default useCheckAdminWithAddress