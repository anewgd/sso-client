import { config } from '$lib/config/config.js';
import { redisSessionStore } from '$lib/server/redisSessionStore.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const session_id = cookies.get('session_id');

	let userIdToken = null;

	if (session_id) {
		try {
			let userdata = await redisSessionStore.get(session_id);
			userIdToken = userdata?.id_token;
			await redisSessionStore.delete(session_id);
		} catch (e) {
			console.error('Failed to destroy session:', e);
		}

		cookies.delete('session_id', { path: '/' });
	}

	const logoutURL = new URL(config.LOGOUT_URL);
	logoutURL.searchParams.set('id_token_hint', String(userIdToken));
	logoutURL.searchParams.set('post_logout_redirect_uri', String(config.POST_LOGOUT_REDIRECT_URI));
	const credentials = Buffer.from(`${config.CLIENT_ID}:${config.CLIENT_SECRET}`).toString('base64');
	const authHeader = `Basic ${credentials}`;

	const html = `
	<!DOCTYPE html>
	<html>
	  <head>
	    <meta http-equiv="refresh" content="0;url=${logoutURL.toString()}" />
	  </head>
	  <body>
	    <p>Redirecting to logout...</p>
	  </body>
	</html>
	`;

	// const response = await fetch(logoutURL.toString(), {
	//     method: 'GET',
	//     headers: { Authorization: authHeader }
	// });

	const resp = {
		r: logoutURL.toString()
	};
	return new Response(JSON.stringify(resp), {
		status: 302
		// headers: { Location: logoutURL.toString()}
	});
	// let body = await request.json();
	// console.log(request.body);
	// return json({ staus: 200, message: 'Testing logout API', body: body, header: request.headers.get("Content-Type") });
}
