import { Ref, forwardRef } from "react"
import Button from "../Button"

const ButtonCreateVote = forwardRef((props, ref: Ref<HTMLButtonElement>) => {

  const openModal = () => {
    if(ref && ref.current) ref?.current?.showModal()
  }

  return (
    <Button
      text='Créer un nouveau vote'
      className='rounded-full text-base px-3 btn btn-outline btn-primary'
      onClick={openModal}
    />
  )
})

export default ButtonCreateVote