// src/lib/server/redisSessionStore.ts
import type { SessionData, SessionStore } from './sessionStore';
import { redis } from './clientRedis'; // your redis connection instance

export const redisSessionStore: SessionStore = {
	async get(sid) {
		const data = await redis.get(`session:${sid}`);
		return data ? JSON.parse(data) : null;
	},

	async set(session) {
		const ttl = Math.floor((session.expiresAt.getTime() - Date.now()) / 1000);
		await redis.set(`session:${session.sid}`, JSON.stringify(session), 'EX', ttl);
		await redis.set(`session:user:${session.userId}:${session.sid}`, '1', 'EX', ttl);
	},

	async delete(sid) {
		const data = await redis.get(`session:${sid}`);
		if (data) {
			const session = JSON.parse(data) as SessionData;
			await redis.del(`session:${sid}`);
			await redis.del(`session:user:${session.userId}:${sid}`);
		}
	},

	async deleteByUserId(userId) {
		const keys = await redis.keys(`session:user:${userId}:*`);
		for (const key of keys) {
			const sid = key.split(':').pop();
			if (sid) await redis.del(`session:${sid}`);
			await redis.del(key);
		}
	}
};
