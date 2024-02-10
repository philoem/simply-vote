import { Ref, forwardRef } from "react"
import Button from "../Button"
import useHandleButton from "./hooks/useHandleButton"

const ButtonCreateVote = forwardRef((_props, ref: Ref<HTMLButtonElement>) => {
  const { openModal } = useHandleButton(ref)

  return (
    <div className="mt-[10.5rem]">
      <Button
        text='Créer un nouveau vote'
        className='rounded-full text-base px-3 btn btn-outline btn-primary'
        onClick={openModal}
      />
    </div>
  )
})

export default ButtonCreateVote