
import { env } from "$env/dynamic/private";


export async function load() {
   const auth_url = new URL(env.AUTHORIZATION_URL);

    auth_url.searchParams.append('client_id', env.CLIENT_ID);
    auth_url.searchParams.append('redirect_uri', env.REDIRECT_URI);
    auth_url.searchParams.append('response_type', 'code');
    auth_url.searchParams.append('tenant', env.TENANT_ID);
    auth_url.searchParams.append('scope', 'openid');
    auth_url.searchParams.append('state', '12345');
    auth_url.searchParams.append('prompt', 'phone');
   return {
      config: {
         authorization_url: env.AUTHORIZATION_URL,
         client_id: env.CLIENT_ID,
         client_secret: env.CLIENT_SECRET,
         redirect_uri: env.REDIRECT_URI,
         tenant_id: env.TENANT_ID,
         token_url: env.TOKEN_URL,
         userinfo_url: env.USERINFO_URL,
      },

      auth_url: auth_url.toString()
    

   }
}