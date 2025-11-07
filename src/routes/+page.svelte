<script lang="ts">
	let { data } = $props();
	let t = $state('');

	// t = data.config;

	t = data.auth_url;
	// auth_url := `${data.config.authorization_url}?client_id=${data.config.client_id}&`
	function onclick() {
		window.location.href = `${data.auth_url}`;
	}
</script>

<div class="font-size-2xl">
	<button {onclick} class="border-radius-2xl font-weight-md m-4 flex bg-black p-3 text-white"
		>Login</button
	>
	<p>{t}</p>
</div>
