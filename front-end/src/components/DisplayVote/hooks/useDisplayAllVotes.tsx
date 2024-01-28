import { useCallback, useEffect } from "react"
import { getVotes } from "../../../services/blockchain"
import { useRecoilState } from "recoil"
import { formStateArray } from "../../../store/form"
import toast from "react-hot-toast"

const useDisplayAllVotes = () => {
  const [, setFetchVotes] = useRecoilState(formStateArray)

  const allVotes = useCallback(async () => {
			(async () => {
				try {
					const tx = await getVotes()
					setFetchVotes(tx)
					return tx
				} catch (error) {
          toast.error('Erreur de récupération des votes')
					console.log('error :>> ', error)
					throw error
				}
			})()
	}, [setFetchVotes])

  useEffect(() => {
    allVotes()
  }, [allVotes])  

  return {
    allVotes
  }
  
}

export default useDisplayAllVotes