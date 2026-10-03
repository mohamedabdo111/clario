/**
 * In-memory mock backend used while VITE_USE_MOCKS is enabled. Only the
 * `*.service.mock.ts` files import it; components never do.
 */
import type { Application } from "@/features/applications/types";
import type { ActivityEvent, ActivityType } from "@/features/dashboard/types";
import type { Organization } from "@/features/organization/types";
import type { Role } from "@/features/roles/types";
import type { Invitation, User, UserStatus } from "@/features/users/types";
import { ALL_PERMISSIONS, type Permission } from "@/lib/permissions";
import { daysAgo, daysFromNow } from "./utils";

export const MOCK_PASSWORD = "Clario#2026";
export const CURRENT_USER_ID = "usr_sarah";

interface Account {
  userId: string;
  name: string;
  email: string;
  password: string;
}

const organizations: Organization[] = [
  {
    id: "org_acme",
    name: "Acme Inc",
    slug: "acme",
    logoUrl: null,
    plan: "enterprise",
    region: "EU (Frankfurt)",
    createdAt: daysAgo(640),
  },
  {
    id: "org_globex",
    name: "Globex Corporation",
    slug: "globex",
    logoUrl: null,
    plan: "team",
    region: "US (Virginia)",
    createdAt: daysAgo(210),
  },
];

function systemRole(
  orgId: string,
  key: string,
  name: string,
  description: string,
  permissions: readonly Permission[],
): Role {
  return {
    id: `role_${orgId}_${key}`,
    name,
    description,
    permissions: [...permissions],
    isSystem: true,
    memberCount: 0,
    createdAt: daysAgo(600),
    updatedAt: daysAgo(600),
  };
}

function rolesFor(orgId: string): Role[] {
  return [
    systemRole(orgId, "owner", "Owner", "Full access, including deleting the organization.", ALL_PERMISSIONS),
    systemRole(
      orgId,
      "admin",
      "Admin",
      "Manage members, roles and applications.",
      ALL_PERMISSIONS.filter((p) => p !== "organization.update"),
    ),
    systemRole(orgId, "manager", "Manager", "Invite and manage members.", [
      "users.view",
      "users.create",
      "users.update",
      "roles.view",
      "organization.view",
      "applications.view",
    ]),
    systemRole(orgId, "member", "Member", "Standard access to the organization.", [
      "users.view",
      "organization.view",
      "applications.view",
    ]),
    systemRole(orgId, "viewer", "Viewer", "Read-only access.", ["users.view", "applications.view"]),
  ];
}

const roles: Record<string, Role[]> = {
  org_acme: [
    ...rolesFor("org_acme"),
    {
      id: "role_org_acme_support",
      name: "Support Lead",
      description: "Helps members with account issues.",
      permissions: ["users.view", "users.update", "organization.view", "applications.view"],
      isSystem: false,
      memberCount: 0,
      createdAt: daysAgo(90),
      updatedAt: daysAgo(12),
    },
  ],
  org_globex: rolesFor("org_globex"),
};

const PEOPLE = [
  "Sarah Chen", "Marcus Webb", "Priya Raman", "Daniel Okafor", "Elena Petrova", "Tom Lindqvist",
  "Aisha Bello", "James Carter", "Mei Tanaka", "Lucas Moreau", "Fatima Haddad", "Noah Fischer",
  "Grace Kim", "Omar Siddiqui", "Hannah Novak", "Diego Alvarez", "Chloe Martin", "Ravi Patel",
  "Isabel Costa", "Ethan Brooks", "Yuki Sato", "Samuel Adeyemi", "Laura Bianchi", "Kofi Mensah",
  "Anna Kowalski", "Ben Hughes", "Zara Ahmed", "Victor Lehmann", "Nina Johansson", "Leo Dubois",
  "Maya Singh", "Oliver Grant", "Sofia Rossi", "Ahmed Nasser",
];

function emailFor(name: string, domain: string) {
  return `${name.toLowerCase().replace(/\s+/g, ".")}@${domain}`;
}

function roleRef(orgId: string, key: string) {
  const role = roles[orgId].find((r) => r.id === `role_${orgId}_${key}`);
  if (!role) throw new Error(`Unknown mock role ${key}`);
  return { id: role.id, name: role.name };
}

const ACME_ROLE_CYCLE = ["member", "member", "manager", "member", "viewer", "admin", "member", "support"];

function acmeMembers(): User[] {
  return PEOPLE.map((name, index): User => {
    const isCurrent = index === 0;
    const roleKey = isCurrent ? "owner" : ACME_ROLE_CYCLE[index % ACME_ROLE_CYCLE.length];
    const status: UserStatus = index % 11 === 7 ? "suspended" : "active";
    return {
      id: isCurrent ? CURRENT_USER_ID : `usr_acme_${index}`,
      name,
      email: emailFor(name, "acme.com"),
      avatarUrl: null,
      status,
      roles: [roleRef("org_acme", roleKey)],
      joinedAt: daysAgo(Math.max(1, 600 - index * 17.5)),
      lastActiveAt: status === "suspended" ? daysAgo(40) : daysAgo(index % 9, index % 5),
    };
  });
}

