/** Runtime configuration resolved from Vite env variables. See `.env.example`. */
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "/api",
  useMocks: import.meta.env.VITE_USE_MOCKS !== "false",
  productName: "Clario",
} as const;
