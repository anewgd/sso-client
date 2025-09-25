
import { config } from "$lib/config/config"

export async function load({url}) {

    const code = url.searchParams.get("code");
    let tokenResponse = new Response();
    let err = false
    try {
        tokenResponse = await fetch("/token", {
                method: 'POST',
                body: JSON.stringify({code}),
            })
            
        } catch (e) {

            err = true,
            console.log("error occured", String(e))
        }

    return {
        error: err,
        tokenResp: tokenResponse.json()
    }
}

