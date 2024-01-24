import { atom } from "recoil";
import { ModalParams } from "../utils/types";

export const formState = atom<ModalParams>({
  key: 'formState',
  default: {
		id: 1 || '',
    title: '',
		description: '',
		startsAt: '',
		endsAt: '',
		link1: '',
		link2: ''
  },
})