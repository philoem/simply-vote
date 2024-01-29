import { useRecoilState } from "recoil"
import { editingForm } from "../../../store/form"

const useHandleButton = (ref: React.RefObject<HTMLDialogElement>) => {
  const [, setEditForm] = useRecoilState(editingForm)

  const openModal = () => {
    if(ref && ref.current) ref?.current?.showModal()
    setEditForm(false)
  }

  return {
    openModal
  }
}

export default useHandleButton