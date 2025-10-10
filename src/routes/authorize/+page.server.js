
import { config } from "$lib/config/config"
import { verifyPaseto } from "$lib/server/verifyToken.js";
import { randomUUID } from 'crypto';
import { redisSessionStore } from "$lib/server/redisSessionStore.js";
import { userInfo } from "os";

export async function load(event) {

     const { url, fetch, cookies } = event;

    const code = url.searchParams.get("code");
    let tokenResponse = null;
    let resp = null;
    let err = false;

    let reqBody = {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: config.REDIRECT_URI,
    }
    
    // Validate that code parameter exists
    if (!code) {
        return {
            error: true,
            tokenResp: { error: "Missing authorization code parameter" }
        };
    }
    
    try {
        tokenResponse = await fetch("/v1/token", {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Basic ' + Buffer.from(config.CLIENT_ID + ":" + config.CLIENT_SECRET).toString("base64"),
            }
        });
        
        if (!tokenResponse.ok) {
            err = true;

            const resp = await tokenResponse.json()
            console.log(' :>> ', resp.error);


            // console.log("Token request failed", err);
            // resp = { error: `Token request failed with status: ${resp.status}` };
        } else {
            resp = await tokenResponse.json();
        }
        
    } catch (e) {
        err = true;
        console.log("error occurred", String(e));
        resp = { error: "error occurred while fetching token" };
    }

    // cookies.set("access_token", resp.data.access_token, {
    //     path: "/",
    //     domain: "",
    //     httpOnly: true
    // })
    // cookies.set("refresh_token", resp.data.refresh_token, {

    //     domain: "",
    //     path: "/",
    //     httpOnly: true,
    // })
    // cookies.set("id_token", resp.data.id_token, {

    //     domain: "",
    //     path: "/",
    //     httpOnly: true,
    // })


    const payload = await verifyPaseto(resp.data.access_token)
    const idPayload = await verifyPaseto(resp.data.id_token)

    const sid = randomUUID();

    const userInfo = {
        first_name: String(idPayload.first_name),
        middle_name: String(idPayload.middle_name),
        last_name: String(idPayload.last_name),
        email: String(idPayload.email),
        phone: String(idPayload.phone),
    }

    const session = {
    userId: String(payload.sub),
    sid,
    access_token: resp.data.access_token,
    refresh_token: resp.data.refresh_token,
    id_token: resp.data.id_token,
    userInfo: userInfo,
    createdAt: new Date(),
    expiresAt: new Date(String(payload.exp)),
    };

    await redisSessionStore.set(session)

    cookies.set('session_id', sid, {
        httpOnly: true,
        path: '/',
        sameSite: 'none',
        maxAge: 60 * 60 * 24,
    });
    return {
        error: err,
        tokenResp: resp
    }
}

