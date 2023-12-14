<script lang="ts">
	import { enhance } from '$app/forms'
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton'
	import { writable } from 'svelte/store'
	import DateInput from '../../../components/DateInput.svelte'
	import Select from '../../../components/Select.svelte'
	import ContractItems from '../_components/ContractItems.svelte'
	import type { PageServerData, SubmitFunction } from './$types'

	export let data: PageServerData

	let contractItems = writable(data.contract.items)
	let toastStore = getToastStore()

	let submitFn: SubmitFunction = ({ formData, cancel }) => {
		data.contract.items = $contractItems
		formData.append('contract', JSON.stringify(data.contract))

		return async ({ result }) => {
			let toastMsg: ToastSettings = {
				background: result.type === 'success' ? 'bg-success-500' : 'bg-error-500',
				message: (result as any).data.message
			}
			toastStore.trigger(toastMsg)
		}
	}
</script>

<div class="h-full grid place-items-center">
	<form
		method="POST"
		action="?/upsert"
		class="w-[40rem] max-h-[55rem] variant-soft-primary rounded-lg p-4 flex flex-col gap-y-2"
		use:enhance={submitFn}
	>
		<div class="flex w-full gap-x-4">
			<label class="label flex-[2]">
				<span class="text-sm">Nome</span>
				<input type="text" class="input rounded-md" bind:value={data.contract.name} />
			</label>
			<label for="" class="label flex-1">
				<span class="text-sm">Data de assinatura</span>
				<DateInput
					className="rounded-md"
					date={data.contract.signedDate}
					onChange={(e) => (data.contract.signedDate = e)}
				/>
			</label>
			<label for="" class="label flex-1">
				<span class="text-sm">UF</span>
				<Select
					value={data.contract.uf}
					options={data.ufs}
					propertyName="UF"
					onChange={(e) => (data.contract.uf = e.target.value)}
				/>
			</label>
		</div>
		<label for="" class="label flex-1">
			<span class="text-sm">Identificador do orgão</span>
			<Select
				value={data.contract.institution}
				propertyName="Identificador"
				creatable
				options={data.institutions}
				onChange={(e) => (data.contract.institution = e.target.value)}
				onCreate={(institution) => {
					if (!institution) return
					data.contract.institution = institution
					data.institutions.push(institution)
				}}
			/>
		</label>
		<label for="" class="label flex-1">
			<span class="text-sm">Categoria</span>
			<Select
				value={data.contract.category}
				propertyName="Categoria"
				creatable
				options={data.categories}
				onChange={(e) => (data.contract.category = e.target.value)}
				onCreate={(category) => {
					if (!category) return
					data.contract.category = category
					data.categories.push(category)
				}}
			/>
		</label>
		<ContractItems items={contractItems} itemsCodes={writable([])} />
		<div class="flex justify-end">
			<button on:click={() => {}} class="btn variant-filled-success">Salvar</button>
		</div>
	</form>
</div>
