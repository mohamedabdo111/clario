import { db } from "@/mocks/db";
import { mockDelay } from "@/mocks/utils";
import type { Permission } from "@/lib/permissions";
import { ApiError } from "@/services/api";
import type { Membership } from "@/features/organization/types";
import type { AuthService } from "./auth.service.types";
import type { Session } from "../types";

const TOKEN_PREFIX = "mock-session.";

function membershipsFor(userId: string): Membership[] {
  return db.organizations.flatMap((organization) => {
    const member = db.users[organization.id]?.find((u) => u.id === userId && u.status === "active");
    if (!member) return [];
    const roleIds = new Set(member.roles.map((r) => r.id));
    const permissions = new Set<Permission>(
      db.roles[organization.id].filter((role) => roleIds.has(role.id)).flatMap((role) => role.permissions),
    );
    const { id, name, slug, logoUrl } = organization;
    return [{ organization: { id, name, slug, logoUrl }, roles: member.roles, permissions: [...permissions] }];
  });
}

function sessionFor(userId: string): Session {
  const account = db.accounts.find((a) => a.userId === userId);
  if (!account) throw new ApiError(401, "unauthorized", "Your session has expired. Sign in again.");
  return {
    token: `${TOKEN_PREFIX}${userId}`,
    user: { id: account.userId, name: account.name, email: account.email, avatarUrl: null },
    memberships: membershipsFor(userId),
  };
}

export const mockAuthService: AuthService = {
  async signIn({ email, password }) {
    await mockDelay(500, 900);
    const account = db.accounts.find((a) => a.email.toLowerCase() === email.toLowerCase());
    if (!account || account.password !== password) {
      throw new ApiError(401, "invalid_credentials", "Incorrect email or password.");
    }
    const session = sessionFor(account.userId);
    if (session.memberships.length === 0) {
      throw new ApiError(403, "forbidden", "Your account has been suspended. Contact your organization's administrator.");
    }
    return session;
  },

  async getSession(token) {
    await mockDelay(150, 300);
    if (!token.startsWith(TOKEN_PREFIX)) {
      throw new ApiError(401, "unauthorized", "Your session has expired. Sign in again.");
    }
    return sessionFor(token.slice(TOKEN_PREFIX.length));
  },

  async signOut() {
    await mockDelay(100, 200);
  },

  async requestPasswordReset() {
    await mockDelay(600, 900);
  },

  async resetPassword({ token }) {
    await mockDelay(600, 900);
    if (token === "expired") {
      throw new ApiError(400, "invalid_token", "This reset link has expired. Request a new one.");
    }
  },
};
