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

{#if !data.error }
    <div class="font-size-2xl m-4 flex justify-center bg-green-300 p-4 border-radius-xl">{data.tokenResp}</div>
{:else if data.error }
    <div class="font-size-2xl m-4 flex justify-center bg-red-300 p-4 border-radius-xl">{data.tokenResp}</div>
{/if}

