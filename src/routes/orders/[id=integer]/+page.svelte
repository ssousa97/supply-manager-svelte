<script lang="ts">
	import { enhance } from '$app/forms'
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton'
	import { writable } from 'svelte/store'
	import DateInput from '../../../components/DateInput.svelte'
	import Select from '../../../components/Select.svelte'
	import OrderItems from '../_components/OrderItems.svelte'
	import type { PageServerData, SubmitFunction } from './$types'

	export let data: PageServerData

	let toastStore = getToastStore()
	let orderItems = writable(data.order.items)

	let submitFn: SubmitFunction = ({ formData, cancel }) => {
		data.order.items = $orderItems
		formData.append('order', JSON.stringify(data.order))

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
		class="w-[45rem] max-h-[55rem] variant-soft-primary rounded-lg p-4 flex flex-col gap-y-1"
		use:enhance={submitFn}
	>
		<div class="flex w-full gap-x-2">
			<label class="label flex-[6]">
				<span class="text-sm">Nome</span>
				<input type="text" class="input rounded-md" bind:value={data.order.name} />
			</label>
			<div class="flex flex-[6] gap-x-2">
				<label class="label flex-[2]" for="">
					<span class="text-sm">Data do pedido</span>
					<DateInput
						date={data.order.checkInDate}
						className="rounded-md"
						onChange={(e) => (data.order.checkInDate = e)}
					/>
				</label>
				<label class="label flex-[2]">
					<span class="text-sm">Validade</span>
					<input type="number" min="0" class="input rounded-md" bind:value={data.order.term} />
				</label>
				<label class="label flex-[2]" for="">
					<span class="text-sm">UF</span>
					<Select
						value={data.order.uf}
						options={data.ufs}
						propertyName="uf"
						onChange={(e) => (data.order.uf = e.target.value)}
					/>
				</label>
			</div>
		</div>
		<div class="flex w-full gap-x-2">
			<label class="label flex-1" for="">
				<span class="text-sm">Portal</span>
				<Select
					value={data.order.portal}
					options={data.portals}
					propertyName="Portal"
					onChange={(e) => (data.order.portal = e.target.value)}
					creatable
					onCreate={(portal) => {
						if (!portal) return
						data.order.portal = portal
						data.portals.push(portal)
					}}
				/>
			</label>
			<label class="label flex-1" for="">
				<span class="text-sm">Identificador do orgão</span>
				<Select
					value={data.order.institution}
					options={data.institutions}
					propertyName="Instituição"
					onChange={(e) => (data.order.institution = e.target.value)}
					creatable
					onCreate={(institution) => {
						if (!institution) return
						data.order.institution = institution
						data.institutions.push(institution)
					}}
				/>
			</label>
		</div>
		<div class="flex w-full gap-x-2">
			<label class="label flex-1" for="">
				<span class="text-sm">Categoria</span>
				<Select
					value={data.order.category}
					options={data.categories}
					propertyName="Categoria"
					onChange={(e) => (data.order.category = e.target.value)}
					creatable
					onCreate={(category) => {
						if (!category) return
						data.order.category = category
						data.categories.push(category)
					}}
				/>
			</label>
			<label for="" class="label flex-1">
				<span class="text-sm">Nome do contrato associado</span>
				<Select
					value={data.order.contractName}
					options={data.contracts}
					propertyName="contractName"
					onChange={(e) => (data.order.contractName = e.target.value)}
				/>
			</label>
		</div>
		<div class="flex w-full gap-x-2">
			<label for="" class="label flex-1">
				<span class="text-sm">Licitação</span>
				<input class="input rounded-md" bind:value={data.order.trade} />
			</label>
			<label for="" class="label flex-1">
				<span class="text-sm">Nota fiscal</span>
				<input class="input rounded-md" bind:value={data.order.trade} />
			</label>
		</div>
		<div class="flex w-full gap-x-2">
			<label for="" class="label flex-1">
				<span class="text-sm">Metodo de entrega</span>
				<Select value={data.order.shipping} options={data.shippings} propertyName="shipping" />
			</label>
			<label for="" class="label flex-1">
				<span class="text-sm">Data de saída</span>
				<DateInput
					date={data.order.dispatchDate ?? ''}
					className="rounded-md"
					onChange={(e) => (data.order.dispatchDate = e)}
				/>
			</label>
			<label for="" class="label flex-1">
				<span class="text-sm">Data de entrega</span>
				<DateInput
					date={data.order.deliveryDate ?? ''}
					className="rounded-md"
					onChange={(e) => (data.order.deliveryDate = e)}
				/>
			</label>
		</div>
		<OrderItems items={orderItems} itemsCodes={writable([])} />
		<div class="flex justify-end">
			<button on:click={() => {}} class="btn variant-filled-success">Salvar</button>
		</div>
	</form>
</div>
