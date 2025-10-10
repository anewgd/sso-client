// src/lib/server/memorySessionStore.ts
import type { SessionData, SessionStore } from './sessionStore.ts';

const sessions = new Map<string, SessionData>();

export const memorySessionStore: SessionStore = {
  async get(sid) {
    return sessions.get(sid) ?? null;
  },
  async set(session) {
    sessions.set(session.sid, session);
  },
  async delete(sid) {
    sessions.delete(sid);
  },
  async deleteByUserId(userId) {
    for (const [sid, session] of sessions) {
      if (session.userId === userId) sessions.delete(sid);
    }
  }
};
