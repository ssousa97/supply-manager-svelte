<script lang="ts">
	import { format } from 'date-fns'

	export let className: string = ''
	export let date: string | Date

	let formatValue = (value: any) => (typeof value === 'string' ? value : format(value, 'yyyy-MM-dd'))
	let setValue = (e: any) => (date = e.target.value)
</script>

<input type="date" class={`input ${className}`} value={formatValue(date)} on:input={setValue} />
