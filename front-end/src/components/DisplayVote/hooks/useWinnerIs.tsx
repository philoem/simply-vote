import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { renderWinner } from "../../../services/blockchain"
import { formStateArray } from "../../../store/form";

const useWinnerIs = () => {
  const [fetchVotes] = useRecoilState(formStateArray)
  const [winner, setWinner] = useState('')
  const currentTime = Date.now()

  const renderingWinner = useCallback(async () => {
    fetchVotes?.map(async ({id, endsAt }) => {
      if (currentTime >= Number(endsAt)) {   
        const render = await renderWinner(Number(id))

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const maxKey = Object.entries(render).reduce((maxKey, [key, value]: [string, any]) => {
          if ((key === '1' || key === '2') && value > render[maxKey]) {
            return key;
          }
          return maxKey;
        }, '1'); 
        
        setWinner(() => {
          switch(Number(maxKey)){
            case 0:
              return 'Egalité entre les 2 votes'
            case 1:
              return 'Vote 1 gagnant' 
            case 2:
              return 'Vote 2 gagnant'
            default:
              return 'Aucun vote n\'a encore commencé'
          }
        })
      }
    })
  }, [currentTime, fetchVotes])

  useEffect(() => {
    renderingWinner()
  }, [renderingWinner])

  return {
    winner
  }
}

export default useWinnerIs