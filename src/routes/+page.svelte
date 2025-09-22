<script lang="ts">

    let { data } = $props();
    let t = $state("");

    function onclick() {
        window.location.href = data.authorization_url;
        t = data.authorization_url
    }
</script>
<div class="font-size-2xl">
    <button  {onclick} class="m-4 p-3 border-radius-2xl bg-black font-weight-md text-white flex">Login</button>
    <p>{t}</p>
</div>