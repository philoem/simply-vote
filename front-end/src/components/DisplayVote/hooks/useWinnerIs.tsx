import { useCallback, useEffect } from "react";
import { getWinnerIs, logWinner } from "../../../services/blockchain"
import useLocalStorage from "../../../hooks/useLocalStorage";

const useWinnerIs = () => {
  const [winnerIs, setWinnerIs] = useLocalStorage('WinnerIs', [])

  const logingWinner = useCallback(async (id: number, title: string) => {
    const winner = await logWinner(id)
    console.log('winner :>> ', winner);
    setWinnerIs([...winnerIs, {id: id, title: title}])
    return winner
  }, [setWinnerIs, winnerIs])
  console.log('winnerIs :>> ', winnerIs);

  const getWinner = useCallback(async (id: number, title: string) => {
    const winner = await getWinnerIs(id)
    setWinnerIs([...winnerIs, {id: id, title: title}])
    return winner
  }, [setWinnerIs, winnerIs])

  useEffect(() => {
    getWinner
  }, [getWinner])

  useEffect(() => {
    logingWinner
  }, [logingWinner])

  return {
    logingWinner,
    getWinner,
    winnerIs
  }
}

export default useWinnerIs