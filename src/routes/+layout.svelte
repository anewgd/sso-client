<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<div class="font-size-2xl m-4 flex justify-center bg-yellow-300 p-4 border-radius-xl">
	<h1>SSO Test Client</h1>
</div> 	

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
