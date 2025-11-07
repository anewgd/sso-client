// src/lib/server/sessionStore.ts
export interface SessionData {
	userId: string;
	sid: string;
	access_token: string;
	refresh_token: string;
	id_token: string;
	createdAt: Date;
	expiresAt: Date;
	userInfo: UserInfo;
}

export interface SessionStore {
	get(sid: string): Promise<SessionData | null>;
	set(session: SessionData): Promise<void>;
	delete(sid: string): Promise<void>;
	deleteByUserId?(userId: string): Promise<void>; // optional helper for backchannel logout
}

export interface UserInfo {
	first_name: string;
	middle_name: string;
	last_name: string;
	email: string;
	phone: string;
}
