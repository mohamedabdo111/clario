import { createContext, useContext } from "react";

export interface FieldControlProps {
  id: string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
  "aria-required"?: true;
}

export const FieldContext = createContext<FieldControlProps | null>(null);

/**
 * Accessibility props for a control rendered inside <Field>: its id (linked to
 * the label), description ids (hint and error) and invalid state.
 */
export function useFieldControl(): Partial<FieldControlProps> {
  return useContext(FieldContext) ?? {};
}
