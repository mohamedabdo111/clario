export type ApplicationStatus = "enabled" | "disabled";

export interface Application {
  id: string;
  key: string;
  name: string;
  description: string;
  status: ApplicationStatus;
}
