<script>
	import { page } from '$app/state';
	import { error } from '@sveltejs/kit';


    let { data } = $props();

    let message = $state("");
    let errMsg = $state({});
    let tokenLoadSuccessful = $state(false);
    let tokenLoadFailed = $state(false);
    let tokenResponse = $state({});


    const urlParams = new URLSearchParams(page.url.search);




    let code = urlParams.get('code') ?? "";

    let auth_state = urlParams.get('state'); 

    // const fetchToken = async () => {
    //     try {
    //         tokenResponse = await fetch("/token", {
    //             method: 'POST',
    //             body: JSON.stringify({code}),
    //         })
            
    //     } catch (e) {

    //         errMsg = e instanceof Error ? e : String(e)
    //     }
    // }

    // $effect(() => {
    //     fetchToken()
    // })
     


    message = "Will send token request to " + data.config.token_url + " with code: " + code + " and state: " + auth_state;
</script>

<div>
    <button class="m-4 p-3 border-radius-2xl bg-black font-weight-md text-white flex">Get Token

    </button></div>

<main class="m-4">
    {#if !data.error }

    <div class="grid grid-cols-2 grid-rows-4 gap-4">
        <div class="w-1/6">Access Token</div>
        <div class=" border-1 border-yellow-300 p-3 w-5/6 break-words whitespace-normal">{data.tokenResp.data.access_token}</div>
         <div class="w-1/6">ID Token</div>
        <div class=" border-1 border-yellow-300 p-3 w-5/6 break-words whitespace-normal">{data.tokenResp.data.id_token}</div>
        <div class="w-1/6">Refresh Token</div>
        <div class=" border-1 border-yellow-300 p-3 w-5/6 break-words whitespace-normal">{data.tokenResp.data.refresh_token}</div>
    </div>
    {:else if data.error }
    <div class="font-size-2xl m-4 flex justify-center bg-red-300 p-4 border-radius-xl">{data.tokenResp.data}</div>
{   /if}
</main>


