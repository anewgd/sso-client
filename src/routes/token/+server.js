import { REDIRECT_URI } from "$env/static/private";
import { config } from "$lib/config/config.js";
import axios from "axios";


let reqBody = {
    grant_type: "authorization_code",
    REDIRECT_URI: config.REDIRECT_URI,
    code: ""
}


export async function POST({request}) {

    let { code } = await request.json();
    let url = config.TOKEN_URL;

    let reqBody = {
    grant_type: "code",
    REDIRECT_URI: config.REDIRECT_URI,
    code: code
}
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Basic ' + Buffer.from(config.CLIENT_ID + ":" + config.CLIENT_SECRET).toString("base64"),
        },
        credentials: "include"

    })

    let resp = await response.json()

    console.log(resp)

    return new Response(JSON.stringify(resp), {
        status: response.status,
        headers: {
            'Content-Type': 'application/json'
        }
    })

}