import { useRecoilState } from "recoil"
import { adminAddress, adminAddressCurrent } from "../store/form"
import { useCallback, useEffect } from "react"
import { getAddressCurrent } from "../services/blockchain"
import toast from "react-hot-toast"

const useCheckAdminWithAddress = () => {
  const [, setCheckedAdmin] = useRecoilState(adminAddress)
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
    setCheckedAdmin,
    checkedAdminCurrent,
  }
  
}

export default useCheckAdminWithAddress