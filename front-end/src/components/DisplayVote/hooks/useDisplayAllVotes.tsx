import { useCallback, useEffect } from "react"
import { getVotes } from "../../../services/blockchain"
import { useRecoilState } from "recoil"
import { formStateArray } from "../../../store/form"
import toast from "react-hot-toast"

const useDisplayAllVotes = () => {
  const [fetchVotes, setFetchVotes] = useRecoilState(formStateArray)	

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

	useEffect(() => {	
		const interval = setInterval(() => {
			allVotes()
		}, 60000)
	
		return () => clearInterval(interval)
	}, [allVotes, fetchVotes])
	
  return {
    allVotes,
		fetchVotes,
  }
  
}

export default useDisplayAllVotes