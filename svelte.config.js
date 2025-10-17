import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = { kit: { adapter: adapter(), csrf: {
    trustedOrigins: [
        'https://ssoapiv2.automatrix.et',
        'http://localhost:3001'
    ]
} } };

export default config;
