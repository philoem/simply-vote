const useVoting = () => {
  const voting = (id: number) => {
    console.log('Voting N°', id)
  }
  return {
    voting
  }
}

export default useVoting