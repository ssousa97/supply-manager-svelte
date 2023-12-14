<script lang="ts">
	import CurrencyInput from '@canutin/svelte-currency-input'
	export let value: number | undefined
	export let onValueChange: (value: number) => void
</script>

<CurrencyInput
	{value}
	{onValueChange}
	inputClasses={{
		formatted: 'input rounded-md',
		unformatted: 'input rounded-md',
		formattedPositive: 'text-primary-200',
		formattedNegative: 'text-primary-200',
		formattedZero: 'text-primary-200'
	}}
/>
