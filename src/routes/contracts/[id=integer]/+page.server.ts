import { getUfs } from '$lib/utils'
import { error } from '@sveltejs/kit'
import { add } from 'date-fns'
import type { Contract } from '../../../types'
import type { PageServerLoad } from './$types'

function getContract(): Contract {
	return {
		name: '',
		uf: '',
		signedDate: new Date(),
		dueDate: new Date(),
		totalPrice: 0,
		institution: '',
		category: '',
		items: []
	}
}

export const load: PageServerLoad = () => {
	return {
		ufs: getUfs(),
		contract: getContract(),
		institutions: ['Prefeitura Teste'] as any[],
		categories: ['Categoria Teste'] as any[]
	}
}

export const actions = {
	upsert: async ({ request }) => {
		const contract = JSON.parse((await request.formData()).get('contract')?.toString() ?? '') as Contract
		if (Object.keys(contract).length <= 0) {
			throw error(500, { message: 'Erro inesperado' })
		}

		//TODO: validation on server-side

		contract.dueDate = add(contract.signedDate, { years: 1 })
		contract.totalPrice = contract.items.reduce(
			(acc, item) => acc + item.signedPricePerBatch! * item.totalRequestedBatchQuantity!,
			0
		)

		console.log(contract)

		return { message: 'Contrato salvo com sucesso!' }
	}
}
