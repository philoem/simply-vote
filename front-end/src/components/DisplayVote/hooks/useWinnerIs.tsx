import { getWinner } from "../../../services/blockchain"

const useWinnerIs = () => {
  const getWinnerIs = async (id: number) => {
    const winner = await getWinner(id)
    return winner
  }
  return {
    getWinnerIs
  }
}

export default useWinnerIs