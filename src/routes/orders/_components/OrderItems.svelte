<script lang="ts">
	import Icon from '@iconify/svelte'
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton'
	import type { Writable } from 'svelte/store'
	import type { OrderItem } from '../../../types'

	export let items: Writable<OrderItem[]>

	let newItemDescription = ''

	function addItem(e: any) {
		e.preventDefault()
		if (newItemDescription === '') return

		$items = [...$items, { description: newItemDescription }]
		newItemDescription = ''
	}

	function removeItem(currentItem: OrderItem) {
		$items = $items.filter((item) => item.description !== currentItem.description)
	}
</script>

<label for="" class="label flex-1">
	<span class="text-sm">Itens</span>
	<div class="input-group rounded-md input-group-divider grid-cols-[1fr_auto]">
		<input
			type="text"
			class="input rounded-md"
			bind:value={newItemDescription}
			placeholder="Adicione a descrição do item e clique no botão para adicionar"
		/>
		<button class="variant-filled-primary" on:click={addItem}>
			<Icon icon="ic:baseline-plus" />
		</button>
	</div>
</label>
<div class="overflow-auto h-[20rem] bg-secondary-900 rounded-md">
	<Accordion>
		{#each $items as item}
			<AccordionItem>
				<svelte:fragment slot="summary">
					<span class="text-sm">{item.description}</span>
				</svelte:fragment>
				<svelte:fragment slot="content">
					<label for="" class="label">
						<span class="text-sm">Descrição</span>
						<input type="text" class="input rounded-md" bind:value={item.description} />
					</label>
					<div class="flex gap-x-2">
						<label for="" class="label">
							<span class="text-sm">Quantidade total</span>
							<input type="number" min="0" class="input rounded-md" bind:value={item.requestedBatchQuantity} />
						</label>
						<label for="" class="label">
							<span class="text-sm">Quantidade por unidade</span>
							<input type="number" min="0" class="input rounded-md" bind:value={item.amountPerBatch} />
						</label>
						<label for="" class="label">
							<span class="text-sm">Preço por unidade</span>
							<input type="number" min="0" class="input rounded-md" bind:value={item.signedPricePerBatch} />
						</label>
					</div>
					<div class="flex justify-end">
						<button class="btn variant-filled-error btn-sm float-left" on:click={() => removeItem(item)}>Remover</button
						>
					</div>
				</svelte:fragment>
			</AccordionItem>
		{/each}
	</Accordion>
</div>
