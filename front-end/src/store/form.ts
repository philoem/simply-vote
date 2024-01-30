import { atom } from "recoil";
import { ModalParams } from "../utils/types";

export const formState = atom<ModalParams>({
  key: 'formState',
  default: {
		id: '',
		admin: '',
    title: '',
		description: '',
		startsAt: '',
		endsAt: '',
		link1: '',
		link2: ''
  },
})

export const formStateArray = atom<ModalParams[]>({
  key: 'formStateArray',
  default: [{
		id: '',
		admin: '',
    title: '',
		description: '',
		startsAt: '',
		endsAt: '',
		link1: '',
		link2: ''
  }],
})

export const editingForm = atom<boolean>({
  key: 'editingForm',
  default: false,
})