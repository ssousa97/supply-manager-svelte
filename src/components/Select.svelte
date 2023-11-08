<script lang="ts">
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton'

	export let value: any
	export let options: any[] = []
	export let propertyName: string
	export let creatable: boolean = false
	export let onCreate: ((r: string) => void) | undefined = undefined
	export let onChange: ((e: any) => void) | undefined = undefined

	let modalStore = getModalStore()
	let modalSettings: ModalSettings = {
		type: 'prompt',
		title: `Adicionar ${propertyName}`,
		buttonTextSubmit: 'Adicionar',
		buttonTextCancel: 'Cancelar',
		value: '',
		valueAttr: {
			type: 'text',
			class: 'input rounded-md',
			minlength: 3,
			required: true
		},
		response: onCreate
	}
</script>

<select name="" id="" class="select" on:change={onChange} {value}>
	{#each options as option}
		<option value={option}>{option}</option>
	{/each}
</select>
{#if creatable}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<span
		class="text-xs hover:cursor-pointer hover:text-primary-500 hover:underline"
		on:click={() => modalStore.trigger(modalSettings)}
	>
		Adicionar {propertyName}
	</span>
{/if}
