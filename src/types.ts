export type Contract = {
	id?: number
	name: string
	uf: string
	signedDate: Date
	dueDate: Date
	totalPrice: number
	institution: string
	category: string
	items: ContractItem[]
}

export type ContractItem = {
	id?: number
	description: string
	totalRequestedBatchQuantity?: number
	signedPricePerBatch?: number
	amountPerBatch?: number
}

export type Order = {
	id?: number
	name: string
	price: number
	checkInDate: Date
	dueDate: Date
	term: number
	portal: string
	institution: string
	trade: string
	uf: string
	receipt: string
	category: string
	postalCode: string
	status: 'AGUARDANDO ENVIO' | 'ENVIADO' | 'ENTREGUE' | 'PAGO'
	items: OrderItem[]
	contractName?: string
	shipping?: 'PAC' | 'SEDEX' | 'CARRO'
	dispatchDate?: Date
	deliveryDate?: Date
}

export type OrderItem = {
	id?: number
	code?: string
	signedPricePerBatch?: number
	requestedBatchQuantity?: number
	amountPerBatch?: number
	description?: string
}
