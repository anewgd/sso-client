// src/lib/server/pasetoVerify.ts
import { V4 } from 'paseto';
import { config } from '$lib/config/config';
import { KeyObject } from 'crypto';

// const publicKeyPem = process.env.PASETO_PUBLIC_KEY_PEM!;

export async function verifyPaseto(token: string) {
	try {
		const payload = await V4.verify(token, config.PAESTO_PUB_KEY, {
			audience: config.CLIENT_ID,
			issuer: 'http://localhost:8001'
		});

		// Optionally verify custom claims
		if (!payload.sub) {
			throw new Error('Missing subject claim');
		}

		return payload;
	} catch (err) {
		console.error('❌ PASETO verification failed:', err);
		throw new Error(`Invalid or expired token: ${err}`);
	}
}
