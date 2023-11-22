/* eslint-disable prefer-const */
import { getUfs } from '$lib/utils'
import { error } from '@sveltejs/kit'
import type { Order } from '../../../types'
import type { PageServerLoad } from './$types'

let getOrder: () => Order = () => {
	return {
		name: '',
		price: 0,
		checkInDate: new Date(),
		dueDate: new Date(),
		term: 0,
		portal: '',
		institution: '',
		trade: '',
		uf: '',
		receipt: '',
		category: '',
		postalCode: '',
		status: 'AGUARDANDO ENVIO',
		items: []
	}
}

export const load: PageServerLoad = () => {
	return {
		ufs: getUfs(),
		order: getOrder(),
		institutions: ['Prefeitura Teste'] as any[],
		categories: ['Categoria Teste'] as any[],
		shippings: [] as any[],
		portals: [] as any[],
		contracts: [] as any[]
	}
}

export const actions = {
	upsert: async ({ request }) => {
		const contract = JSON.parse((await request.formData()).get('order')?.toString() ?? '')
		if (Object.keys(contract).length <= 0) {
			throw error(500, { message: 'Erro inesperado' })
		}
		//TODO: validation on server-side

		return { message: 'Empenho salvo com sucesso!' }
	}
}
