import { useCallback, useEffect, useState } from "react";
import { renderWinner } from "../../../services/blockchain"

const useWinnerIs = () => {
  const [winner, setWinner] = useState('')

  const renderingWinner = useCallback(async (id: number) => {
    const winner = await renderWinner(id)
    console.log('winner :>> ', winner);

    setWinner(() => {
      switch(Number(winner)){
        case 0:
          return 'Egalité entre les 2 votes'
        case 1:
          return 'Vote 1 gagnant' 
        case 2:
          return 'Vote 2 gagnant'
        default:
          return ''
      }
    })
  }, [setWinner])  

  useEffect(() => {
    renderingWinner
  }, [renderingWinner])

  return {
    renderingWinner,
    winner
  }
}

export default useWinnerIs