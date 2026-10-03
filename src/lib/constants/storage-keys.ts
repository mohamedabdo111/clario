const PREFIX = "clario";

export const storageKeys = {
  sessionToken: `${PREFIX}.session-token`,
  activeOrganization: `${PREFIX}.active-organization`,
} as const;
