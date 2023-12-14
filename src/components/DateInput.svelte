<script lang="ts">
	import { format, parseISO } from 'date-fns'

	export let className: string = ''
	export let date: string | Date
	export let onChange: (e: any) => void

	let formatValue = (value: any) => (typeof value === 'string' ? value : format(value, 'yyyy-MM-dd'))
	let setValue = (e: any) => {
		onChange(parseISO(e.target.value))
	}
</script>

<input type="date" class={`input ${className}`} value={formatValue(date)} on:input={setValue} />
