<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children, data } = $props();

	async function logout() {
    	// call your logout endpoint
   	 	const resp = await fetch('/v1/logout', { method: 'POST' });

		const j = await resp.json()
    	// then reload or navigate to home
    	window.location.href = j.r;
  }
</script>

<div class="font-size-2xl m-4 flex justify-between bg-yellow-300 p-4 border-radius-xl items-center">
	<h1>TenantID: <strong>{data.config.tenant_id}</strong> | ClientID: <strong>{data.config.client_id}</strong></h1>
	<h1>SSO Test Client. v0.0.1</h1>
	{#if data.user}
		<button onclick={logout} class="border-2 bg-black text-yellow-200 p-2 border-radius-2">Logout</button>
	{/if}
	
</div> 	



<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
