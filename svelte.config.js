import adapter from '@sveltejs/adapter-node';
import {config as c} from './src/lib/config/config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = { 
    kit: { adapter: adapter(), 
    csrf: {
             trustedOrigins: [
                c.SSO_ORIGIN,
                'http://localhost:3001'
    ],
} } };

export default config;
