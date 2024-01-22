export interface ModalParams {
	title: string
	description: string
	startsAt: number | string
	endsAt: number | string
	link1: string
	link2: string
}

export interface VoteStruct {
	id: number
	title: string
	description: string
	startsAt: number | string
	endsAt: number | string
	timestamp?: number
	link1: string
	link2: string
}
