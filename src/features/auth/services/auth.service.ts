import { config } from "@/lib/config";
import { httpAuthService } from "./auth.service.http";
import { mockAuthService } from "./auth.service.mock";

export type { AuthService } from "./auth.service.types";

export const authService = config.useMocks ? mockAuthService : httpAuthService;
