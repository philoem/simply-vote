export interface ModalParams {
	id?: number | string
	admin?: string
	title: string
	description: string
	startsAt: number | string
	endsAt: number | string
	link1?: string
	link2?: string
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
}

export interface ProposalStruct {
	id: number
	choiceOne: number
	choiceTwo: number
}
