
import { config } from "$lib/config/config"

export async function load({url}) {

    const code = url.searchParams.get("code");
    let tokenResponse = null;
    let resp = null;
    let err = false;
    
    // Validate that code parameter exists
    if (!code) {
        return {
            error: true,
            tokenResp: { error: "Missing authorization code parameter" }
        };
    }
    
    try {
        tokenResponse = await fetch("/token", {
            method: 'POST',
            body: JSON.stringify({code}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!tokenResponse.ok) {
            err = true;
            console.log("Token request failed with status:", tokenResponse.status);
            resp = { error: `Token request failed with status: ${tokenResponse.status}` };
        } else {
            resp = await tokenResponse.json();
        }
        
    } catch (e) {
        err = true;
        console.log("error occurred", String(e));
        resp = { error: "Network error occurred while fetching token" };
    }

    console.log("RESP", resp)

    return {
        error: err,
        tokenResp: resp
    }
}