function globexMembers(): User[] {
  return PEOPLE.slice(0, 9).map((name, index): User => ({
    id: index === 0 ? CURRENT_USER_ID : `usr_globex_${index}`,
    name,
    email: emailFor(name, index === 0 ? "acme.com" : "globex.com"),
    avatarUrl: null,
    status: "active",
    // The current user is a plain Member here, to show permissions changing between organizations.
    roles: [roleRef("org_globex", index === 1 ? "owner" : index > 1 && index < 4 ? "admin" : "member")],
    joinedAt: daysAgo(200 - index * 9),
    lastActiveAt: daysAgo(index % 4),
  }));
}

const users: Record<string, User[]> = {
  org_acme: acmeMembers(),
  org_globex: globexMembers(),
};

const SARAH = { id: CURRENT_USER_ID, name: "Sarah Chen" };
const TOM = { id: "usr_acme_5", name: "Tom Lindqvist" };

const ACME_INVITES = [
  { email: "r.ito@acme.com", role: "member", created: 1, expires: 13 },
  { email: "j.morrison@acme.com", role: "manager", created: 3, expires: 11 },
  { email: "contractor@northwind.io", role: "viewer", created: 9, expires: 5 },
  { email: "l.fernandez@acme.com", role: "member", created: 12, expires: 2 },
  { email: "k.ng@acme.com", role: "support", created: 20, expires: -6 },
];

const invitations: Record<string, Invitation[]> = {
  org_acme: ACME_INVITES.map(
    (inv, index): Invitation => ({
      id: `inv_acme_${index}`,
      email: inv.email,
      role: roleRef("org_acme", inv.role),
      status: inv.expires < 0 ? "expired" : "pending",
      invitedBy: SARAH,
      message: null,
      createdAt: daysAgo(inv.created),
      expiresAt: daysFromNow(inv.expires),
    }),
  ),
  org_globex: [],
};

const applications: Record<string, Application[]> = {
  org_acme: [
    { id: "app_acme_insights", key: "insights", name: "Insights", description: "Reporting and analytics", status: "enabled" },
    { id: "app_acme_workflows", key: "workflows", name: "Workflows", description: "Approval and automation flows", status: "enabled" },
    { id: "app_acme_vault", key: "vault", name: "Vault", description: "Secure document storage", status: "enabled" },
    { id: "app_acme_connect", key: "connect", name: "Connect", description: "Third-party integrations", status: "disabled" },
  ],
  org_globex: [
    { id: "app_globex_insights", key: "insights", name: "Insights", description: "Reporting and analytics", status: "enabled" },
    { id: "app_globex_workflows", key: "workflows", name: "Workflows", description: "Approval and automation flows", status: "disabled" },
  ],
};

interface ActivitySeed {
  type: ActivityType;
  actor: { id: string; name: string };
  target: string;
  detail: string | null;
  at: string;
}

function toEvents(prefix: string, seeds: ActivitySeed[]): ActivityEvent[] {
  return seeds.map(({ at, ...event }, index) => ({ id: `${prefix}_${index}`, occurredAt: at, ...event }));
}

const activity: Record<string, ActivityEvent[]> = {
  org_acme: toEvents("evt_acme", [
    { type: "member.invited", actor: SARAH, target: "r.ito@acme.com", detail: "Member", at: daysAgo(1, 2) },
    { type: "member.role_changed", actor: TOM, target: "Ravi Patel", detail: "Manager", at: daysAgo(1, 7) },
    { type: "member.joined", actor: { id: "usr_acme_33", name: "Ahmed Nasser" }, target: "Ahmed Nasser", detail: null, at: daysAgo(2, 3) },
    { type: "member.invited", actor: SARAH, target: "j.morrison@acme.com", detail: "Manager", at: daysAgo(3) },
    { type: "role.updated", actor: SARAH, target: "Support Lead", detail: null, at: daysAgo(12) },
    { type: "member.suspended", actor: TOM, target: "James Carter", detail: null, at: daysAgo(14, 4) },
    { type: "application.enabled", actor: SARAH, target: "Vault", detail: null, at: daysAgo(21) },
    { type: "organization.updated", actor: SARAH, target: "security settings", detail: null, at: daysAgo(26) },
    { type: "member.removed", actor: TOM, target: "p.walsh@acme.com", detail: null, at: daysAgo(33) },
  ]),
  org_globex: toEvents("evt_globex", [
    { type: "member.joined", actor: { id: "usr_globex_8", name: "Ethan Brooks" }, target: "Ethan Brooks", detail: null, at: daysAgo(4) },
    { type: "application.enabled", actor: { id: "usr_globex_1", name: "Marcus Webb" }, target: "Insights", detail: null, at: daysAgo(30) },
  ]),
};

const accounts: Account[] = users.org_acme.map((u) => ({
  userId: u.id,
  name: u.name,
  email: u.email,
  password: MOCK_PASSWORD,
}));

// Keep role member counts consistent with the seeded users.
for (const [orgId, orgRoles] of Object.entries(roles)) {
  for (const role of orgRoles) {
    role.memberCount = users[orgId].filter((u) => u.roles.some((r) => r.id === role.id)).length;
  }
}

export const db = { organizations, roles, users, invitations, applications, activity, accounts };
