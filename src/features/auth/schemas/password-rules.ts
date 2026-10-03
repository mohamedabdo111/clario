/** Shared by the reset-password schema and the live requirements checklist. */
export const PASSWORD_RULES = [
  { id: "length", label: "At least 12 characters", test: (value: string) => value.length >= 12 },
  { id: "lowercase", label: "One lowercase letter", test: (value: string) => /[a-z]/.test(value) },
  { id: "uppercase", label: "One uppercase letter", test: (value: string) => /[A-Z]/.test(value) },
  { id: "number", label: "One number", test: (value: string) => /\d/.test(value) },
  { id: "symbol", label: "One symbol", test: (value: string) => /[^A-Za-z0-9]/.test(value) },
] as const;

export function meetsPasswordRules(value: string) {
  return PASSWORD_RULES.every((rule) => rule.test(value));
}
