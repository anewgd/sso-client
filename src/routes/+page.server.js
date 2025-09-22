
import { env } from "$env/dynamic/private";


export async function load() {
   return {
    authorization_url: env.AUTHORIZATION_URL
   }
}