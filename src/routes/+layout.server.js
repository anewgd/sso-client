import { config } from "$lib/config/config.js";

export async function load() {
   const auth_url = new URL(config.AUTHORIZATION_URL)
    auth_url.searchParams.append('client_id', config.CLIENT_ID);
    auth_url.searchParams.append('redirect_uri', config.REDIRECT_URI);
    auth_url.searchParams.append('response_type', 'code');
    auth_url.searchParams.append('tenant_id', config.TENANT_ID);
    auth_url.searchParams.append('scope', 'openid');
    auth_url.searchParams.append('state', '12345');
    auth_url.searchParams.append('prompt', 'email');
   return {
      config: {
         authorization_url: config.AUTHORIZATION_URL,
         client_id: config.CLIENT_ID,
         client_secret: config.CLIENT_SECRET,
         redirect_uri: config.REDIRECT_URI,
         tenant_id: config.TENANT_ID,
         token_url: config.TOKEN_URL,
         userinfo_url: config.USERINFO_URL,
      },

      auth_url: auth_url.toString()
    

   }
}