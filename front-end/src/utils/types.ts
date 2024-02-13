export interface ModalParams {
	id?: number | string
	admin?: string
	title: string
	description: string
	startsAt: number | string
	endsAt: number | string
	link1?: string
	link2?: string
	choiceOne?: number
	choiceTwo?: number
}

export interface VoteStruct {
	id?: number | string
	admin?: string
	title: string
	description: string
	startsAt: number | string
	endsAt: number | string
	timestamp?: number
	link1: string
	link2: string
	choiceOne?: number
	choiceTwo?: number
}
