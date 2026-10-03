import type { Membership } from "@/features/organization/types";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
}

export interface Session {
  token: string;
  user: CurrentUser;
  memberships: Membership[];
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
}
