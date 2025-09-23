<script lang="ts">


    let { data } = $props();
    let t = $state("");

    // t = data.config;

    

    t = data.auth_url;
    // auth_url := `${data.config.authorization_url}?client_id=${data.config.client_id}&`
    function onclick() {
        window.location.href = `${data.config.authorization_url}?`;
    }
</script>
<div class="font-size-2xl">
    <button  {onclick} class="m-4 p-3 border-radius-2xl bg-black font-weight-md text-white flex">Login</button>
    <p>{t}</p>
</div>