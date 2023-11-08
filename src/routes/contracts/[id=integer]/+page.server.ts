import { getUfs } from '$lib/getUfs'
import { error } from '@sveltejs/kit'
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
		const contract = JSON.parse((await request.formData()).get('contract')?.toString() ?? '')
		if (Object.keys(contract).length <= 0) {
			throw error(500, { message: 'Erro inesperado' })
		}

		return { message: 'Contrato salvo com sucesso!' }
	}
}
