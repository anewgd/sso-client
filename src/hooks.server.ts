import Handle from "@sveltejs/kit";
import { redisSessionStore } from "./lib/server/redisSessionStore";

export const handle = async ({event, resolve}) => {
    const session_id = event.cookies.get('session_id')

    event.locals.user = null;
    if (session_id) {

        try {
            let sessionData = await redisSessionStore.get(session_id)

            if (sessionData) {
                event.locals.user = {
					id: sessionData.userId,
					...sessionData.userInfo
				};
            }
            else {
                event.cookies.delete('session_id', {
                    path: "/",
                })
            }
        } catch (error) {
            console.error('Session check failed:', error);
            event.cookies.delete('session_id', { path: '/' });
        }

    }

    console.log(event.locals.user?.email);


    return await resolve(event);

}