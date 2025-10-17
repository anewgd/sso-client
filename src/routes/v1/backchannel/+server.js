import { json } from '@sveltejs/kit';

import { verifyPaseto } from '$lib/server/verifyToken.js';
import { config as env_config } from '$lib/config/config.js';
import { redisSessionStore } from '$lib/server/redisSessionStore.js';

export const config = {
	csrf: false
};
export async function POST({request, cookies}) {
    try {
        const body = await request.text();
        const params = new URLSearchParams(body);
        const logoutToken = params.get('logout_token');

        if (!logoutToken) {
            return json({ error: 'Missing logout_token' }, { status: 400 });
        }

        console.log("TOKEN", logoutToken);

        const logoutTokenPayload = await verifyPaseto(logoutToken)

        if (!logoutTokenPayload.sub) {
            console.error('Error :>> ', "no 'sub' in logout token");
            return json({ error: 'Missing sub from logout token' }, { status: 400 });
        }

        if (!logoutTokenPayload.aud) {
            console.error('Error :>> ', "no 'aud' in logout token");
            return json({ error: 'Missing aud from logout token' }, { status: 400 });
        }

        if (logoutTokenPayload.aud !== env_config.CLIENT_ID) {
            console.error('Error :>> ', `'aud' doesn't match ${env_config.CLIENT_ID} in logout token`);
            return json({error: 'unkown audience'}, {status: 400});
        }

        if (logoutTokenPayload.iss !== "http://localhost:8001" ) {
            console.error('Error :>> ', "invalid 'issuer' for token");
            return json({ error: 'Unknown token issuer' }, { status: 400 });
        }

        if (!logoutTokenPayload.events) {
            console.error('Error :>> ', "missing 'events' field for token");
            return json({ error: 'Missing events field' }, { status: 400 });
        }

        if (logoutTokenPayload.events !== '{"http://schemas.openid.net/event/backchannel-logout":{}}' ) {
            console.error('Error :>> ', `'events' doesn't match '{"http://schemas.openid.net/event/backchannel-logout":{}}' in logout token`);
            return json({ error: 'Invalid events field' }, { status: 400 });
        }

        const session_id = cookies.get('session_id');
        
        if (session_id) {
            try {
                await redisSessionStore.delete(session_id);
            } catch (e) {
                console.error('Failed to destroy session:', e);
            }
                
                cookies.delete('session_id', { path: '/' });
            }
    } catch(error) {
         console.error('Logout token verification failed:', error);
         return json({ error: `Logout token verification failed: ${error}` }, { status: 400 });
    }

    return new Response(null, {
        status: 200,
    })
}