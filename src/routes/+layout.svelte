<script lang="ts">
	import { page } from '$app/stores'
	import Icon from '@iconify/svelte'
	import { AppShell, Modal, TabAnchor, TabGroup, Toast, initializeStores } from '@skeletonlabs/skeleton'
	import '../app.postcss'

	let menus = [
		{
			label: 'Dashboard',
			path: '/',
			icon: 'codicon:graph'
		},
		{
			label: 'Contratos',
			path: '/contracts',
			icon: 'clarity:contract-line'
		},
		{
			label: 'Empenhos',
			path: '/orders',
			icon: 'carbon:delivery'
		},
		{
			label: 'Estoque',
			path: '/items',
			icon: 'bi:boxes'
		}
	]

	initializeStores()
</script>

<Toast position="t" />
<Modal />
<AppShell>
	<svelte:fragment slot="header">
		<TabGroup
			justify="justify-end"
			active="variant-filled-primary"
			hover="hover:variant-soft-primary"
			rounded=""
			class="bg-surface-900"
		>
			{#each menus as menu}
				<TabAnchor href={menu.path} selected={$page.url.pathname === menu.path}>
					<div class="flex flex-row items-center gap-x-1">
						<Icon icon={menu.icon} class="text-2xl" />
						<span>{menu.label}</span>
					</div>
				</TabAnchor>
			{/each}
		</TabGroup>
	</svelte:fragment>
	<slot />
</AppShell>
