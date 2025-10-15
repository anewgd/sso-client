import { REDIRECT_URI } from "$env/static/private";
import { config } from "$lib/config/config.js";
import { verifyPaseto } from "$lib/server/verifyToken.js";
import axios from "axios";
import { randomUUID } from 'crypto';

import { redisSessionStore } from "$lib/server/redisSessionStore.js";

export async function POST({request}) {

    let { code } = await request.json();
    let url = config.TOKEN_URL;

    let reqBody = {
    grant_type: "authorization_code",
    REDIRECT_URI: config.REDIRECT_URI,
    code: code
    }   
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Basic ' + Buffer.from(config.CLIENT_ID + ":" + config.CLIENT_SECRET).toString("base64"),
            "Origin": "http://134.209.75.78:8089",
        },
        credentials: "include"

    })

    let resp = await response.json()


    return new Response(JSON.stringify(resp), {
        status: response.status,
        headers: {
            'Content-Type': 'application/json'
        }
    })

}