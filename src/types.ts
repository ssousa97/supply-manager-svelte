export type Contract = {
	name: string
	uf: string
	signedDate: Date
	dueDate: Date
	totalPrice: number
	institution: string
	category: string
	items: Item[]
}

export type Item = {
	description: string
	totalUnits?: number
	pricePerUnit?: number
	amountPerUnit?: number
}
