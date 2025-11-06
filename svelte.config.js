import adapter from '@sveltejs/adapter-node';
import {config as c} from './src/lib/config/config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = { 
    kit: { adapter: adapter(), 
    csrf: {
             trustedOrigins: [
                "https://ssoapi-stage.automatrix.et",
                'http://localhost:3001'
    ],
} } };

export default config;
